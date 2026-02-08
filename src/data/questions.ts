import { Question } from "@/types";

export const questions: Question[] = [
  // ========== STAGE 1: Identificare i Risultati Desiderati ==========
  {
    id: "transfer_objective",
    stage: 1,
    stageTitle: "Identificare i Risultati Desiderati",
    text: "Qual è la singola azione o decisione che i partecipanti devono saper prendere autonomamente dopo 3 mesi dalla fine del corso?",
    explanation:
      "Nel Backward Design, partiamo dalla fine: il comportamento osservabile che dimostra che il corso ha funzionato. Questo è il tuo \"obiettivo di trasferimento\" — la Big Idea del corso.",
    type: "textarea",
    placeholder:
      'Es: "I manager devono saper condurre un colloquio di feedback strutturato con il proprio team senza supporto HR"',
    required: true,
  },
  {
    id: "business_objective",
    stage: 1,
    stageTitle: "Identificare i Risultati Desiderati",
    text: "Quale risultato aziendale specifico deve influenzare o sbloccare questo corso?",
    explanation:
      "Collegare il corso a un obiettivo di business misurabile garantisce che la formazione non sia fine a sé stessa, ma strategica per l'organizzazione.",
    type: "textarea",
    placeholder:
      'Es: "Ridurre il turnover del 15% nei reparti produttivi entro 12 mesi"',
    required: true,
  },
  {
    id: "depth_level",
    stage: 1,
    stageTitle: "Identificare i Risultati Desiderati",
    text: "Quale livello di approfondimento cognitivo è richiesto ai partecipanti?",
    explanation:
      "Usando la Tassonomia di Bloom, calibriamo la profondità del corso. Questo determina se il corso sarà informativo, applicativo o trasformativo.",
    type: "single-choice",
    options: [
      {
        value: "conoscere",
        label: "Conoscere",
        description:
          "I partecipanti devono comprendere concetti e nozioni fondamentali",
      },
      {
        value: "applicare",
        label: "Applicare",
        description:
          "I partecipanti devono saper utilizzare strumenti e procedure in contesti standard",
      },
      {
        value: "risolvere",
        label: "Risolvere Problemi",
        description:
          "I partecipanti devono analizzare situazioni complesse e prendere decisioni autonome",
      },
    ],
    required: true,
  },

  // ========== STAGE 2: Determinare le Prove di Evidenza ==========
  {
    id: "assessment_methods",
    stage: 2,
    stageTitle: "Determinare le Prove di Evidenza",
    text: "Come vuoi verificare che l'apprendimento sia avvenuto? Puoi selezionare più opzioni.",
    explanation:
      "Nel Backward Design, si progetta la valutazione PRIMA del contenuto. Senza sapere come misurerai il successo, rischi di insegnare cose irrilevanti.",
    type: "multi-choice",
    options: [
      {
        value: "quiz",
        label: "Quiz",
        description: "Domande a risposta multipla o aperta per verificare le conoscenze",
      },
      {
        value: "simulazione",
        label: "Simulazione di Scenario",
        description:
          "Role-play o case study dove il partecipante applica le competenze in situazioni realistiche",
      },
      {
        value: "caso",
        label: "Analisi di un Caso",
        description:
          "Studio e discussione di un caso aziendale reale o verosimile",
      },
    ],
    required: true,
  },
  {
    id: "kpi_short",
    stage: 2,
    stageTitle: "Determinare le Prove di Evidenza",
    text: "Quale metrica a BREVE termine (entro 1 mese) indicherà che il corso sta funzionando?",
    explanation:
      "Una metrica a breve termine ti permette di fare un \"reality check\" rapido e, se necessario, correggere il tiro prima che sia troppo tardi.",
    type: "textarea",
    placeholder:
      'Es: "80% dei partecipanti supera il quiz finale con score ≥ 75%", oppure "Ogni manager conduce almeno 2 colloqui di feedback nel primo mese"',
    required: true,
  },
  {
    id: "kpi_long",
    stage: 2,
    stageTitle: "Determinare le Prove di Evidenza",
    text: "Quale metrica a LUNGO termine (3-12 mesi) confermerà l'impatto reale del corso?",
    explanation:
      "La metrica a lungo termine misura il vero ROI della formazione — il cambiamento duraturo nel comportamento o nei risultati aziendali.",
    type: "textarea",
    placeholder:
      'Es: "Riduzione del 20% delle segnalazioni di conflitto nei team coinvolti", oppure "Aumento del 10% nel punteggio di engagement survey"',
    required: true,
  },

  // ========== STAGE 3: Pianificare e Personalizzare l'Esperienza ==========
  {
    id: "learner_profile",
    stage: 3,
    stageTitle: "Pianificare e Personalizzare l'Esperienza",
    text: "Quali ruoli aziendali parteciperanno al corso?",
    explanation:
      "Conoscere il profilo dei learner permette di calibrare linguaggio, esempi e livello di astrazione. Un corso per operai è molto diverso da uno per dirigenti.",
    type: "textarea",
    placeholder:
      'Es: "Team leader di produzione, con 3-10 anni di esperienza, senza formazione manageriale pregressa"',
    required: true,
  },
  {
    id: "resistance",
    stage: 3,
    stageTitle: "Pianificare e Personalizzare l'Esperienza",
    text: "Quali resistenze o obiezioni potrebbero avere i partecipanti verso questo corso?",
    explanation:
      "Anticipare le resistenze permette di progettare \"hook\" motivazionali e affrontare le obiezioni direttamente nel design del corso, anziché scoprirle in aula.",
    type: "textarea",
    placeholder:
      'Es: "Pensano che sia l\'ennesimo corso teorico inutile", "Non hanno tempo", "Credono di sapere già tutto"',
    required: true,
  },
  {
    id: "scenarios",
    stage: 3,
    stageTitle: "Pianificare e Personalizzare l'Esperienza",
    text: "Descrivi 3 situazioni reali, dilemmi o problemi che i partecipanti affrontano nel loro lavoro quotidiano.",
    explanation:
      "Scenari reali sono il cuore dello scenario-based learning. Rendono il corso immediatamente rilevante e applicabile, eliminando la sensazione di \"teoria astratta\".",
    type: "textarea",
    placeholder:
      'Es: "1) Un collaboratore arriva sempre in ritardo e il team leader non sa come affrontarlo. 2) Due membri del team sono in conflitto e la produttività cala. 3) Un nuovo assunto non raggiunge gli standard e il leader deve decidere se prolungare il periodo di prova."',
    required: true,
  },
  {
    id: "excluded_content",
    stage: 3,
    stageTitle: "Pianificare e Personalizzare l'Esperienza",
    text: "Ci sono argomenti correlati che vuoi ESCLUDERE categoricamente dal corso?",
    explanation:
      "Definire i confini è importante quanto definire i contenuti. Evita scope creep e mantiene il corso focalizzato.",
    type: "textarea",
    placeholder:
      'Es: "Non trattare aspetti legali del diritto del lavoro", "Non entrare nel merito delle policy retributive"',
    required: false,
  },
  {
    id: "included_references",
    stage: 3,
    stageTitle: "Pianificare e Personalizzare l'Esperienza",
    text: "Ci sono documenti o policy aziendali da INCLUDERE come materiale di riferimento nella knowledge base del corso?",
    explanation:
      "Integrare documenti ufficiali nella base di conoscenza rende il corso ancorato alla realtà aziendale specifica, non generico. Puoi descriverli e/o caricare i file direttamente.",
    type: "textarea-with-upload",
    placeholder:
      'Es: "Codice Etico aziendale", "Procedura di gestione performance P-HR-012"',
    required: false,
    acceptedFileTypes: ".pdf,.doc,.docx,.txt,.pptx,.xlsx",
  },
  {
    id: "cited_references",
    stage: 3,
    stageTitle: "Pianificare e Personalizzare l'Esperienza",
    text: "Ci sono documenti o policy da CITARE esplicitamente durante la formazione?",
    explanation:
      "Citare fonti ufficiali durante la formazione rafforza l'autorevolezza del contenuto e allinea il corso alle aspettative normative dell'organizzazione. Puoi descriverli e/o caricare i file.",
    type: "textarea-with-upload",
    placeholder:
      'Es: "CCNL di riferimento — Art. 42 sulla formazione obbligatoria", "Policy aziendale sulla sicurezza"',
    required: false,
    acceptedFileTypes: ".pdf,.doc,.docx,.txt,.pptx,.xlsx",
  },
  {
    id: "duration",
    stage: 3,
    stageTitle: "Pianificare e Personalizzare l'Esperienza",
    text: "Qual è la durata massima desiderata per il corso completo?",
    explanation:
      "La durata è un vincolo progettuale critico: determina la profondità possibile e la struttura dei moduli. Meglio un corso breve ed efficace che uno lungo e dispersivo.",
    type: "single-choice",
    options: [
      { value: "2h", label: "2 ore", description: "Modulo singolo, focus su 1 competenza" },
      { value: "4h", label: "4 ore (mezza giornata)", description: "2-3 moduli, mix teoria-pratica" },
      { value: "8h", label: "8 ore (giornata intera)", description: "Percorso completo con esercitazioni" },
      { value: "16h", label: "16 ore (2 giorni)", description: "Percorso approfondito con simulazioni" },
      { value: "custom", label: "Altro", description: "Specifica una durata personalizzata" },
    ],
    required: true,
  },
  {
    id: "duration_custom",
    stage: 3,
    stageTitle: "Pianificare e Personalizzare l'Esperienza",
    text: "Specifica la durata personalizzata del corso.",
    explanation: "Indica la durata totale desiderata in ore o giorni.",
    type: "text",
    placeholder: 'Es: "12 ore distribuite su 3 mezze giornate"',
    required: false,
  },
  {
    id: "tone",
    stage: 3,
    stageTitle: "Pianificare e Personalizzare l'Esperienza",
    text: "Quale tono di voce deve avere il corso?",
    explanation:
      "Il tono di voce influenza l'engagement: un corso sulla sicurezza richiede un tono diverso da uno sulla leadership. Il tono sbagliato può alienare i partecipanti.",
    type: "single-choice",
    options: [
      { value: "formale", label: "Formale", description: "Professionale, istituzionale, autorevole" },
      { value: "motivazionale", label: "Motivazionale", description: "Energico, ispirante, orientato alla crescita" },
      { value: "pratico", label: "Pratico", description: "Diretto, concreto, orientato all'azione" },
      { value: "normativo", label: "Normativo", description: "Preciso, procedurale, basato su regole" },
    ],
    required: true,
  },
  {
    id: "teaching_strategy",
    stage: 3,
    stageTitle: "Pianificare e Personalizzare l'Esperienza",
    text: "Quale strategia didattica vuoi che sia dominante nel corso?",
    explanation:
      "La strategia didattica determina il \"come\" dell'apprendimento. Ogni metodologia ha punti di forza diversi — scegli quella più adatta al tuo contesto e ai tuoi learner.",
    type: "single-choice",
    options: [
      {
        value: "microlearning",
        label: "Microlearning",
        description: "Pillole formative brevi (5-10 min), ideale per contenuti da memorizzare",
      },
      {
        value: "scenario",
        label: "Scenario-Based Learning",
        description: "Apprendimento attraverso simulazioni di situazioni reali",
      },
      {
        value: "problem",
        label: "Problem-Based Learning",
        description: "I partecipanti risolvono problemi reali come veicolo di apprendimento",
      },
      {
        value: "blended",
        label: "Blended Learning",
        description: "Mix di e-learning asincrono e sessioni sincrone (aula o virtual)",
      },
      {
        value: "flipped",
        label: "Flipped Classroom",
        description: "Materiali teorici pre-aula + sessioni pratiche in presenza",
      },
    ],
    required: true,
  },
];

export const stageInfo: Record<number, { title: string; description: string; icon: string }> = {
  1: {
    title: "Risultati Desiderati",
    description: "Definiamo il traguardo: cosa devono saper fare i partecipanti alla fine del corso?",
    icon: "🎯",
  },
  2: {
    title: "Prove di Evidenza",
    description: "Come verificheremo che l'apprendimento è avvenuto davvero?",
    icon: "📋",
  },
  3: {
    title: "Esperienza Formativa",
    description: "Progettiamo il contenuto, calibrato sui partecipanti e sugli obiettivi.",
    icon: "🛠",
  },
};
