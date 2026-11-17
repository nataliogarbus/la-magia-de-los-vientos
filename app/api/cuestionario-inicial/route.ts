import { NextRequest, NextResponse } from 'next/server';

const MAX_SHORT_TEXT = 200;
const MAX_LONG_TEXT = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim()
    .slice(0, maxLength);
}

interface CuestionarioPayload {
  nombreCompleto: string;
  dni: string;
  fechaNacimiento: string;
  edad: string | number;
  lugarNacimiento: string;
  lugarResidencia: string;
  ocupacion: string;
  telefono: string;
  email: string;
  temaPrincipal: string;
  origenTema: string;
  sintomasFisicos?: string;
  diagnosticoMedico?: string;
  lineaTiempo?: string;
  familiaOrigen?: string;
  dinamicaFamiliar?: string;
  gestacionNacimiento?: string;
  vinculoPadresActual?: string;
  vinculoPadresInfancia?: string;
  logrosSignificativos?: string;
  duelosPendientes?: string;
  mayoresMiedos?: string;
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

    const body = rawBody as Partial<CuestionarioPayload>;

    const nombreCompleto = sanitizeText(body.nombreCompleto, MAX_SHORT_TEXT);
    const dni = sanitizeText(body.dni, 50);
    const fechaNacimiento = sanitizeText(body.fechaNacimiento, 30);
    const lugarNacimiento = sanitizeText(body.lugarNacimiento, MAX_SHORT_TEXT);
    const lugarResidencia = sanitizeText(body.lugarResidencia, MAX_SHORT_TEXT);
    const ocupacion = sanitizeText(body.ocupacion, MAX_SHORT_TEXT);
    const telefono = sanitizeText(body.telefono, 50);
    const email = sanitizeText(body.email, MAX_SHORT_TEXT);
    const temaPrincipal = sanitizeText(body.temaPrincipal, MAX_LONG_TEXT);
    const origenTema = sanitizeText(body.origenTema, MAX_LONG_TEXT);

    if (
      !nombreCompleto ||
      !dni ||
      !fechaNacimiento ||
      !lugarNacimiento ||
      !lugarResidencia ||
      !ocupacion ||
      !telefono ||
      !email ||
      !temaPrincipal ||
      !origenTema
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

    const edadNum = Number(String(body.edad ?? '').trim());
    if (Number.isNaN(edadNum) || edadNum < 14 || edadNum > 120) {
      return NextResponse.json(
        { ok: false, error: 'La edad ingresada debe ser válida (mayor de 14 años).' },
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
      tipoDocumento: 'CUESTIONARIO_INICIAL',
      source: 'cuestionario_inicial',
      timestampISO,
      timestampArgentina,
      nombreCompleto,
      dni,
      fechaNacimiento,
      edad: String(Math.floor(edadNum)),
      lugarNacimiento,
      lugarResidencia,
      ocupacion,
      telefono,
      email,
      temaPrincipal,
      origenTema,
      sintomasFisicos: sanitizeText(body.sintomasFisicos, MAX_LONG_TEXT),
      diagnosticoMedico: sanitizeText(body.diagnosticoMedico, MAX_LONG_TEXT),
      lineaTiempo: sanitizeText(body.lineaTiempo, MAX_LONG_TEXT),
      familiaOrigen: sanitizeText(body.familiaOrigen, MAX_LONG_TEXT),
      dinamicaFamiliar: sanitizeText(body.dinamicaFamiliar, MAX_LONG_TEXT),
      gestacionNacimiento: sanitizeText(body.gestacionNacimiento, MAX_LONG_TEXT),
      vinculoPadresActual: sanitizeText(body.vinculoPadresActual, MAX_LONG_TEXT),
      vinculoPadresInfancia: sanitizeText(body.vinculoPadresInfancia, MAX_LONG_TEXT),
      logrosSignificativos: sanitizeText(body.logrosSignificativos, MAX_LONG_TEXT),
      duelosPendientes: sanitizeText(body.duelosPendientes, MAX_LONG_TEXT),
      mayoresMiedos: sanitizeText(body.mayoresMiedos, MAX_LONG_TEXT),
    };

    const webhookUrl =
      process.env.GOOGLE_DRIVE_CONSENTIMIENTO_WEBHOOK_URL ||
      process.env.N8N_CONSENTIMIENTO_WEBHOOK_URL;

    let synced = false;
    if (webhookUrl) {
      try {
        const webhookRes = await fetch(webhookUrl, {
          method: 'POST',
          redirect: 'follow',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(record),
        });
        synced = webhookRes.ok;
        if (!webhookRes.ok) {
          console.error(`[CuestionarioInicial] Webhook respondió estado ${webhookRes.status}`);
        }
      } catch {
        console.error('[CuestionarioInicial] Error de red al enviar al webhook');
      }
    } else {
      console.warn('[CuestionarioInicial] Variable de webhook no configurada');
    }

    return NextResponse.json({
      ok: true,
      synced,
      timestampISO,
      timestampArgentina,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'No se pudo procesar el cuestionario. Intentá nuevamente.' },
      { status: 500 }
    );
  }
}
