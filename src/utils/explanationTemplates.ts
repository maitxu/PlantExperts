import {
  HipotesisRaw,
  HipotesisAgrupada,
} from '../types/plantexpert';
import { MAPEO_NOMBRES_HECHOS } from '../config/symptomsData';

interface PlantillaAfeccion {
  nombreCientifico: string;
  naturaleza: 'Micosis foliar' | 'Fisiopatía abiótica' | 'Trastorno edáfico' | 'Bacteriosis';
  descripcionEtiologica: string;
  epidemiologiaEuskadi: string;
  medidasCulturales: string[];
}

const PLANTILLAS_AFECCIONES: Record<string, PlantillaAfeccion> = {
  'alternariosis': {
    nombreCientifico: 'Alternaria solani Sorauer',
    naturaleza: 'Micosis foliar',
    descripcionEtiologica:
      'Infección fúngica necrótica caracterizada por manchas marrones o negras delimitadas que desarrollan anillos concéntricos en diana, fruto de las oleadas sucesivas de esporulación del patógeno.',
    epidemiologiaEuskadi:
      'En huertos de Bizkaia y Gipuzkoa, suele manifestarse en periodos de rocíos nocturnos persistentes combinados con temperaturas moderadas (20-25 °C). Afecta predominantemente a hojas maduras inferiores antes de ascender por el dosel.',
    medidasCulturales: [
      'Eliminar y destruir de forma manual los foliolos basales que muestren las primeras manchas en diana.',
      'Mejorar la aireación de la mata mediante desbrotado de axilas ("chupones") y entutorado firme.',
      'Regar siempre a nivel de suelo evitando por completo mojar las hojas o salpicar tierra.',
      'Aplicar rotación mínima de solanáceas de 3 años en la parcela para agotar inóculo del suelo.',
    ],
  },
  'oidio': {
    nombreCientifico: 'Oidium neolycopersici / Leveillula taurica',
    naturaleza: 'Micosis foliar',
    descripcionEtiologica:
      'Micosis ectoparásita manifestada por amarilleamiento foliar seguido de una eflorescencia pulverulenta blanquecina sobre el haz o envés foliar, reduciendo drásticamente la capacidad fotosintética.',
    epidemiologiaEuskadi:
      'Frecuente en finales de primavera y verano en ambientes protegidos o rincones resguardados con baja ventilación y humedad ambiental fluctuante en el litoral vasco.',
    medidasCulturales: [
      'Favorecer la ventilación cruzada espaciando las plantas al menos 70-80 cm entre hileras.',
      'Evitar abonos nitrogenados en exceso, que producen tejidos foliares hiper-suculentos y muy vulnerables.',
      'Retirar hojas senescentes muy atacadas para frenar la dispersión de conidios por el viento.',
      'Desinfectar las tijeras de podar entre plantas con alcohol o solución jabonosa.',
    ],
  },
  'mildiu': {
    nombreCientifico: 'Phytophthora infestans (Mont.) de Bary',
    naturaleza: 'Micosis foliar',
    descripcionEtiologica:
      'Oomiceto de invasión tisular destructiva que causa lesiones acuosas irregulares en hojas y tallos, con necrosis fulminante en cuestión de 48 a 72 horas bajo condiciones favorables.',
    epidemiologiaEuskadi:
      'Es la patología más destructiva para la tomatera al aire libre en Euskadi. La regla de los tres dieces (temperatura > 10 °C, humedad relativa > 90% y precipitación > 10 mm en 48 h) se cumple con asiduidad en la cornisa cantábrica durante el verano.',
    medidasCulturales: [
      'Cortar de inmediato ramas y peciolos con chancros acuosos antes de que el hongo colonice el tallo principal.',
      'Si el ataque es incipiente, podar las hojas bajas para cortar la "escalera de infección" desde el suelo.',
      'Instalar cubierta o tejadillo transparente si es viable para interceptar la lluvia directa en huertos pequeños.',
      'Mantener el marco de plantación amplio para acelerar el secado del rocío matinal.',
    ],
  },
  'botrytis': {
    nombreCientifico: 'Botrytis cinerea Pers.',
    naturaleza: 'Micosis foliar',
    descripcionEtiologica:
      'Hongo saprófito facultativo que aprovecha heridas de poda o flores desprendidas para producir podredumbre blanda y abundante micelio velloso aterciopelado de color ceniza.',
    epidemiologiaEuskadi:
      'Habitual en otoños tempranos o tras deshojados agresivos realizados en días húmedos o con llovizna.',
    medidasCulturales: [
      'Realizar las podas de chupones exclusivamente en días secos y soleados a primera hora para que la herida cicatrice rápido.',
      'No dejar muñones al podar; realizar cortes limpios a ras del tallo principal.',
      'Retirar pétalos marchitos que queden pegados a frutos en crecimiento.',
    ],
  },
  'podredumbre_apical': {
    nombreCientifico: 'Fisiopatía abiótica (Blossom End Rot / Necrosis apical)',
    naturaleza: 'Fisiopatía abiótica',
    descripcionEtiologica:
      'Trastorno fisiológico debido a un déficit localizado de ion calcio (Ca²⁺) en las células distales del fruto durante su crecimiento acelerado, resultando en colapso tisular y una mancha negra coriácea hundida.',
    epidemiologiaEuskadi:
      'En suelos vascos rara vez falta calcio total, pero las oscilaciones hídricas (días cálidos de sur seguidos de riego irregular) bloquean el flujo transpiratorio que transporta el calcio hacia la punta del fruto.',
    medidasCulturales: [
      'Regularizar estrictamente el riego para mantener una humedad constante sin secar el sustrato ni anegarlo.',
      'Instalar acolchado (mulch) de paja para evitar la evaporación brusca de agua superficial.',
      'Evitar abonos amoniacales o exceso de potasio y magnesio, que compiten con el calcio a nivel radicular.',
      'Retirar los frutos con la "peseta" ya formada para derivar la savia a los nuevos cuajados.',
    ],
  },
  'asfixia': {
    nombreCientifico: 'Hipoxia edáfica por anegamiento',
    naturaleza: 'Trastorno edáfico',
    descripcionEtiologica:
      'Colapso respiratorio de la masa radicular provocado por saturación continua de los macroporos del suelo con agua, impidiendo el intercambio gaseoso y desencadenando marchitez y pudrición de pelos absorbentes.',
    epidemiologiaEuskadi:
      'Muy frecuente en parcelas domésticas de valles aluviales y suelos arcillosos o con mal drenaje tras trombas de agua estivales.',
    medidasCulturales: [
      'Cultivar en caballones o bancales elevados (mínimo 20-30 cm) para asegurar la escorrentía superficial.',
      'Suspender el riego de inmediato y realizar un escarificado superficial suave de la costra para airear.',
      'Aportar compost maduro y materia orgánica estructurante antes del trasplante para esponjar tierras pesadas.',
    ],
  },
  'sequia': {
    nombreCientifico: 'Déficit hídrico severo',
    naturaleza: 'Fisiopatía abiótica',
    descripcionEtiologica:
      'Pérdida de la presión de turgencia en los tejidos conductores como consecuencia de una transpiración foliar que supera ampliamente la tasa de absorción de agua por las raíces.',
    epidemiologiaEuskadi:
      'Suele ocurrir en huertos en maceta o cajoneras durante episodios de viento sur cálido o varios días despejados sin aporte de agua.',
    medidasCulturales: [
      'Efectuar un riego profundo y pausado a primeras horas de la mañana, preferiblemente por goteo.',
      'Incorporar acolchado vegetal sobre el suelo para retener la humedad edáfica.',
      'Proteger temporalmente del viento sur seco mediante pantallas cortavientos si es necesario.',
    ],
  },
};

/**
 * Agrupa hipótesis crudas por causa, consolidando reglas activadas y requisitos cumplidos.
 */
export function agruparHipotesisCrudas(hipotesisLista: HipotesisRaw[]): HipotesisAgrupada[] {
  const mapa = new Map<string, HipotesisAgrupada>();

  for (const h of hipotesisLista) {
    const causaNormalizada = h.causa.trim();
    const reglasEntrantes: string[] = [];
    if (h.reglas_ids && Array.isArray(h.reglas_ids)) {
      reglasEntrantes.push(...h.reglas_ids);
    }
    if (h.regla_id && !reglasEntrantes.includes(h.regla_id)) {
      reglasEntrantes.push(h.regla_id);
    }

    const reqsEntrantes = h.requisitos_cumplidos || [];

    if (!mapa.has(causaNormalizada)) {
      // Buscar plantilla por coincidencia de texto
      const plantilla = buscarPlantilla(causaNormalizada);

      mapa.set(causaNormalizada, {
        causa: causaNormalizada,
        nombre_cientifico: h.nombre_cientifico || plantilla?.nombreCientifico,
        reglas_ids: reglasEntrantes,
        requisitos_cumplidos: [...reqsEntrantes],
        explicacionDetallada: plantilla?.descripcionEtiologica || h.explicacion || 'Hipótesis deducida conforme a las reglas formales del sistema.',
        medidasCulturales: plantilla?.medidasCulturales || [
          'Mejorar la aireación del dosel foliar.',
          'Supervisar la humedad del sustrato y evitar regar el follaje.',
        ],
      });
    } else {
      const existente = mapa.get(causaNormalizada)!;
      for (const rId of reglasEntrantes) {
        if (!existente.reglas_ids.includes(rId)) {
          existente.reglas_ids.push(rId);
        }
      }
      for (const req of reqsEntrantes) {
        if (!existente.requisitos_cumplidos.includes(req)) {
          existente.requisitos_cumplidos.push(req);
        }
      }
    }
  }

  return Array.from(mapa.values());
}

function buscarPlantilla(causa: string): PlantillaAfeccion | undefined {
  const c = causa.toLowerCase();
  if (c.includes('alternari')) return PLANTILLAS_AFECCIONES['alternariosis'];
  if (c.includes('oidio') || c.includes('ceniza')) return PLANTILLAS_AFECCIONES['oidio'];
  if (c.includes('mildi')) return PLANTILLAS_AFECCIONES['mildiu'];
  if (c.includes('botrytis') || c.includes('gris')) return PLANTILLAS_AFECCIONES['botrytis'];
  if (c.includes('apical') || c.includes('peseta') || c.includes('blossom')) return PLANTILLAS_AFECCIONES['podredumbre_apical'];
  if (c.includes('asfixia')) return PLANTILLAS_AFECCIONES['asfixia'];
  if (c.includes('sequia') || c.includes('hidrico') || c.includes('déficit')) return PLANTILLAS_AFECCIONES['sequia'];
  return undefined;
}

/**
 * Genera texto explicativo determinista para los datos pendientes solicitados por SWI-Prolog
 */
export function generarExplicacionDatosPendientes(datosPendientes: string[]): {
  id: string;
  nombre: string;
  orientacion: string;
}[] {
  return datosPendientes.map((datoId) => {
    const nombre = MAPEO_NOMBRES_HECHOS[datoId] || datoId;
    let orientacion = 'Compruebe este parámetro en la planta o sustrato para discriminar el diagnóstico.';

    if (datoId === 'humedad_suelo') {
      orientacion =
        'Introduzca los dedos unos 5 cm en la tierra bajo la planta: determine si el sustrato está seco, con humedad de tempero normal o completamente empapado/encharcado.';
    } else if (datoId === 'pudricion_cuello_raiz') {
      orientacion =
        'Inspeccione la base del tallo en contacto con el suelo: compruebe si existe estrechamiento negro o reblandecimiento blando de los tejidos.';
    } else if (datoId === 'tiempo_reciente_humedo') {
      orientacion =
        'Considere si en las últimas 48-72 horas ha habido lluvia, rocío persistente matinal o nieblas atlánticas continuadas.';
    } else if (datoId === 'anillos_concentricos') {
      orientacion =
        'Observe las manchas marrones con una lupa o de cerca para verificar si presentan anillos concéntricos concéntricos en forma de diana.';
    }

    return {
      id: datoId,
      nombre,
      orientacion,
    };
  });
}
