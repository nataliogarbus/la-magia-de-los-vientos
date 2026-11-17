import { NextRequest, NextResponse } from 'next/server';

const MAX_SHORT_TEXT = 200;
const MAX_LONG_TEXT = 4000;
const MAX_AUTH_FILE_BASE64_LENGTH = 6 * 1024 * 1024; // 6 MB codificados
const MAX_SIGNATURE_BASE64_LENGTH = 2 * 1024 * 1024; // 2 MB
const ALLOWED_AUTH_DATA_URL_REGEX =
  /^data:(application\/pdf|image\/jpeg|image\/png|image\/webp);base64,[A-Za-z0-9+/=]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim()
    .slice(0, maxLength);
}

interface ConsentimientoPayload {
  nombreCompleto: string;
  dni: string;
  fechaNacimiento: string;
  email: string;
  telefono: string;
  tratamientoActual: 'Sí' | 'No';
  observaciones?: string;
  aceptaTerminos: boolean;
  confirmaEncuadreEtico: boolean;
  pacienteRiesgo: 'Sí' | 'No';
  autorizacionMedicaBase64?: string;
  autorizacionMedicaNombre?: string;
  autorizacionMedicaMime?: string;
  aclaracion: string;
  fechaFirma: string;
  firmaBase64: string;
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

    const body = rawBody as Partial<ConsentimientoPayload>;

    const nombreCompleto = sanitizeText(body.nombreCompleto, MAX_SHORT_TEXT);
    const dni = sanitizeText(body.dni, 50);
    const fechaNacimiento = sanitizeText(body.fechaNacimiento, 30);
    const email = sanitizeText(body.email, MAX_SHORT_TEXT);
    const telefono = sanitizeText(body.telefono, 50);
    const observaciones = sanitizeText(body.observaciones, MAX_LONG_TEXT);
    const aclaracion = sanitizeText(body.aclaracion, MAX_SHORT_TEXT);
    const fechaFirmaInput = sanitizeText(body.fechaFirma, 50);

    if (
      !nombreCompleto ||
      !dni ||
      !fechaNacimiento ||
      !email ||
      !telefono ||
      !aclaracion
    ) {
      return NextResponse.json(
        { ok: false, error: 'Completá todos los campos obligatorios.' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { ok: false, error: 'El correo electrónico ingresado no es válido.' },
        { status: 400 }
      );
    }

    if (body.aceptaTerminos !== true) {
      return NextResponse.json(
        { ok: false, error: 'Debe aceptar los términos del consentimiento informado.' },
        { status: 400 }
      );
    }

    if (body.confirmaEncuadreEtico !== true) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Debe confirmar la declaración de admisión y encuadre ético.',
        },
        { status: 400 }
      );
    }

    if (body.tratamientoActual !== 'Sí' && body.tratamientoActual !== 'No') {
      return NextResponse.json(
        { ok: false, error: 'Debe indicar si se encuentra bajo tratamiento actual.' },
        { status: 400 }
      );
    }

    if (body.pacienteRiesgo !== 'Sí' && body.pacienteRiesgo !== 'No') {
      return NextResponse.json(
        {
          ok: false,
          error: 'Debe indicar si es paciente psiquiátrico, oncológico o cardíaco.',
        },
        { status: 400 }
      );
    }

    let autorizacionMedicaBase64 = '';
    let autorizacionMedicaNombre = '';
    let autorizacionMedicaMime = '';

    if (body.pacienteRiesgo === 'Sí') {
      if (typeof body.autorizacionMedicaBase64 !== 'string') {
        return NextResponse.json(
          {
            ok: false,
            error: 'Debe adjuntar la autorización médica o psicológica.',
          },
          { status: 400 }
        );
      }

      if (body.autorizacionMedicaBase64.length > MAX_AUTH_FILE_BASE64_LENGTH) {
        return NextResponse.json(
          {
            ok: false,
            error: 'El archivo adjunto supera el límite máximo permitido.',
          },
          { status: 400 }
        );
      }

      if (!ALLOWED_AUTH_DATA_URL_REGEX.test(body.autorizacionMedicaBase64)) {
        return NextResponse.json(
          {
            ok: false,
            error: 'Formato de autorización no permitido. Usá PDF, JPG, PNG o WEBP.',
          },
          { status: 400 }
        );
      }

      autorizacionMedicaBase64 = body.autorizacionMedicaBase64;
      autorizacionMedicaNombre = sanitizeText(body.autorizacionMedicaNombre, MAX_SHORT_TEXT);
      autorizacionMedicaMime = sanitizeText(body.autorizacionMedicaMime, 100);
    }

    if (
      typeof body.firmaBase64 !== 'string' ||
      body.firmaBase64.length > MAX_SIGNATURE_BASE64_LENGTH ||
      !body.firmaBase64.startsWith('data:image/png;base64,')
    ) {
      return NextResponse.json(
        { ok: false, error: 'La firma digital es inválida o está vacía.' },
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
      tipoDocumento: 'CONSENTIMIENTO',
      source: 'consentimiento_informado',
      timestampISO,
      timestampArgentina,
      nombreCompleto,
      dni,
      fechaNacimiento,
      email,
      telefono,
      tratamientoActual: body.tratamientoActual,
      observaciones,
      aceptaTerminos: true,
      confirmaEncuadreEtico: true,
      pacienteRiesgo: body.pacienteRiesgo,
      autorizacionMedicaBase64,
      autorizacionMedicaNombre,
      autorizacionMedicaMime,
      aclaracion,
      fechaFirma: fechaFirmaInput || timestampArgentina,
      firmaBase64: body.firmaBase64,
    };

    const webhookUrl =
      process.env.GOOGLE_DRIVE_CONSENTIMIENTO_WEBHOOK_URL ||
      process.env.GOOGLE_DRIVE_WEBHOOK_URL ||
      process.env.N8N_CONSENTIMIENTO_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('[Consentimiento] Webhook de Google Drive no configurado en el servidor');
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
      let parsed: { ok?: boolean; error?: string } | null = null;
      try {
        parsed = JSON.parse(responseText) as { ok?: boolean; error?: string };
      } catch {
        parsed = null;
      }

      if (!webhookRes.ok || !parsed || parsed.ok !== true) {
        console.error(
          `[Consentimiento] Respuesta inválida de Apps Script (HTTP ${webhookRes.status}):`,
          responseText.slice(0, 500)
        );
        return NextResponse.json(
          {
            ok: false,
            error: 'No se pudo confirmar el guardado en Google Drive. Intentá nuevamente.',
          },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error('[Consentimiento] Error de red al conectar con Apps Script:', err);
      return NextResponse.json(
        {
          ok: false,
          error: 'Error de conexión al guardar en Google Drive. Intentá nuevamente.',
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
      { ok: false, error: 'No se pudo procesar el formulario. Intentá nuevamente.' },
      { status: 500 }
    );
  }
}
