import { NextRequest, NextResponse } from 'next/server';

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
    const body = (await request.json()) as Partial<CuestionarioPayload>;

    const requiredTextFields: (keyof CuestionarioPayload)[] = [
      'nombreCompleto',
      'dni',
      'fechaNacimiento',
      'lugarNacimiento',
      'lugarResidencia',
      'ocupacion',
      'telefono',
      'email',
      'temaPrincipal',
      'origenTema',
    ];

    for (const field of requiredTextFields) {
      const value = body[field];
      if (typeof value !== 'string' || value.trim().length === 0) {
        return NextResponse.json(
          { ok: false, error: `El campo "${field}" es obligatorio.` },
          { status: 400 }
        );
      }
    }

    const edadStr = String(body.edad ?? '').trim();
    if (!edadStr || Number.isNaN(Number(edadStr)) || Number(edadStr) < 14) {
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
      nombreCompleto: body.nombreCompleto!.trim(),
      dni: body.dni!.trim(),
      fechaNacimiento: body.fechaNacimiento!.trim(),
      edad: edadStr,
      lugarNacimiento: body.lugarNacimiento!.trim(),
      lugarResidencia: body.lugarResidencia!.trim(),
      ocupacion: body.ocupacion!.trim(),
      telefono: body.telefono!.trim(),
      email: body.email!.trim(),
      temaPrincipal: body.temaPrincipal!.trim(),
      origenTema: body.origenTema!.trim(),
      sintomasFisicos: body.sintomasFisicos?.trim() || '',
      diagnosticoMedico: body.diagnosticoMedico?.trim() || '',
      lineaTiempo: body.lineaTiempo?.trim() || '',
      familiaOrigen: body.familiaOrigen?.trim() || '',
      dinamicaFamiliar: body.dinamicaFamiliar?.trim() || '',
      gestacionNacimiento: body.gestacionNacimiento?.trim() || '',
      vinculoPadresActual: body.vinculoPadresActual?.trim() || '',
      vinculoPadresInfancia: body.vinculoPadresInfancia?.trim() || '',
      logrosSignificativos: body.logrosSignificativos?.trim() || '',
      duelosPendientes: body.duelosPendientes?.trim() || '',
      mayoresMiedos: body.mayoresMiedos?.trim() || '',
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
            `[CuestionarioInicial] Webhook respondió ${webhookRes.status}: ${webhookRes.statusText}`
          );
        }
      } catch (webhookError) {
        console.error('[CuestionarioInicial] Error enviando al webhook:', webhookError);
      }
    } else {
      console.warn(
        '[CuestionarioInicial] GOOGLE_DRIVE_CONSENTIMIENTO_WEBHOOK_URL / N8N_CONSENTIMIENTO_WEBHOOK_URL no configurada.'
      );
    }

    return NextResponse.json({
      ok: true,
      synced,
      timestampISO,
      timestampArgentina,
    });
  } catch (error) {
    console.error('[CuestionarioInicial] Error procesando solicitud:', error);
    return NextResponse.json(
      { ok: false, error: 'No se pudo procesar el cuestionario. Intentá nuevamente.' },
      { status: 500 }
    );
  }
}
