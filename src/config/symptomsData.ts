import {
  CategoriaConfig,
  PreguntaSintoma,
  CasoPruebaManual,
} from '../types/plantexpert';

export const CATEGORIAS: CategoriaConfig[] = [
  {
    id: 'hojas',
    titulo: 'Follaje y Hojas',
    descripcion: 'Manchas, coloración, crecimiento de micelio y amarilleo en la masa foliar.',
  },
  {
    id: 'lesiones',
    titulo: 'Puntos y Lesiones',
    descripcion: 'Morfología de las manchas, anillos en diana y bordes o halos.',
  },
  {
    id: 'frutos',
    titulo: 'Frutos y Estructura',
    descripcion: 'Lesiones ásperas en frutos y marchitamiento general de la planta.',
  },
  {
    id: 'riego_nutricion',
    titulo: 'Riego, Suelo y Nutrición',
    descripcion: 'Estado hídrico del sustrato y patrones nutricionales en las nervaduras.',
  },
];

export const PREGUNTAS_SINTOMAS: PreguntaSintoma[] = [
  // --- Categoría: Hojas ---
  {
    id: 'manchas_marrones',
    categoria: 'hojas',
    texto: '¿Las hojas tienen manchas marrones o negras?',
    aclaracion: 'Puntos o áreas necróticas oscuras, circulares o angulares en el haz y envés foliar.',
    significadoAgronomico: 'Indicio compatible con Alternariosis o tizón temprano (Alternaria solani).',
  },
  {
    id: 'manchas_amarillas',
    categoria: 'hojas',
    texto: '¿Las hojas tienen manchas amarillas irregulares?',
    aclaracion: 'Decoloración o parches cloróticos amarillos visibles antes de la desecación tisular.',
    significadoAgronomico: 'Primer síntoma característico de Oídio o Ceniza en tomateras.',
  },
  {
    id: 'crecimiento_blanco_enves',
    categoria: 'hojas',
    texto: '¿Se observa polvo o crecimiento blanquecino en las hojas?',
    aclaracion: 'Eflorescencia algodonosa o pulverulenta en el envés o haz de los foliolos (micelio fúngico activo).',
    significadoAgronomico: 'Estructuras de esporulación fúngica presentes en Oídio y Mildiu tardío.',
  },
  {
    id: 'lesiones_irregulares_acuosas',
    categoria: 'hojas',
    texto: '¿Las manchas parecen húmedas, aceitosas o acuosas?',
    aclaracion: 'Lesiones de aspecto empapado o hidrófilo que se necrosan rápidamente.',
    significadoAgronomico: 'Síntoma cardinal del Mildiu tardío (Phytophthora infestans).',
  },
  {
    id: 'amarilleo',
    categoria: 'hojas',
    texto: '¿Las hojas presentan amarilleo o pérdida general de verde?',
    aclaracion: 'Clorosis general difusa sin manchas delimitadas evidentes en el limbo.',
    significadoAgronomico: 'Suele deberse a deficiencias nutricionales o senescencia foliar.',
  },

  {
    id: 'avance_rapido',
    categoria: 'hojas',
    texto: '¿El avance de las manchas en el follaje es muy rápido?',
    aclaracion: 'Propagación fulminante de lesiones en cuestión de 48-72 horas tras niebla o lluvia.',
    significadoAgronomico: 'Factor epidemiológico cardinal del Mildiu tardío en clima oceánico húmedo.',
  },
  {
    id: 'tiempo_reciente_humedo',
    categoria: 'hojas',
    texto: '¿Ha habido tiempo reciente muy húmedo, lluvia o rocío persistente?',
    aclaracion: 'Humedad ambiental alta prolongada (>90%) frecuente en huertos de Euskadi.',
    significadoAgronomico: 'Condición predisponente para la esporulación masiva de Phytophthora infestans.',
  },

  // --- Categoría: Lesiones y Morfología ---
  {
    id: 'anillos_concentricos',
    categoria: 'lesiones',
    texto: '¿Las manchas tienen anillos concéntricos, como una diana?',
    aclaracion: 'Zonación en anillos concéntricos visible dentro de las manchas marrones (efecto diana patognomónico).',
    significadoAgronomico: 'Dato diferenciador patognomónico de Alternaria solani.',
  },
  {
    id: 'manchas_pequenas_oscuras',
    categoria: 'lesiones',
    texto: '¿Hay pequeños puntos oscuros o moteado necrótico en las hojas?',
    aclaracion: 'Manchas milimétricas (1-3 mm), angulares o acuosas en el haz foliar.',
    significadoAgronomico: 'Característico de Mancha bacteriana (Xanthomonas spp.).',
  },
  {
    id: 'halo_amarillo',
    categoria: 'lesiones',
    texto: '¿Las manchas tienen un halo o borde amarillo alrededor?',
    aclaracion: 'Anillo clorótico amarillo que delimita la zona necrótica central.',
    significadoAgronomico: 'Respuesta tisular provocada por toxinas bacterianas en mancha bacteriana.',
  },

  // --- Categoría: Frutos y Estructura ---
  {
    id: 'lesiones_fruto_asperas_oscuras',
    categoria: 'frutos',
    texto: '¿Los frutos tienen manchas oscuras, zonas ásperas o costrosas?',
    aclaracion: 'Lesiones superficiales con relieve rugoso, costra parda o aspecto verrugoso en fruto.',
    significadoAgronomico: 'Daño directo en fruto por colonización de Mancha bacteriana.',
  },
  {
    id: 'grietas_fruto',
    categoria: 'frutos',
    texto: '¿Los frutos presentan grietas o rajaduras en la piel sin manchas?',
    aclaracion: 'Fisuras longitudinales o concéntricas en tomates maduros debidas a oscilaciones bruscas de humedad.',
    significadoAgronomico: 'Desorden fisiológico abiótico (agrietamiento o cracking), no provocado por hongos ni bacterias.',
  },
  {
    id: 'marchitez',
    categoria: 'frutos',
    texto: '¿La planta está marchita o tiene las hojas caídas?',
    aclaracion: 'Pérdida evidente de turgencia celular donde brotes y peciolos se curvan hacia abajo.',
    significadoAgronomico: 'Estrés hídrico que puede deberse a falta de riego o asfixia por anegamiento.',
  },
  {
    id: 'hojas_caidas',
    categoria: 'frutos',
    texto: '¿Aparecen hojas caídas o desprendimiento foliar prematuro?',
    aclaracion: 'Defoliación basal sin marchitamiento previo agudo.',
    significadoAgronomico: 'Estrés abiótico general o caída por envejecimiento no parasitario.',
  },

  // --- Categoría: Riego, Suelo y Nutrición ---
  {
    id: 'patron_amarilleo_entre_hojas',
    categoria: 'riego_nutricion',
    texto: '¿El amarilleo sigue un patrón entre las nervaduras (amarilleo intervenal)?',
    aclaracion: 'Las nervaduras conservan su coloración verde mientras el parénquima intercostal amarillea.',
    significadoAgronomico: 'Signo orientativo de desequilibrio nutricional (carencia de magnesio o hierro).',
  },
];

export const MAPEO_NOMBRES_HECHOS: Record<string, string> = {
  manchas_marrones: 'Manchas marrones o negras en hojas',
  manchas_marrones_negras: 'Manchas marrones o negras en hojas',
  anillos_concentricos: 'Anillos concéntricos en diana dentro de las manchas',
  manchas_amarillas: 'Manchas amarillas en hojas',
  amarilleo_hojas: 'Amarilleo en hojas',
  crecimiento_blanco_enves: 'Polvillo o crecimiento blanquecino en hojas',
  crecimiento_blanco_hojas: 'Crecimiento blanco en hojas',
  lesiones_irregulares_acuosas: 'Lesiones irregulares y acuosas',
  avance_rapido: 'Avance rápido de las lesiones',
  tiempo_reciente_humedo: 'Tiempo reciente húmedo o lluvioso',
  manchas_pequenas_oscuras: 'Manchas pequeñas oscuras',
  halo_amarillo: 'Halo amarillo alrededor de manchas',
  lesiones_fruto_asperas_oscuras: 'Lesiones ásperas y oscuras en el fruto',
  grietas_fruto: 'Grietas o rajaduras en fruto',
  marchitez: 'Marchitez o flacidez de la planta',
  suelo_seco: 'Suelo seco (tierra suelta sin humedad)',
  suelo_encharcado: 'Suelo encharcado o anegado con exceso de agua',
  suelo_humedad_desconocida: 'Humedad del suelo sin comprobar',
  amarilleo: 'Amarilleo foliar generalizado',
  patron_amarilleo_entre_hojas: 'Amarilleo entre las nervaduras (intervenal)',
  hojas_caidas: 'Hojas caídas o defoliación',
};

/**
 * Batería de validación agronómica y casos de prueba clínica de campo
 */
export const CASOS_PRUEBA_MANUALES: CasoPruebaManual[] = [
  {
    id: 'test_alternariosis',
    titulo: '1. Alternariosis (R1_ALT)',
    descripcion: 'Manchas marrones/negras + anillos concéntricos en diana.',
    hechosEsperados: ['manchas_marrones', 'anillos_concentricos'],
    respuestas: {
      manchas_marrones: 'si',
      anillos_concentricos: 'si',
      manchas_amarillas: 'no',
      crecimiento_blanco_enves: 'no',
      lesiones_irregulares_acuosas: 'no',
      marchitez: 'no',
      manchas_pequenas_oscuras: 'no',
    },
    humedadSuelo: 'humeda',
    resultadoEsperado: 'Diagnóstico: Alternariosis validada mediante criterio R1_ALT.',
  },
  {
    id: 'test_oidio',
    titulo: '2. Oídio (R2_OID)',
    descripcion: 'Manchas amarillas + crecimiento blanquecino en hojas.',
    hechosEsperados: ['manchas_amarillas', 'crecimiento_blanco_enves'],
    respuestas: {
      manchas_amarillas: 'si',
      crecimiento_blanco_enves: 'si',
      manchas_marrones: 'no',
      anillos_concentricos: 'no',
      lesiones_irregulares_acuosas: 'no',
      marchitez: 'no',
    },
    humedadSuelo: 'humeda',
    resultadoEsperado: 'Diagnóstico: Oídio validado mediante criterio R2_OID.',
  },
  {
    id: 'test_mildiu_alternativa',
    titulo: '3. Mildiu alternativa (R3_MIL_2)',
    descripcion: 'Lesiones irregulares acuosas + avance rápido + tiempo reciente húmedo.',
    hechosEsperados: ['lesiones_irregulares_acuosas', 'avance_rapido', 'tiempo_reciente_humedo'],
    respuestas: {
      lesiones_irregulares_acuosas: 'si',
      avance_rapido: 'si',
      tiempo_reciente_humedo: 'si',
      crecimiento_blanco_enves: 'no',
      manchas_marrones: 'no',
      marchitez: 'no',
    },
    humedadSuelo: 'humeda',
    resultadoEsperado: 'Diagnóstico: Mildiu tardío validado mediante criterio R3_MIL_2.',
  },
  {
    id: 'test_datos_insuficientes',
    titulo: '4. Datos insuficientes',
    descripcion: 'Solo marchitez presente con humedad del suelo sin comprobar o desconocida.',
    hechosEsperados: ['marchitez'],
    respuestas: {
      marchitez: 'si',
      manchas_marrones: 'no',
      manchas_amarillas: 'no',
      crecimiento_blanco_enves: 'no',
      lesiones_irregulares_acuosas: 'no',
      amarilleo: 'no',
    },
    humedadSuelo: 'no_lo_se',
    resultadoEsperado: 'Estado: informacion_insuficiente. Faltan datos del sustrato para discriminar.',
  },
  {
    id: 'test_sin_regla_grietas',
    titulo: '5. Sin regla (Grietas de fruto)',
    descripcion: 'Grietas o rajaduras en fruto sin otros síntomas compatibles.',
    hechosEsperados: ['grietas_fruto'],
    respuestas: {
      grietas_fruto: 'si',
      manchas_marrones: 'no',
      anillos_concentricos: 'no',
      manchas_amarillas: 'no',
      crecimiento_blanco_enves: 'no',
      marchitez: 'no',
      lesiones_fruto_asperas_oscuras: 'no',
    },
    humedadSuelo: 'humeda',
    resultadoEsperado: 'Estado: ninguna_regla_encaja. No se activa ninguna regla patológica.',
  },
  {
    id: 'test_varias_hipotesis',
    titulo: '6. Diagnóstico diferencial multicausal',
    descripcion: 'Entrada que activa dos causas simultáneas (Oídio + Mildiu tardío).',
    hechosEsperados: ['manchas_amarillas', 'crecimiento_blanco_enves', 'lesiones_irregulares_acuosas'],
    respuestas: {
      manchas_amarillas: 'si',
      crecimiento_blanco_enves: 'si',
      lesiones_irregulares_acuosas: 'si',
      manchas_marrones: 'no',
      anillos_concentricos: 'no',
      marchitez: 'no',
    },
    humedadSuelo: 'humeda',
    resultadoEsperado: 'Diagnóstico diferencial: se detectan concurrentemente oídio y mildiu tardío.',
  },
  {
    id: 'caso_error_api',
    titulo: '7. Error de conexión a la API',
    descripcion: 'Simula un fallo de conexión al servicio SWI-Prolog para comprobar el manejo robusto de error.',
    hechosEsperados: ['[error_red]'],
    respuestas: {},
    humedadSuelo: 'no_lo_se',
    resultadoEsperado: 'Estado: error_servicio. Mensaje explícito con botón de reintento.',
  },
];
