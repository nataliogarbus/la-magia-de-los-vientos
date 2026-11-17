import { NextRequest, NextResponse } from 'next/server';

interface ConsentimientoPayload {
  nombreCompleto: string;
  dni: string;
  fechaNacimiento: string;
  email: string;
  telefono: string;
  tratamientoActual: 'Sí' | 'No';
  observaciones?: string;
  aceptaTerminos: boolean;
  aclaracion: string;
  fechaFirma: string;
  firmaBase64: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<ConsentimientoPayload>;

    const requiredFields: (keyof ConsentimientoPayload)[] = [
      'nombreCompleto',
      'dni',
      'fechaNacimiento',
      'email',
      'telefono',
      'tratamientoActual',
      'aclaracion',
      'firmaBase64',
    ];

    for (const field of requiredFields) {
      const value = body[field];
      if (typeof value !== 'string' || value.trim().length === 0) {
        return NextResponse.json(
          { ok: false, error: `El campo "${field}" es obligatorio.` },
          { status: 400 }
        );
      }
    }

    if (body.aceptaTerminos !== true) {
      return NextResponse.json(
        { ok: false, error: 'Debe aceptar los términos del consentimiento informado.' },
        { status: 400 }
      );
    }

    if (body.tratamientoActual !== 'Sí' && body.tratamientoActual !== 'No') {
      return NextResponse.json(
        { ok: false, error: 'Debe indicar si se encuentra bajo tratamiento actual.' },
        { status: 400 }
      );
    }

    if (!body.firmaBase64?.startsWith('data:image/png;base64,')) {
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
      source: 'consentimiento_informado',
      timestampISO,
      timestampArgentina,
      nombreCompleto: body.nombreCompleto!.trim(),
      dni: body.dni!.trim(),
      fechaNacimiento: body.fechaNacimiento!.trim(),
      email: body.email!.trim(),
      telefono: body.telefono!.trim(),
      tratamientoActual: body.tratamientoActual,
      observaciones: body.observaciones?.trim() || '',
      aceptaTerminos: true,
      aclaracion: body.aclaracion!.trim(),
      fechaFirma: body.fechaFirma?.trim() || timestampArgentina,
      firmaBase64: body.firmaBase64,
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
          console.error(
            `[Consentimiento] Webhook respondió ${webhookRes.status}: ${webhookRes.statusText}`
          );
        }
      } catch (webhookError) {
        console.error('[Consentimiento] Error enviando al webhook:', webhookError);
      }
    } else {
      console.warn(
        '[Consentimiento] GOOGLE_DRIVE_CONSENTIMIENTO_WEBHOOK_URL / N8N_CONSENTIMIENTO_WEBHOOK_URL no configurada.'
      );
    }

    return NextResponse.json({
      ok: true,
      synced,
      timestampISO,
      timestampArgentina,
    });
  } catch (error) {
    console.error('[Consentimiento] Error procesando solicitud:', error);
    return NextResponse.json(
      { ok: false, error: 'No se pudo procesar el formulario. Intentá nuevamente.' },
      { status: 500 }
    );
  }
}
