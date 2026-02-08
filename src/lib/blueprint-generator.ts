import { Answer, CourseBlueprint, CourseModule } from "@/types";
import { questions } from "@/data/questions";

function getAnswer(answers: Record<string, string | string[]>, id: string): string {
  const val = answers[id];
  if (Array.isArray(val)) return val.join(", ");
  return val || "";
}

function getAnswerArray(answers: Record<string, string | string[]>, id: string): string[] {
  const val = answers[id];
  if (Array.isArray(val)) return val;
  if (typeof val === "string") return [val];
  return [];
}

function getLabelForValue(questionId: string, value: string): string {
  const question = questions.find((q) => q.id === questionId);
  if (!question?.options) return value;
  const option = question.options.find((o) => o.value === value);
  return option?.label || value;
}

function generateTitle(answers: Record<string, string | string[]>): string {
  const transfer = getAnswer(answers, "transfer_objective");
  // Extract key action from transfer objective
  const words = transfer.split(" ").slice(0, 8).join(" ");
  return `Corso: ${words}${transfer.split(" ").length > 8 ? "..." : ""}`;
}

function generateModules(answers: Record<string, string | string[]>): CourseModule[] {
  const depth = getAnswer(answers, "depth_level");
  const duration = getAnswer(answers, "duration") === "custom"
    ? getAnswer(answers, "duration_custom")
    : getAnswer(answers, "duration");
  const strategy = getAnswer(answers, "teaching_strategy");
  const assessments = getAnswerArray(answers, "assessment_methods");
  const transfer = getAnswer(answers, "transfer_objective");
  const scenarios = getAnswer(answers, "scenarios");

  const modules: CourseModule[] = [];

  // Module 1: Always present - Foundation/Context
  modules.push({
    number: 1,
    title: "Contesto e Obiettivi",
    objective: "Comprendere il perché del corso e gli obiettivi attesi",
    duration: getDurationForModule(duration, 1, depth),
    activities: [
      "Presentazione degli obiettivi e del percorso (W - Where)",
      "Ice-breaker o attività di aggancio (H - Hook)",
      "Auto-assessment iniziale delle competenze",
    ],
    assessment: "Check-in iniziale: autovalutazione competenze",
  });

  // Module 2: Core Knowledge
  modules.push({
    number: 2,
    title: "Concetti Chiave e Framework",
    objective: "Acquisire le conoscenze fondamentali necessarie per operare",
    duration: getDurationForModule(duration, 2, depth),
    activities: getActivitiesForStrategy(strategy, "knowledge"),
    assessment: assessments.includes("quiz")
      ? "Quiz di verifica conoscenze"
      : "Discussione guidata di verifica",
  });

  // Module 3: Application (if depth >= applicare)
  if (depth === "applicare" || depth === "risolvere") {
    modules.push({
      number: 3,
      title: "Applicazione Pratica",
      objective: "Applicare le conoscenze in contesti guidati",
      duration: getDurationForModule(duration, 3, depth),
      activities: getActivitiesForStrategy(strategy, "application"),
      assessment: assessments.includes("simulazione")
        ? "Simulazione di scenario con feedback"
        : "Esercitazione pratica con valutazione peer",
    });
  }

  // Module 4: Problem Solving (if depth === risolvere)
  if (depth === "risolvere") {
    modules.push({
      number: modules.length + 1,
      title: "Scenari Complessi e Problem Solving",
      objective: "Analizzare situazioni complesse e prendere decisioni autonome",
      duration: getDurationForModule(duration, 4, depth),
      activities: [
        "Analisi degli scenari reali forniti dall'azienda",
        "Lavoro in sottogruppi su casi complessi",
        "Presentazione e discussione delle soluzioni proposte",
        "Debriefing e lessons learned",
      ],
      assessment: assessments.includes("caso")
        ? "Analisi e presentazione di un caso reale"
        : "Valutazione della qualità delle soluzioni proposte",
    });
  }

  // Final Module: Wrap-up & Action Plan
  modules.push({
    number: modules.length + 1,
    title: "Piano d'Azione Personale",
    objective: "Tradurre l'apprendimento in azioni concrete post-corso",
    duration: getDurationForModule(duration, 5, depth),
    activities: [
      "Riflessione guidata sull'apprendimento (R - Rethink)",
      "Stesura del piano d'azione individuale",
      "Condivisione impegni con il gruppo",
      "Post-assessment e confronto con autovalutazione iniziale (E - Evaluate)",
    ],
    assessment: "Piano d'azione individuale con obiettivi SMART",
  });

  return modules;
}

function getDurationForModule(
  totalDuration: string,
  moduleIndex: number,
  depth: string
): string {
  // Simple heuristic based on total duration
  const hours = parseDurationToHours(totalDuration);
  const totalModules =
    depth === "risolvere" ? 5 : depth === "applicare" ? 4 : 3;

  // Distribute time: intro gets less, core gets more
  const weights: Record<number, number> = {
    1: 0.15, // Intro
    2: 0.3, // Core knowledge
    3: 0.25, // Application
    4: 0.2, // Problem solving
    5: 0.1, // Wrap-up
  };

  const moduleHours = Math.max(0.25, hours * (weights[moduleIndex] || 0.2));

  if (moduleHours < 1) return `${Math.round(moduleHours * 60)} min`;
  if (moduleHours === Math.floor(moduleHours)) return `${moduleHours}h`;
  return `${moduleHours.toFixed(1)}h`;
}

function parseDurationToHours(duration: string): number {
  if (duration === "2h") return 2;
  if (duration === "4h") return 4;
  if (duration === "8h") return 8;
  if (duration === "16h") return 16;
  // Try to extract number from custom string
  const match = duration.match(/(\d+)/);
  return match ? parseInt(match[1]) : 8;
}

function getActivitiesForStrategy(
  strategy: string,
  phase: "knowledge" | "application"
): string[] {
  const activities: Record<string, Record<string, string[]>> = {
    microlearning: {
      knowledge: [
        "Video-pillola (5-7 min) sul concetto chiave",
        "Infografica di sintesi",
        "Mini-quiz di consolidamento",
      ],
      application: [
        "Micro-esercizio applicativo (10 min)",
        "Flashcard interattive per il ripasso",
        "Challenge pratica a tempo",
      ],
    },
    scenario: {
      knowledge: [
        "Presentazione del framework tramite scenario reale",
        "Analisi guidata di un caso esemplificativo",
        "Discussione: \"Cosa avresti fatto tu?\"",
      ],
      application: [
        "Role-play su scenario aziendale reale",
        "Simulazione con feedback strutturato",
        "Debriefing e identificazione best practice",
      ],
    },
    problem: {
      knowledge: [
        "Presentazione di un problema reale come punto di partenza",
        "Ricerca guidata delle informazioni necessarie",
        "Costruzione collaborativa del framework risolutivo",
      ],
      application: [
        "Lavoro in team su problema reale dell'azienda",
        "Prototipazione della soluzione",
        "Presentazione e peer-review delle soluzioni",
      ],
    },
    blended: {
      knowledge: [
        "Modulo e-learning asincrono (pre-work)",
        "Discussione sincrona sui concetti chiave",
        "Q&A e chiarimenti in sessione live",
      ],
      application: [
        "Esercitazione guidata in sessione sincrona",
        "Attività pratica individuale (asincrona)",
        "Sessione di follow-up con condivisione risultati",
      ],
    },
    flipped: {
      knowledge: [
        "Materiale di studio pre-aula (video, letture, podcast)",
        "Quiz di verifica pre-sessione",
        "Discussione in aula sulle domande emerse",
      ],
      application: [
        "Workshop pratico in aula",
        "Esercitazione hands-on con supporto del facilitatore",
        "Feedback immediato e coaching on-the-spot",
      ],
    },
  };

  return activities[strategy]?.[phase] || activities.scenario[phase];
}

export function generateBlueprint(
  answers: Record<string, string | string[]>
): CourseBlueprint {
  const duration =
    getAnswer(answers, "duration") === "custom"
      ? getAnswer(answers, "duration_custom") || "Da definire"
      : getLabelForValue("duration", getAnswer(answers, "duration"));

  return {
    title: generateTitle(answers),
    transferObjective: getAnswer(answers, "transfer_objective"),
    businessObjective: getAnswer(answers, "business_objective"),
    depthLevel: getLabelForValue("depth_level", getAnswer(answers, "depth_level")),
    assessmentMethods: getAnswerArray(answers, "assessment_methods").map((v) =>
      getLabelForValue("assessment_methods", v)
    ),
    shortTermKPI: getAnswer(answers, "kpi_short"),
    longTermKPI: getAnswer(answers, "kpi_long"),
    learnerProfile: getAnswer(answers, "learner_profile"),
    resistanceReasons: getAnswer(answers, "resistance"),
    scenarios: getAnswer(answers, "scenarios"),
    excludedContent: getAnswer(answers, "excluded_content") || "Nessuna esclusione specificata",
    includedReferences: getAnswer(answers, "included_references") || "Nessun documento specificato",
    citedReferences: getAnswer(answers, "cited_references") || "Nessun documento specificato",
    duration,
    toneOfVoice: getLabelForValue("tone", getAnswer(answers, "tone")),
    teachingStrategy: getLabelForValue("teaching_strategy", getAnswer(answers, "teaching_strategy")),
    modules: generateModules(answers),
  };
}
