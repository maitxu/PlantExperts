export interface ExpertSystemInfo {
  titulo: string;
  subtitulo: string;
  version: string;
  ambitoGeografico: string;
  cultivoObjetivo: string;
  avisoLegal: string;
  alcance: string[];
  limitaciones: string[];
  contextoEuskadi: {
    climatologia: string;
    vulnerabilidades: string;
    practicasRecomendadas: string[];
  };
  fuentes: {
    nombre: string;
    entidad: string;
    url?: string;
    descripcion: string;
  }[];
  losCincoComponentes: {
    numero: number;
    nombre: string;
    tecnologia: string;
    rol: string;
  }[];
  comparativaLLM: {
    aspecto: string;
    sistemaExpertoProlog: string;
    modeloLLM: string;
  }[];
  especificacionesTecnicas: {
    motorInferencia: string;
    paradigma: string;
    protocolo: string;
    enfoqueEtico: string;
  };
}

export const EXPERT_SYSTEM_INFO: ExpertSystemInfo = {
  titulo: 'PlantExpert Enterprise — Diagnóstico Fitosanitario',
  subtitulo: 'Plataforma profesional de diagnóstico clínico y bio-vigilancia fitopatológica en cultivos de tomate',
  version: '2.4.0 Enterprise',
  ambitoGeografico: 'Vertiente cantábrica y zonas atlánticas de Euskadi (Bizkaia, Gipuzkoa y comarcas cantábricas de Álava)',
  cultivoObjetivo: 'Cultivo de tomatera al aire libre (*Solanum lycopersicum L.*)',
  avisoLegal:
    'PlantExpert Enterprise es una plataforma profesional de apoyo a la toma de decisiones fitosanitarias (DSS - Decision Support System). Sus evaluaciones deductivas proporcionan diagnósticos clínicos presuntivos conforme a las buenas prácticas agrícolas y la Gestión Integrada de Plagas (GIP). Ante brotes severos o de declaración obligatoria, se recomienda contrastar con análisis fitopatológicos oficiales de laboratorio.',
  alcance: [
    'Diagnóstico diferencial de 4 enfermedades infecciosas principales: Alternariosis (*Alternaria solani*), Oídio (*Oidium neolycopersici / Leveillula taurica*), Mildiu tardío (*Phytophthora infestans*) y Mancha bacteriana (*Xanthomonas spp.*).',
    'Detección y clasificación de trastornos de riego y suelo: Estrés por déficit hídrico (sequía) y asfixia radicular por exceso de agua/anegamiento.',
    'Regla de cribado orientativa para desequilibrios nutricionales generales manifestados por clorosis intervenal.',
    'Gestión rigurosa de límites: discriminación explícita entre hechos afirmativos, respuestas desconocidas («No lo sé») y síntomas no comprobados, evitando falsos positivos.',
    'Detección y resolución de incompatibilidades lógicas (ej. suelo seco y encharcado reportados al mismo tiempo).',
  ],
  limitaciones: [
    'No prescribe ni comercializa fitosanitarios químicos de síntesis: conforme a la directiva comunitaria de Gestión Integrada de Plagas (RD 1311/2012 / Directiva UE), se priorizan medidas biológicas, culturales y mecánicas.',
    'No asigna porcentajes ficticios de probabilidad o certeza arbitraria: la inferencia en SWI-Prolog opera mediante deducción basada en reglas formales y cláusulas de Horn comprobables.',
    'No analiza imágenes mediante visión artificial opaca: todo el razonamiento se sustenta en hechos clínicos y signos objetivos observables reportados por el técnico o productor.',
    'La coincidencia con una regla sugiere considerar esa patología como prioritaria, requiriendo confirmación pericial ante intervenciones costosas.',
  ],
  contextoEuskadi: {
    climatologia:
      'El clima templado húmedo de la vertiente cantábrica vasca, con lluvias distribuidas a lo largo del año, nieblas litorales y periodos continuados de humedad relativa superior al 85% («sirimiri» y rocíos nocturnos persistentes), crea las condiciones ideales para el desarrollo de Phytophthora infestans y Alternaria solani en tomateras no cubiertas.',
    vulnerabilidades:
      'Los suelos francos y franco-arcillosos de los fondos de valle vascos retienen abundante humedad, lo que exige caballones elevados o marcos de plantación anchos (80-100 cm entre matas) para prevenir la asfixia radicular y facilitar la circulación del aire.',
    practicasRecomendadas: [
      'Entutorado alto y deshojado sanitario basal para evitar el contacto de foliolos con la tierra húmeda.',
      'Riego localizado en la base por goteo o manguera exudante a primera hora del día, evitando rigurosamente mojar el follaje.',
      'Acolchado orgánico (paja seca o compost maduro) para amortiguar el salpicado de patógenos del suelo.',
      'Retirada manual y eliminación de hojas afectadas al primer signo incipiente.',
    ],
  },
  losCincoComponentes: [
    {
      numero: 1,
      nombre: 'Interfaz de usuario clínica',
      tecnologia: 'React + TypeScript + Tailwind CSS (Google AI Studio)',
      rol: 'Formulario estructurado que recoge síntomas observables, distinguiendo entre observado («Sí»), no observado («No»), desconocido («No lo sé») y no comprobado.',
    },
    {
      numero: 2,
      nombre: 'Base de conocimiento agronómico',
      tecnologia: 'SWI-Prolog (archivos .pl)',
      rol: 'Hechos y reglas formales que representan el conocimiento fitopatológico de las patologías, vinculadas a fuentes bibliográficas contrastadas.',
    },
    {
      numero: 3,
      nombre: 'Motor de inferencia deductiva',
      tecnologia: 'SWI-Prolog (responder/4 y ejemplo_hacia_atras/3)',
      rol: 'Aplica encadenamiento hacia adelante para contrastar diagnósticos a partir de hechos y encadenamiento hacia atrás para auditar qué requisitos clínicos faltan para confirmar una patología.',
    },
    {
      numero: 4,
      nombre: 'Módulo de explicación clínica',
      tecnologia: 'TypeScript / Inferencia determinista',
      rol: 'Explica de forma transparente qué hechos activaron cada regla, qué información falta y proporciona enlaces a fuentes técnicas fiables.',
    },
    {
      numero: 5,
      nombre: 'Módulo de gobernanza y validación de reglas',
      tecnologia: 'Protocolo de validación de reglas clínicas fitosanitarias',
      rol: 'Permite incorporar nuevas reglas al sistema de manera supervisada, verificando fuentes internacionales, evitando contradicciones y garantizando consistencia semántica.',
    },
  ],
  comparativaLLM: [
    {
      aspecto: 'Trazabilidad y explicabilidad',
      sistemaExpertoProlog: 'Totalmente determinista: cada diagnóstico documenta con precisión la regla activada y los requisitos cumplidos sin ambigüedad.',
      modeloLLM: 'Caja negra probabilística: genera texto fluido pero no garantiza el cumplimiento de reglas lógicas formales.',
    },
    {
      aspecto: 'Riesgo de alucinación',
      sistemaExpertoProlog: '0% de alucinación: si no se cumplen todas las premisas, devuelve «información insuficiente» o «ninguna regla encaja».',
      modeloLLM: 'Puede inventar porcentajes de certeza no justificados o diagnosticar enfermedades sin datos suficientes.',
    },
    {
      aspecto: 'Manejo de contradicciones',
      sistemaExpertoProlog: 'Detecta formalmente inconsistencias (ej. suelo seco y encharcado a la vez) y detiene la inferencia solicitando revisión.',
      modeloLLM: 'Suele intentar conciliar contradicciones de forma forzada o pasar por alto la incompatibilidad física.',
    },
    {
      aspecto: 'Prescripción ética de pesticidas',
      sistemaExpertoProlog: 'Cumple estrictamente el marco de no recetar fitosanitarios de síntesis sin acreditación técnica.',
      modeloLLM: 'Frecuentemente recomienda marcas comerciales o químicos restringidos sin verificar la normativa local.',
    },
  ],
  fuentes: [
    {
      nombre: 'UC IPM — Early Blight (Alternaria solani)',
      entidad: 'University of California Statewide Integrated Pest Management Program',
      url: 'https://ipm.ucanr.edu/agriculture/tomato/early-blight/',
      descripcion: 'Ficha técnica de síntomas, ciclo biológico y manejo de Alternariosis en tomate.',
    },
    {
      nombre: 'UC IPM — Powdery Mildew on Field-Grown Tomatoes',
      entidad: 'University of California Statewide Integrated Pest Management Program',
      url: 'https://ipm.ucanr.edu/home-and-landscape/powdery-mildew-on-tomato/',
      descripcion: 'Identificación de oídio foliar y pautas de prevención en cultivo al aire libre.',
    },
    {
      nombre: 'UC IPM — Late Blight (Phytophthora infestans)',
      entidad: 'University of California Statewide Integrated Pest Management Program',
      url: 'https://ipm.ucanr.edu/agriculture/tomato/late-blight/',
      descripcion: 'Epidemiología y diagnóstico de mildiu en condiciones de humedad y rocío.',
    },
    {
      nombre: 'UMN Extension — Bacterial Spot of Tomato and Pepper',
      entidad: 'University of Minnesota Extension',
      url: 'https://extension.umn.edu/agriculture/specialty-crops/vegetable-farming/disease-management/bacterial-spot-of-tomato-and-pepper',
      descripcion: 'Sintomatología foliar y en fruto causada por Xanthomonas spp.',
    },
    {
      nombre: 'UMN Extension — Tomato Disorders (Problemas abióticos y de riego)',
      entidad: 'University of Minnesota Extension',
      url: 'https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/yard-and-garden-problems/tomato-disorders',
      descripcion: 'Diagnóstico de estrés hídrico, asfixia radicular y fluctuaciones de humedad.',
    },
    {
      nombre: 'UC IPM — Nutrient Deficiencies in Vegetables',
      entidad: 'University of California Statewide Integrated Pest Management Program',
      url: 'https://ipm.ucanr.edu/home-and-landscape/nutrient-deficiencies-vegetables/',
      descripcion: 'Patrones de clorosis intervenal y desequilibrios nutricionales en solanáceas.',
    },
    {
      nombre: 'Guías de Gestión Integrada de Plagas y Boletines Fitosanitarios',
      entidad: 'Servicio de Sanidad Vegetal del Gobierno Vasco / NEIKER',
      descripcion: 'Protocolos de sanidad vegetal adaptados a las condiciones de la vertiente atlántica de Euskadi.',
    },
  ],
  especificacionesTecnicas: {
    motorInferencia: 'SWI-Prolog v9.x (módulo http/http_server y http/json)',
    paradigma: 'Inferencia deductiva basada en reglas formales y unificación de términos (cláusulas de Horn)',
    protocolo: 'POST /diagnosticar con intercambio en formato JSON estandarizado',
    enfoqueEtico: 'Explicabilidad determinista, transparencia en reglas activadas y ausencia de cajas negras',
  },
};
