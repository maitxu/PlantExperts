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
    descripcion: string;
  }[];
  especificacionesTecnicas: {
    motorInferencia: string;
    paradigma: string;
    protocolo: string;
    enfoqueEtico: string;
  };
}

export const EXPERT_SYSTEM_INFO: ExpertSystemInfo = {
  titulo: 'PlantExpert — Tomateras de Euskadi',
  subtitulo: 'Sistema experto deductivo de orientación fitopatológica para huertos de ocio',
  version: '1.0.0-academic',
  ambitoGeografico: 'Comunidad Autónoma del País Vasco (Bizkaia, Gipuzkoa y comarcas cantábricas de Álava)',
  cultivoObjetivo: 'Tomatera de huerto al aire libre (*Solanum lycopersicum L.*)',
  avisoLegal:
    'Este sistema tiene una finalidad estrictamente académica, formativa y orientativa. Sus hipótesis deductivas no constituyen una certificación analítica de laboratorio ni un dictamen pericial vinculante. No debe emplearse como sustituto de análisis fitopatológicos oficiales.',
  alcance: [
    'Diagnóstico diferencial de las principales micosis foliares y de tallo en tomateras expuestas al clima atlántico: Mildiu (*Phytophthora infestans*), Oídio (*Oidium neolycopersici / Leveillula taurica*), Alternariosis (*Alternaria solani*) y Botrytis (*Botrytis cinerea*).',
    'Detección y clasificación de fisiopatías abióticas recurrentes: Podredumbre apical ("peseta" / blossom end rot) asociada al transporte deficiente de calcio, agrietado epidérmico por desequilibrio hídrico y escaldaduras solares.',
    'Discriminación etiológica de marchiteces: asfixia radicular en suelos pesados arcillosos vascos frente a deficiencia hídrica por sequedad puntual.',
    'Verificación de consistencia lógica entre observaciones reportadas y emisión de peticiones de datos pendientes cuando las evidencias son incompletas.',
  ],
  limitaciones: [
    'No prescribe ni recomienda pesticidas ni fitosanitarios de síntesis química: conforme al código ético agronómico y al marco normativo de Gestión Integrada de Plagas (RD 1311/2012), el sistema prioriza medidas culturales, mecánicas y biológicas.',
    'No asigna porcentajes ficticios de probabilidad o "certeza artificial": la inferencia en SWI-Prolog opera mediante deducción basada en reglas formales y cláusulas de Horn comprobables.',
    'No analiza imágenes por redes neuronales opacas: todo el razonamiento se sustenta en hechos empíricos contrastables proporcionados por el hortelano.',
    'Requiere conexión activa con el servicio externo SWI-Prolog encargado del motor de inferencia y la base de conocimiento.',
  ],
  contextoEuskadi: {
    climatologia:
      'El clima templado húmedo de la vertiente cantábrica vasca, caracterizado por lluvias distribuidas a lo largo del año, nieblas litorales y periodos continuados de humedad relativa superior al 85% ("sirimiri" y rocío matinal), crea el biotopo idóneo para la esporulación masiva de Phytophthora infestans y Alternaria solani en tomateras no cubiertas.',
    vulnerabilidades:
      'Los suelos francos o franco-arcillosos de los fondos de valle vascos retienen abundante humedad, lo que exige caballones elevados o marcos de plantación anchos (80-100 cm entre plantas) para prevenir la asfixia radicular y facilitar la circulación de aire entre el follaje.',
    practicasRecomendadas: [
      'Entutorado alto y deshojado sanitario basal para evitar el contacto de foliolos con la tierra húmeda.',
      'Riego localizado por goteo o exudación a primera hora del día, evitando rigurosamente mojar la masa foliar.',
      'Acolchado orgánico (paja seca o compost maduro) para amortiguar el salpicado de zoosporas fúngicas del suelo.',
      'Retirada manual y compostaje termófilo o eliminación de hojas afectadas al primer signo incipiente.',
    ],
  },
  fuentes: [
    {
      nombre: 'Guías de Gestión Integrada de Plagas: Tomate al Aire Libre',
      entidad: 'Servicio de Sanidad Vegetal — Departamento de Desarrollo Económico, Sostenibilidad y Medio Ambiente (Gobierno Vasco)',
      descripcion: 'Protocolos oficiales de monitorización de plagas y enfermedades en cultivos hortícolas del País Vasco.',
    },
    {
      nombre: 'Boletines de Avisos Fitosanitarios y Sanidad Agrícola',
      entidad: 'NEIKER — Instituto Vasco de Investigación y Desarrollo Agrario',
      descripcion: 'Modelos de predicción agrometeorológica para el riesgo de mildiu en la cornisa cantábrica.',
    },
    {
      nombre: 'EPPO Global Database: Phytophthora infestans & Alternaria solani',
      entidad: 'Organización Europea y Mediterránea para la Protección de las Plantas (EPPO)',
      descripcion: 'Estándares fitosanitarios internacionales y sintomatología descriptiva de patógenos solanáceos.',
    },
    {
      nombre: 'Fundamentos de Inteligencia Artificial y Programación Lógica (SWI-Prolog)',
      entidad: 'UPV/EHU — Euskal Herriko Unibertsitatea (Facultad de Informática)',
      descripcion: 'Bases teóricas de sistemas expertos deductivos basados en reglas y encadenamiento hacia adelante/atrás.',
    },
    {
      nombre: 'Manual de Fisiopatías y Desórdenes Nutricionales en Horticultura',
      entidad: 'Ministerio de Agricultura, Pesca y Alimentación (MAPA)',
      descripcion: 'Clasificación de desórdenes no parasitarios: podredumbre apical, rajado y asfixia en solanáceas.',
    },
  ],
  especificacionesTecnicas: {
    motorInferencia: 'SWI-Prolog v9.x (módulo http/http_server y http/json)',
    paradigma: 'Inferencia deductiva basada en reglas formales y unificación de términos',
    protocolo: 'POST /diagnosticar con intercambio en formato JSON estandarizado',
    enfoqueEtico: 'Explicabilidad determinista, transparencia en reglas activadas y ausencia de "cajas negras"',
  },
};
