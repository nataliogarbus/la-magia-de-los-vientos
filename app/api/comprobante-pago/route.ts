import { NextRequest, NextResponse } from 'next/server';

const MAX_SHORT_TEXT = 200;
const MAX_COMPROBANTE_BASE64_LENGTH = 6 * 1024 * 1024; // 6 MB codificados
const ALLOWED_DATA_URL_REGEX =
  /^data:(application\/pdf|image\/jpeg|image\/png|image\/webp);base64,[A-Za-z0-9+/=]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim()
    .slice(0, maxLength);
}

interface ComprobantePayload {
  nombreCompleto: string;
  dni: string;
  email: string;
  telefono: string;
  modalidadPago?: string;
  referencia?: string;
  comprobanteBase64: string;
  comprobanteNombre: string;
  comprobanteMime: string;
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    if (!rawBody || typeof rawBody !== 'object' || Array.isArray(rawBody)) {
      return NextResponse.json(
        { ok: false, error: 'Formato de solicitud inválido.' },
        { status: 400 }
      );
    }

    const body = rawBody as Partial<ComprobantePayload>;

    const nombreCompleto = sanitizeText(body.nombreCompleto, MAX_SHORT_TEXT);
    const dni = sanitizeText(body.dni, 50);
    const email = sanitizeText(body.email, MAX_SHORT_TEXT);
    const telefono = sanitizeText(body.telefono, 50);
    const modalidadPago = sanitizeText(body.modalidadPago, 100) || 'Exterior / Europa (SEPA)';
    const referencia = sanitizeText(body.referencia, MAX_SHORT_TEXT);

    if (!nombreCompleto || !dni || !email || !telefono) {
      return NextResponse.json(
        { ok: false, error: 'Faltan datos de identificación del consultante.' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { ok: false, error: 'El correo electrónico no es válido.' },
        { status: 400 }
      );
    }

    if (
      typeof body.comprobanteBase64 !== 'string' ||
      body.comprobanteBase64.length > MAX_COMPROBANTE_BASE64_LENGTH ||
      !ALLOWED_DATA_URL_REGEX.test(body.comprobanteBase64)
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: 'El comprobante debe ser un archivo PDF, JPG, PNG o WEBP de hasta 5 MB.',
        },
        { status: 400 }
      );
    }

    const now = new Date();
    const timestampISO = now.toISOString();
    const timestampArgentina = new Intl.DateTimeFormat('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires',
      dateStyle: 'full',
      timeStyle: 'medium',
    }).format(now);

    const record = {
      tipo: 'comprobante_pago',
      tipoDocumento: 'COMPROBANTE_PAGO',
      source: 'pago_sesion',
      timestampISO,
      timestampArgentina,
      nombreCompleto,
      dni,
      email,
      telefono,
      modalidadPago,
      referencia,
      comprobanteBase64: body.comprobanteBase64,
      comprobanteNombre: sanitizeText(body.comprobanteNombre, MAX_SHORT_TEXT),
      comprobanteMime: sanitizeText(body.comprobanteMime, 100),
    };

    const webhookUrl =
      process.env.GOOGLE_DRIVE_CONSENTIMIENTO_WEBHOOK_URL ||
      process.env.GOOGLE_DRIVE_WEBHOOK_URL ||
      process.env.N8N_CONSENTIMIENTO_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('[ComprobantePago] Webhook de Google Drive no configurado en el servidor');
      return NextResponse.json(
        { ok: false, error: 'Webhook de Google Drive no configurado en el servidor' },
        { status: 500 }
      );
    }

    try {
      const webhookRes = await fetch(webhookUrl, {
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(record),
      });

      const responseText = await webhookRes.text();
      let parsed: { ok?: boolean } | null = null;
      try {
        parsed = JSON.parse(responseText) as { ok?: boolean };
      } catch {
        parsed = null;
      }

      if (!webhookRes.ok || !parsed || parsed.ok !== true) {
        console.error(
          `[ComprobantePago] Respuesta inválida de Apps Script (HTTP ${webhookRes.status}):`,
          responseText.slice(0, 500)
        );
        return NextResponse.json(
          {
            ok: false,
            error: 'No se pudo guardar el comprobante en Google Drive. Intentá nuevamente.',
          },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error('[ComprobantePago] Error de red al conectar con Apps Script:', err);
      return NextResponse.json(
        {
          ok: false,
          error: 'Error de conexión al guardar el comprobante. Intentá nuevamente.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      synced: true,
      timestampISO,
      timestampArgentina,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'No se pudo procesar el comprobante. Intentá nuevamente.' },
      { status: 500 }
    );
  }
}
