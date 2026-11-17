/**
 * Google Apps Script — Consentimiento Informado (La Magia de los Vientos)
 *
 * Instrucciones:
 * 1. Reemplazar FOLDER_ID con el ID real de la carpeta de Google Drive.
 * 2. Implementar > Nueva implementación > Tipo: Aplicación web.
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquier usuario
 * 3. Copiar la URL /exec generada y configurarla en Hostinger como:
 *    GOOGLE_DRIVE_CONSENTIMIENTO_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
 */

const FOLDER_ID = 'PEGAR_AQUI_EL_ID_DE_LA_CARPETA';

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

      // Escalar proporcionalmente a un ancho máximo legible (280 px)
      const maxWidth = 280;
      const origWidth = img.getWidth();
      const origHeight = img.getHeight();
      if (origWidth > maxWidth && origWidth > 0) {
        img.setWidth(maxWidth);
        img.setHeight(Math.round((origHeight * maxWidth) / origWidth));
      }
    }

    doc.saveAndClose();

    // Mover el documento a la carpeta destino en Google Drive
    if (FOLDER_ID && FOLDER_ID !== 'PEGAR_AQUI_EL_ID_DE_LA_CARPETA') {
      const folder = DriveApp.getFolderById(FOLDER_ID);
      const file = DriveApp.getFileById(doc.getId());
      file.moveTo(folder);
    }

    return jsonResponse({
      ok: true,
      docId: doc.getId(),
      docUrl: doc.getUrl(),
      docTitle: docTitle,
    });
  } catch (err) {
    return jsonResponse({
      ok: false,
      error: err && err.message ? err.message : String(err),
    });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
