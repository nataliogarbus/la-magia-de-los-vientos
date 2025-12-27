export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown-like string
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'disonancia-y-armonia',
    title: 'Disonancia y Armonía: La Biología de la Sintonía Personal',
    excerpt: 'El estrés no es solo mental; es una frecuencia física. Descubrí cómo la música académica puede resetear tu sistema nervioso.',
    content: `
      <p class="intro"><strong>El estrés no es solo mental; es una frecuencia física que altera el ritmo cardíaco y la respiración.</strong> Vivimos en un estado de "disonancia" constante, donde el ruido externo y la prisa desconectan nuestra biología de su ritmo natural.</p>
      
      <h3>La Ciencia detrás de la Calma</h3>
      <p>La formación académica de grado permite comprender la música no solo como arte, sino como una estructura matemática precisa. Instrumentos como los <strong>Handpans (Hangs)</strong> emiten ondas armónicas que el sistema nervioso reconoce inmediatamente como "patrones de calma".</p>
      
      <p>No es magia, es física. Cuando escuchás estas frecuencias, tu cerebro pasa de ondas Beta (alerta) a ondas Alfa (relajación). Esto prepara el campo biológico para que terapias sutiles, como las <strong>Flores de Bach</strong>, puedan actuar sin la barrera química del cortisol alto.</p>
      
      <h3>Más allá de la relajación</h3>
      <p>La sintonía no es un lujo, es una necesidad biológica. Al igual que un instrumento desafinado no puede tocar una melodía clara, un cuerpo en disonancia no puede procesar emociones ni sanar eficientemente.</p>
      
      <div class="cta-block">
        <p>¿Sentís que tu ritmo interno está fuera de compás?</p>
        <a href="/reservas" class="btn btn-primary">Iniciar mi proceso de sintonía personal</a>
      </div>
    `,
    image: '/hero-bg.png' // Using hero image for now, ideally specific blog images
  },
  {
    slug: 'tu-hogar-como-refugio',
    title: 'Tu Hogar como Refugio: Arquitectura vs. Entorno',
    excerpt: '¿Alguna vez entraste a un lugar y sentiste "pesadez"? Aprendé a transformar tu casa en un motor de energía vital.',
    content: `
      <p class="intro"><strong>¿Alguna vez entraste a un lugar y sentiste "pesadez" sin motivo aparente?</strong> Los espacios físicos actúan como cajas de resonancia de nuestras vivencias. Todo lo que sucede en una casa queda vibrando en sus paredes.</p>
      
      <h3>Espacio vs. Entorno</h3>
      <p>Es fundamental distinguir entre <strong>Espacio</strong> (lo arquitectónico, los muebles, la decoración) y <strong>Entorno</strong> (la calidez, la vibración, la energía que se respira). Podés tener una casa de revista, pero si el entorno vibracional está estancado, no descansarás bien.</p>
      
      <p>Mediante el sonido de cuencos y hangs, y técnicas de limpieza energética como el Reiki, restauramos el flujo vital. Limpiamos esa "estática" emocional que se acumula en los rincones.</p>
      
      <h3>Un motor de energía</h3>
      <p>Tu casa debe ser tu cargador de batería, no un drenaje. Al armonizar tu espacio, convertís tu hogar en un verdadero refugio que te nutre y te sostiene.</p>
      
      <div class="cta-block">
        <p>¿Tu casa te da energía o te la quita?</p>
        <a href="/reservas" class="btn btn-primary">Transformá tu entorno hoy</a>
      </div>
    `,
    image: '/hero-bg.png'
  },
  {
    slug: 'huellas-en-calma',
    title: 'Huellas en Calma: Entendiendo a nuestras Mascotas',
    excerpt: 'Los animales son "esponjas" vibracionales. Descubrí cómo la terapia floral ayuda a perros y gatos a procesar sus emociones.',
    content: `
      <p class="intro"><strong>Los animales son "esponjas" vibracionales de su entorno.</strong> Ellos no tienen el filtro mental que tenemos los humanos; perciben y absorben directamente la energía emocional de la casa y de sus dueños.</p>
      
      <h3>El estrés en animales</h3>
      <p>Mudanzas, ruidos fuertes de la ciudad, cambios en la dinámica familiar o la llegada de un bebé pueden desestabilizar profundamente a nuestras mascotas. A menudo, lo que etiquetamos como "mal comportamiento" es simplemente una manifestación de ansiedad o miedo.</p>
      
      <h3>Terapia Floral para ellos</h3>
      <p>El programa <strong>"Huellas en Calma"</strong> aplica la terapia floral de Bach de forma no invasiva. No buscamos "sedar" al animal, sino darle las herramientas vibracionales para que procese el miedo o la ansiedad desde su propia naturaleza emocional.</p>
      
      <p>Es un acto de amor y respeto profundo hacia esos compañeros que nos dan todo sin pedir nada.</p>
      
      <div class="cta-block">
        <p>Devolvele la calma a tu compañero de vida.</p>
        <a href="/reservas" class="btn btn-primary">Consultá por la armonización de tu mascota</a>
      </div>
    `,
    image: '/hero-bg.png'
  },
  {
    slug: 'el-codigo-vibratorio',
    title: 'El Código Vibratorio: Tu Melodía Personal',
    excerpt: 'Nuestra propuesta más exclusiva. Una pieza musical única, compuesta a medida para tu frecuencia específica.',
    content: `
      <p class="intro"><strong>¿Cómo llevarte la calma de la sesión a tu rutina diaria?</strong> Muchas veces logramos un estado de paz en el consultorio, pero el caos de la semana nos lo arrebata rápidamente.</p>
      
      <h3>Un anclaje sonoro</h3>
      <p>Esta es nuestra propuesta más exclusiva. Tras una sesión de sintonía profunda, donde identificamos tu tono fundamental y tus necesidades armónicas, <strong>desarrollamos una pieza musical única</strong> basada en tu frecuencia específica.</p>
      
      <h3>Alta Fidelidad y Rigor</h3>
      <p>No es música generada por IA ni sonidos genéricos. Es una composición original, grabada con calidad de estudio y diseñada con rigor pedagógico musical. Es un <strong>activo digital de alta fidelidad</strong>.</p>
      
      <p>Usala como anclaje en tus meditaciones, para dormir o simplemente para volver a tu eje cuando el mundo exterior abruma. Es tu refugio sonoro portátil.</p>
      
      <div class="cta-block">
        <p>Tené tu propia medicina sonora.</p>
        <a href="/reservas" class="btn btn-primary">Descubrí tu Código Vibratorio</a>
      </div>
    `,
    image: '/hero-bg.png'
  }
];
