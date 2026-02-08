"use client";

import { CourseBlueprint } from "@/types";

interface BlueprintViewProps {
  blueprint: CourseBlueprint;
  onRestart: () => void;
}

export default function BlueprintView({ blueprint, onRestart }: BlueprintViewProps) {
  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Blueprint generato con successo
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{blueprint.title}</h1>
      </div>

      {/* Blueprint Sections */}
      <div className="space-y-6">
        {/* Section 1: Strategic Alignment */}
        <Section title="Allineamento Strategico" icon="🎯">
          <Field label="Obiettivo di Trasferimento" value={blueprint.transferObjective} />
          <Field label="Obiettivo di Business" value={blueprint.businessObjective} />
          <Field label="Livello di Approfondimento" value={blueprint.depthLevel} />
        </Section>

        {/* Section 2: Assessment */}
        <Section title="Valutazione e Metriche" icon="📋">
          <Field
            label="Modalita di Valutazione"
            value={blueprint.assessmentMethods.join(" + ")}
          />
          <Field label="KPI Breve Termine (1 mese)" value={blueprint.shortTermKPI} />
          <Field label="KPI Lungo Termine (3-12 mesi)" value={blueprint.longTermKPI} />
        </Section>

        {/* Section 3: Learner Profile */}
        <Section title="Profilo Partecipanti" icon="👥">
          <Field label="Ruoli Coinvolti" value={blueprint.learnerProfile} />
          <Field label="Resistenze Attese" value={blueprint.resistanceReasons} />
          <Field label="Scenari Reali" value={blueprint.scenarios} />
        </Section>

        {/* Section 4: Design Specs */}
        <Section title="Specifiche di Progettazione" icon="⚙️">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Durata" value={blueprint.duration} />
            <Field label="Tone of Voice" value={blueprint.toneOfVoice} />
            <Field label="Strategia Didattica" value={blueprint.teachingStrategy} />
            <Field label="Contenuti Esclusi" value={blueprint.excludedContent} />
          </div>
          <Field label="Documenti nella Knowledge Base" value={blueprint.includedReferences} />
          <Field label="Documenti da Citare" value={blueprint.citedReferences} />
        </Section>

        {/* Section 5: Modules */}
        <Section title="Architettura del Corso" icon="🏗️">
          <div className="space-y-4">
            {blueprint.modules.map((module) => (
              <div
                key={module.number}
                className="bg-gray-50 rounded-xl p-5 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">
                    Modulo {module.number}: {module.title}
                  </h4>
                  <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full">
                    {module.duration}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Obiettivo:</strong> {module.objective}
                </p>
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">Attivita:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {module.activities.map((activity, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-indigo-400 mt-0.5">-</span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Valutazione:</strong> {module.assessment}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Actions */}
      <div className="mt-8 flex items-center justify-center gap-4 pb-12">
        <button
          onClick={onRestart}
          className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
        >
          Nuovo Corso
        </button>
        <button
          onClick={() => {
            // Future: export to PDF/JSON
            const dataStr = JSON.stringify(blueprint, null, 2);
            const blob = new Blob([dataStr], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "course-blueprint.json";
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors focus:ring-4 focus:ring-indigo-200"
        >
          Esporta JSON
        </button>
      </div>
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900">
          {icon} {title}
        </h3>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
        {label}
      </dt>
      <dd className="text-sm text-gray-800 whitespace-pre-line">{value}</dd>
    </div>
  );
}
