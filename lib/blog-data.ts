export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown-like string
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'sos-rescate-emocional',
    title: 'SOS Rescate: El Primer Auxilio de la Naturaleza',
    excerpt: '¿Sufriste un susto, una noticia inesperada o una crisis de nervios? El Rescue Remedy es la fórmula más famosa del mundo por una razón.',
    content: `
      <p class="intro"><strong>El Rescue Remedy (Auxilio de Rescate) no es un medicamento, sino un reseteo emocional inmediato.</strong> Fue la única fórmula pre-armada por el Dr. Bach para situaciones de urgencia extrema.</p>
      
      <h3>¿Cuándo usarlo?</h3>
      <p>Es ideal para momentos puntuales de shock: antes de un examen, tras una discusión fuerte, ante una pérdida o incluso después de un accidente físico ligero que nos dejó temblando. Ayuda a evitar que el trauma se asiente en el cuerpo.</p>
      
      <p>Nuestros preparados SOS utilizan las 5 esencias originales en su máxima pureza, permitiendo que recuperes tu centro en minutos sin efectos secundarios ni somnolencia.</p>
      
      <div class="cta-block">
        <p>¿Necesitás tener un SOS siempre a mano?</p>
        <a href="/tienda" class="btn btn-primary">Ver Preparados de Rescate</a>
      </div>
    `,
    image: '/hero-bach.png' 
  },
  {
    slug: 'ninos-y-flores-de-bach',
    title: 'Niños y Flores de Bach: Acompañando el Crecimiento',
    excerpt: 'Berrinches, miedos nocturnos o problemas de adaptación escolar. Descubrí cómo las flores ayudan a los más chicos sin químicos.',
    content: `
      <p class="intro"><strong>Los niños son los que mejor responden a la terapia floral.</strong> Al no tener las barreras mentales de los adultos, su sistema reconoce las esencias y se equilibra con una velocidad asombrosa.</p>
      
      <h3>Una Botica Segura</h3>
      <p>En nuestra botica, preparamos las flores para niños con una base de <strong>glicerina vegetal pura</strong>. Esto elimina totalmente el alcohol y les da un sabor dulce que les encanta, facilitando la toma diaria sin resistencia.</p>
      
      <p>Desde el miedo a la oscuridad hasta la dificultad para concentrarse en la escuela, hay una flor para cada etapa del desarrollo infantil.</p>
      
      <div class="cta-block">
        <p>¿Buscás una solución natural para tus hijos?</p>
        <a href="/tienda" class="btn btn-primary">Ver Línea Kids</a>
      </div>
    `,
    image: '/hero-bach.png'
  },
  {
    slug: 'huellas-en-calma-mascotas',
    title: 'Huellas en Calma: El Bienestar de tus Mascotas',
    excerpt: 'Ansiedad por separación, miedos a los ruidos o agresividad. Las flores de Bach son un lenguaje de amor para tus animales.',
    content: `
      <p class="intro"><strong>Nuestras mascotas también sienten y se estresan.</strong> Mudanzas, ruidos fuertes o cambios en la familia pueden alterar profundamente su paz interna.</p>
      
      <h3>Eficacia Comprobada</h3>
      <p>Muchos se preguntan si es un efecto placebo; sin embargo, la eficacia en animales (donde el placebo no existe) demuestra la naturaleza real de las Flores de Bach. Ayuda a perros y gatos a procesar el miedo y la ansiedad desde su propia naturaleza animal.</p>
      
      <p>Preparamos fórmulas insípidas e inodoras que podés poner directamente en su agua o comida, sin estresarlos.</p>
      
      <div class="cta-block">
        <p>Devolvele la alegría a tu compañero fiel.</p>
        <a href="/tienda" class="btn btn-primary">Ver Preparados para Mascotas</a>
      </div>
    `,
    image: '/hero-bach.png'
  },
  {
    slug: 'consulta-terapeutica-personalizada',
    title: 'La Diferencia de la Consulta Personalizada',
    excerpt: '¿Por qué un frasco a medida es más potente que uno genérico? Descubrí el valor de la escucha activa en la terapia floral.',
    content: `
      <p class="intro"><strong>No existen dos personas con la misma tristeza ni el mismo miedo.</strong> Por eso, aunque los preparados prediseñados son excelentes, la consulta 1:1 es el "Gold Standard" de la terapia floral.</p>
      
      <h3>Escuchar para Sanar</h3>
      <p>En la consulta personalizada, nuestra terapeuta certificada utiliza su **kit completo de 38 esencias** para tejer una fórmula única. Analizamos tu biografía emocional, tus bloqueos actuales y tus objetivos de bienestar.</p>
      
      <p>Te llevás un preparado que no es para "la ansiedad" en general, sino para TU tipo de ansiedad específica. Ese es el camino de la verdadera transformación.</p>
      
      <div class="cta-block">
        <p>¿Estás listo para tu fórmula única?</p>
        <a href="/reservas" class="btn btn-primary">Agendar Consultoría 1:1</a>
      </div>
    `,
    image: '/hero-bach.png'
  }
];
