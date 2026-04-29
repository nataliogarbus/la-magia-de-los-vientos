export interface Product {
    id: string;
    slug: string;
    title: string;
    category: 'Línea Adultos' | 'Kids & Mamás' | 'Línea Mascotas';
    price: number;
    shortDesc: string;
    fullDesc: string;
    benefits: string[];
    ingredients: string[];
    usage: string;
    image: string;
    tag?: string; // e.g. "Best Seller", "Noche", "Emergencia"
}

export const PRODUCTS: Product[] = [
    // LÍNEA ADULTOS
    {
        id: '1',
        slug: 'sos-rescate',
        title: 'SOS Rescate',
        category: 'Línea Adultos',
        price: 18900,
        tag: 'Emergencia',
        shortDesc: 'Auxilio inmediato para situaciones de shock, crisis o alto estrés.',
        fullDesc: 'Nuestra fórmula de auxilio más potente, basada en el Rescue Remedy original. Ideal para exámenes, malas noticias, accidentes o cualquier evento que desestabilice tu centro emocional de forma súbita.',
        benefits: [
            'Calma la agitación mental inmediata',
            'Reduce la sensación de pánico o bloqueo',
            'Ayuda a recuperar la presencia en momentos críticos',
            'Fórmula no sedante: mantiene la lucidez'
        ],
        ingredients: ['Star of Bethlehem', 'Rock Rose', 'Impatiens', 'Cherry Plum', 'Clematis'],
        usage: '4 gotas directamente debajo de la lengua o en medio vaso de agua, hasta 6 veces al día según la intensidad del síntoma.',
        image: '/frasco-ambar.png'
    },
    {
        id: '2',
        slug: 'calma-total',
        title: 'Calma Total',
        category: 'Línea Adultos',
        price: 18900,
        tag: 'Best Seller',
        shortDesc: 'Alivio para la ansiedad diaria y la rumiación mental.',
        fullDesc: 'Diseñado para quienes sienten que no pueden "frenar" la cabeza. Este preparado magistral ayuda a bajar los decibeles de la preocupación constante y el apuro interno.',
        benefits: [
            'Disminuye la ansiedad generalizada',
            'Frena la repetición de pensamientos negativos',
            'Mejora la calidad de la respuesta ante el estrés laboral',
            'Promueve un estado de serenidad activa'
        ],
        ingredients: ['White Chestnut', 'Agrimony', 'Impatiens', 'Red Chestnut'],
        usage: '4 gotas, 4 veces al día. Constancia mínima recomendada: 21 días.',
        image: '/frasco-ambar.png'
    },
    {
        id: '3',
        slug: 'descanso-profundo',
        title: 'Descanso Profundo',
        category: 'Línea Adultos',
        price: 18900,
        tag: 'Noche',
        shortDesc: 'Higiene del sueño y desconexión nocturna.',
        fullDesc: 'La solución para el insomnio por hiperactividad mental. Ayuda a que el cuerpo y la mente entiendan que el día terminó, facilitando un sueño reparador sin efectos secundarios.',
        benefits: [
            'Acorta el tiempo para conciliar el sueño',
            'Evita los despertares nocturnos por preocupaciones',
            'Despierta con sensación de descanso real',
            'No genera dependencia ni somnolencia matinal'
        ],
        ingredients: ['White Chestnut', 'Vervain', 'Mimulus', 'Olive'],
        usage: 'Tomar una dosis 1 hora antes de dormir y otra justo antes de acostarse. Repetir si hay despertares nocturnos.',
        image: '/frasco-ambar.png'
    },
    {
        id: '4',
        slug: 'enfoque-y-claridad',
        title: 'Enfoque & Claridad',
        category: 'Línea Adultos',
        price: 18900,
        tag: 'Productividad',
        shortDesc: 'Combate la dispersión y la fatiga mental post-estrés.',
        fullDesc: 'Para quienes se sienten "apagados" o con la mente neblinosa. Potencia la presencia mental y la confianza en las propias capacidades para afrontar desafíos.',
        benefits: [
            'Mejora la concentración sostenida',
            'Reduce la sensación de fatiga mental',
            'Fomenta la confianza en la toma de decisiones',
            'Ideal para jornadas de trabajo intensas'
        ],
        ingredients: ['Clematis', 'Larch', 'Hornbeam', 'Wild Rose'],
        usage: '4 gotas al inicio de la jornada y 4 gotas después del almuerzo.',
        image: '/frasco-ambar.png'
    },
    {
        id: '5',
        slug: 'animo-y-vitalidad',
        title: 'Ánimo & Vitalidad',
        category: 'Línea Adultos',
        price: 18900,
        tag: 'Energía',
        shortDesc: 'Para salir del desánimo y recuperar la alegría de hacer.',
        fullDesc: 'Diseñado para estados de apatía, tristeza sin causa aparente o pesimismo recurrente. Activa la motivación intrínseca y el entusiasmo por los proyectos personales.',
        benefits: [
            'Eleva el estado de ánimo de forma natural',
            'Combate la apatía y la falta de motivación',
            'Restaura la alegría y el interés por la vida cotidiana',
            'Sin efectos estimulantes artificiales'
        ],
        ingredients: ['Gentian', 'Gorse', 'Wild Rose', 'Mustard'],
        usage: '4 gotas, 4 veces al día. Efecto progresivo: notar mejoría entre el 7° y 14° día.',
        image: '/frasco-ambar.png'
    },

    // KIDS & MAMÁS
    {
        id: '6',
        slug: 'sos-kids',
        title: 'SOS Kids',
        category: 'Kids & Mamás',
        price: 18900,
        tag: 'Sin Alcohol',
        shortDesc: 'Consuelo y calma para berrinches, sustos o miedos repentinos.',
        fullDesc: 'Fórmula sin alcohol pensada para la sensibilidad infantil. Brinda seguridad y contención en momentos de llanto inconsolable o desbordes emocionales.',
        benefits: [
            'Contiene el desborde emocional rápido',
            'Ideal para miedos nocturnos o pesadillas',
            'Seguro para todas las edades (desde bebés)',
            'Base de glicerina vegetal, sabor agradable'
        ],
        ingredients: ['Rock Rose', 'Mimulus', 'Star of Bethlehem', 'Chicory'],
        usage: '2 a 4 gotas en mamadera, vaso de agua o directo en boca. Uso según necesidad.',
        image: '/frasco-ambar.png'
    },
    {
        id: '7',
        slug: 'foco-escolar',
        title: 'Foco Escolar',
        category: 'Kids & Mamás',
        price: 18900,
        tag: 'Estudio',
        shortDesc: 'Mejora la concentración y reduce la dispersión en el estudio.',
        fullDesc: 'Ayuda a los niños a centrar su atención en sus tareas académicas, reduciendo el soñar despierto o la impaciencia por terminar rápido.',
        benefits: [
            'Aumenta la claridad mental en clase',
            'Reduce la distracción por estímulos externos',
            'Fomenta la paciencia en procesos de aprendizaje',
            'Ideal para época de exámenes'
        ],
        ingredients: ['Clematis', 'Larch', 'Chestnut Bud', 'Gentian'],
        usage: '4 gotas al desayunar y 4 gotas antes de entrar al colegio.',
        image: '/frasco-ambar.png'
    },
    {
        id: '8',
        slug: 'maternidad-serena',
        title: 'Maternidad Serena',
        category: 'Kids & Mamás',
        price: 18900,
        tag: 'Mamás',
        shortDesc: 'Soporte emocional para el agotamiento y la sobrecarga de la crianza.',
        fullDesc: 'Para las mamás que dan todo y a veces sienten que no tienen más. Este preparado aborda la sobrecarga emocional, el miedo a no ser suficiente y el agotamiento profundo.',
        benefits: [
            'Alivia la sensación de "no puedo más"',
            'Reduce la irritabilidad por sobrecarga',
            'Nutre el amor propio en el rol materno',
            'Compatible con lactancia (consultar con profesional)'
        ],
        ingredients: ['Elm', 'Oak', 'Chicory', 'Rock Water'],
        usage: '4 gotas, 4 veces al día. Uso continuado por al menos 4 semanas.',
        image: '/frasco-ambar.png'
    },

    // LÍNEA MASCOTAS
    {
        id: '9',
        slug: 'calma-canina',
        title: 'Calma Canina',
        category: 'Línea Mascotas',
        price: 18900,
        tag: 'Perros',
        shortDesc: 'Para perros con ansiedad, miedo a los truenos o separación.',
        fullDesc: 'Fórmula inodora e insípida especialmente formulada para el sistema nervioso canino. Ideal para mudanzas, viajes, tormentas eléctricas o la llegada de un bebé a la familia.',
        benefits: [
            'Reduce la conducta ansiosa o destructiva',
            'Calma sin sedar ni alterar la conducta natural',
            'Sin olor ni sabor — fácil de administrar',
            'Compatible con otros tratamientos veterinarios'
        ],
        ingredients: ['Mimulus', 'Rock Rose', 'Star of Bethlehem', 'Aspen'],
        usage: '4 gotas en el agua o directamente en la boca, 4 veces al día.',
        image: '/frasco-ambar.png'
    },
    {
        id: '10',
        slug: 'equilibrio-felino',
        title: 'Equilibrio Felino',
        category: 'Línea Mascotas',
        price: 18900,
        tag: 'Gatos',
        shortDesc: 'Para gatos tensos, marcadores de territorio o con conflictos entre convivientes.',
        fullDesc: 'Los gatos son animales extremadamente sensibles a los cambios del entorno. Este preparado ayuda a restaurar el equilibrio emocional en situaciones de tensión o adaptación.',
        benefits: [
            'Reduce el marcaje territorial por estrés',
            'Facilita la convivencia entre varios gatos',
            'Ideal para mudanzas o cambios de rutina',
            'Fórmula sin alcohol, base agua/glicerina'
        ],
        ingredients: ['Holly', 'Beech', 'Walnut', 'Vine'],
        usage: '4 gotas en el agua de bebida. Cambiar el agua dos veces al día con la fórmula fresca.',
        image: '/frasco-ambar.png'
    }
];
