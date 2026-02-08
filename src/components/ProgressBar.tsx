"use client";

import { stageInfo } from "@/data/questions";

interface ProgressBarProps {
  currentStage: number;
  currentQuestionInStage: number;
  totalQuestionsInStage: number;
  isComplete: boolean;
}

export default function ProgressBar({
  currentStage,
  currentQuestionInStage,
  totalQuestionsInStage,
  isComplete,
}: ProgressBarProps) {
  const stages = [1, 2, 3];

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-4">
        {stages.map((stage) => {
          const info = stageInfo[stage];
          const isActive = stage === currentStage && !isComplete;
          const isDone = stage < currentStage || isComplete;

          return (
            <div key={stage} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  isDone
                    ? "bg-emerald-500 text-white"
                    : isActive
                    ? "bg-indigo-600 text-white ring-4 ring-indigo-200"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {isDone ? "✓" : stage}
              </div>
              <span
                className={`mt-2 text-xs font-medium text-center ${
                  isActive
                    ? "text-indigo-600"
                    : isDone
                    ? "text-emerald-600"
                    : "text-gray-400"
                }`}
              >
                {info.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress bar within current stage */}
      {!isComplete && (
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${((currentStage - 1) / 3) * 100 + (currentQuestionInStage / totalQuestionsInStage) * (100 / 3)}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}
