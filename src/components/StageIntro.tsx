"use client";

import { stageInfo } from "@/data/questions";

interface StageIntroProps {
  stage: number;
  onContinue: () => void;
}

export default function StageIntro({ stage, onContinue }: StageIntroProps) {
  const info = stageInfo[stage];

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <div className="text-5xl mb-4">{info.icon}</div>
        <div className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">
          Stage {stage} di 3
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{info.title}</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">{info.description}</p>
        <button
          onClick={onContinue}
          className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-4 focus:ring-indigo-200"
        >
          Iniziamo
        </button>
      </div>
    </div>
  );
}
