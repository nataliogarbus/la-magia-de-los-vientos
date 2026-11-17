/**
 * Google Apps Script — Consentimiento Informado y Cuestionario Previo (La Magia de los Vientos)
 *
 * Instrucciones:
 * 1. Implementar > Nueva implementación > Tipo: Aplicación web.
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquier usuario
 * 2. Copiar la URL /exec generada y configurarla en Hostinger como:
 *    GOOGLE_DRIVE_CONSENTIMIENTO_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
 */

const FOLDER_ID = '1Jd7qXlDpc3zRtJbZC6pR6y3mb_oiPjEi';

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: 'Payload vacío' });
    }

    const data = JSON.parse(e.postData.contents);
    const now = new Date();
    const datePrefix = Utilities.formatDate(
      now,
      'America/Argentina/Buenos_Aires',
      'yyyy-MM-dd_HH-mm'
    );

    const nombre = (data.nombreCompleto || 'Sin Nombre').trim();
    const dni = (data.dni || 'Sin DNI').trim();

    if (data.tipoDocumento === 'CUESTIONARIO_PREVIO') {
      return handleCuestionarioPrevio(data, datePrefix, nombre, dni, now);
    }

    return handleConsentimiento(data, datePrefix, nombre, dni, now);
  } catch (err) {
    return jsonResponse({
      ok: false,
      error: err && err.message ? err.message : String(err),
    });
  }
}

function handleConsentimiento(data, datePrefix, nombre, dni, now) {
  const docTitle = `${datePrefix} - ${nombre} (${dni})`;
  const doc = DocumentApp.create(docTitle);
  const body = doc.getBody();

  // Encabezado
  const titleParagraph = body.appendParagraph('LA MAGIA DE LOS VIENTOS');
  titleParagraph.setHeading(DocumentApp.ParagraphHeading.HEADING1);

  const subtitleParagraph = body.appendParagraph(
    'Consentimiento Informado y Descargo de Responsabilidad\nEliana — Acompañamiento en Biodecodificación y Terapias Complementarias'
  );
  subtitleParagraph.setHeading(DocumentApp.ParagraphHeading.SUBTITLE);
  body.appendHorizontalRule();

  // Sección 1: Datos del Consultante
  const sec1 = body.appendParagraph('1. Datos de Identificación del Consultante');
  sec1.setHeading(DocumentApp.ParagraphHeading.HEADING2);

  body.appendParagraph(`Nombre y Apellido: ${nombre}`);
  body.appendParagraph(`DNI / Documento: ${dni}`);
  body.appendParagraph(`Fecha de nacimiento: ${data.fechaNacimiento || '-'}`);
  body.appendParagraph(`Correo electrónico: ${data.email || '-'}`);
  body.appendParagraph(`Teléfono / WhatsApp: ${data.telefono || '-'}`);
  body.appendParagraph(
    `¿Bajo tratamiento médico, psicológico o psiquiátrico actual?: ${data.tratamientoActual || '-'}`
  );
  body.appendParagraph(
    `Motivo de consulta / Observaciones de salud: ${data.observaciones || 'Sin observaciones'}`
  );

  // Sección 2: Declaración de Conformidad
  const sec2 = body.appendParagraph('2. Declaración de Conformidad y Marco Legal');
  sec2.setHeading(DocumentApp.ParagraphHeading.HEADING2);

  body.appendParagraph(
    'El/La consultante declara haber leído, comprendido y aceptado en su totalidad los términos del Consentimiento Informado y Descargo de Responsabilidad (naturaleza integrativa del acompañamiento, exclusión de acto médico o psicológico, responsabilidad personal, confidencialidad bajo Ley N° 25.326, modalidad, cancelaciones y prohibición de grabación/reproducción).'
  );
  body.appendParagraph(`Aceptación expresa: ${data.aceptaTerminos ? 'SÍ' : 'NO'}`);

  // Sección 3: Firma Digital
  const sec3 = body.appendParagraph('3. Firma Digital y Registro');
  sec3.setHeading(DocumentApp.ParagraphHeading.HEADING2);

  body.appendParagraph(`Aclaración: ${data.aclaracion || nombre}`);
  body.appendParagraph(`Fecha declarada: ${data.fechaFirma || '-'}`);
  body.appendParagraph(`Timestamp servidor (AR): ${data.timestampArgentina || '-'}`);
  body.appendParagraph(`Timestamp ISO: ${data.timestampISO || now.toISOString()}`);

  if (data.firmaBase64 && typeof data.firmaBase64 === 'string') {
    const base64Clean = data.firmaBase64.replace(/^data:image\/\w+;base64,/, '');
    const imageBytes = Utilities.base64Decode(base64Clean);
    const imageBlob = Utilities.newBlob(imageBytes, 'image/png', 'firma.png');
    body.appendParagraph('Firma manuscrita:');
    const img = body.appendImage(imageBlob);

    const maxWidth = 280;
    const origWidth = img.getWidth();
    const origHeight = img.getHeight();
    if (origWidth > maxWidth && origWidth > 0) {
      img.setWidth(maxWidth);
      img.setHeight(Math.round((origHeight * maxWidth) / origWidth));
    }
  }

  doc.saveAndClose();
  moveToTargetFolder(doc.getId());

  return jsonResponse({
    ok: true,
    docId: doc.getId(),
    docUrl: doc.getUrl(),
    docTitle: docTitle,
  });
}

function handleCuestionarioPrevio(data, datePrefix, nombre, dni, now) {
  const docTitle = `CUESTIONARIO - ${datePrefix} - ${nombre} (${dni})`;
  const doc = DocumentApp.create(docTitle);
  const body = doc.getBody();

  const titleParagraph = body.appendParagraph('LA MAGIA DE LOS VIENTOS');
  titleParagraph.setHeading(DocumentApp.ParagraphHeading.HEADING1);

  const subtitleParagraph = body.appendParagraph(
    'Cuestionario Previo a la Consulta\nEliana — Acompañamiento en Biodecodificación y Terapias Complementarias'
  );
  subtitleParagraph.setHeading(DocumentApp.ParagraphHeading.SUBTITLE);
  body.appendHorizontalRule();

  // Sección 1: Datos Personales y Admisión
  body
    .appendParagraph('1. Datos Personales y Encuadre de Admisión')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  body.appendParagraph(`Nombre y apellido: ${nombre}`);
  body.appendParagraph(`DNI: ${dni}`);
  body.appendParagraph(`Fecha de nacimiento: ${data.fechaNacimiento || '-'} (${data.edad || '-'} años)`);
  body.appendParagraph(`Lugar de nacimiento: ${data.lugarNacimiento || '-'}`);
  body.appendParagraph(`Lugar donde vive hoy: ${data.lugarResidencia || '-'}`);
  body.appendParagraph(`Ocupación / profesión: ${data.ocupacion || '-'}`);
  body.appendParagraph(`Teléfono / WhatsApp: ${data.telefono || '-'}`);
  body.appendParagraph(`Correo electrónico: ${data.email || '-'}`);
  body.appendParagraph(
    `Mayor de 14 años y sin embarazo en curso: ${data.confirmaEdadYNoEmbarazo ? 'Confirmado' : 'No confirmado'}`
  );
  body.appendParagraph(
    `Diagnóstico psiquiátrico severo o tratamiento cardíaco/oncológico: ${data.diagnosticoSevero || '-'}`
  );
  if (data.autorizacionMedica) {
    body.appendParagraph(`Autorización médica/psicológica: ${data.autorizacionMedica}`);
  }

  // Sección 2: Tema a Trabajar
  body
    .appendParagraph('2. Tema a Trabajar')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  body.appendParagraph(`Tema, conflicto o situación principal:\n${data.temaPrincipal || '-'}`);
  body.appendParagraph(`Desde cuándo está presente y qué lo detonó:\n${data.origenTema || '-'}`);

  // Sección 3: Síntomas Físicos
  body
    .appendParagraph('3. Síntomas Físicos')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  body.appendParagraph(
    `Síntomas físicos, dolor o malestar actual:\n${data.sintomasFisicos || 'No informado'}`
  );
  body.appendParagraph(
    `Diagnóstico médico o estudios previos:\n${data.diagnosticoMedico || 'No informado'}`
  );

  // Sección 4: Logros y Duelos
  body
    .appendParagraph('4. Logros y Duelos')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  body.appendParagraph(
    `Logros más significativos:\n${data.logrosSignificativos || 'No informado'}`
  );
  body.appendParagraph(
    `Duelos pendientes o pérdidas no resueltas:\n${data.duelosPendientes || 'No informado'}`
  );

  // Sección 5: Información Familiar y Etapa Temprana
  body
    .appendParagraph('5. Información Familiar y Etapa Temprana')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  body.appendParagraph(
    `Composición de la familia de origen:\n${data.familiaOrigen || 'No informado'}`
  );
  body.appendParagraph(
    `Dinámica familiar (infancia y adolescencia):\n${data.dinamicaFamiliar || 'No informado'}`
  );
  body.appendParagraph(
    `Gestación y/o nacimiento:\n${data.gestacionNacimiento || 'No informado'}`
  );

  // Sección 6: Relación con Padres o Figuras Parentales
  body
    .appendParagraph('6. Relación con Padres o Figuras Parentales')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  body.appendParagraph(
    `Vínculo actual/general con mamá y papá:\n${data.vinculoPadresActual || 'No informado'}`
  );
  body.appendParagraph(
    `Relación en la infancia:\n${data.vinculoPadresInfancia || 'No informado'}`
  );

  // Sección 7: Miedos
  body.appendParagraph('7. Miedos').setHeading(DocumentApp.ParagraphHeading.HEADING2);
  body.appendParagraph(
    `Mayores miedos o situaciones limitantes:\n${data.mayoresMiedos || 'No informado'}`
  );

  // Sección 8: Línea del Tiempo
  body
    .appendParagraph('8. Línea del Tiempo (Eventos Importantes por Edad)')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  body.appendParagraph(data.lineaTiempo || 'No informado');

  body.appendHorizontalRule();
  body.appendParagraph(`Timestamp servidor (AR): ${data.timestampArgentina || '-'}`);
  body.appendParagraph(`Timestamp ISO: ${data.timestampISO || now.toISOString()}`);

  doc.saveAndClose();
  moveToTargetFolder(doc.getId());

  return jsonResponse({
    ok: true,
    docId: doc.getId(),
    docUrl: doc.getUrl(),
    docTitle: docTitle,
  });
}

function moveToTargetFolder(docId) {
  if (FOLDER_ID && FOLDER_ID !== 'PEGAR_AQUI_EL_ID_DE_LA_CARPETA') {
    const folder = DriveApp.getFolderById(FOLDER_ID);
    const file = DriveApp.getFileById(docId);
    file.moveTo(folder);
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
