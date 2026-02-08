"use client";

import { useState, useCallback, useMemo } from "react";
import { questions } from "@/data/questions";
import { CourseBlueprint, Stage } from "@/types";
import { generateBlueprint } from "@/lib/blueprint-generator";
import ProgressBar from "./ProgressBar";
import StageIntro from "./StageIntro";
import QuestionCard from "./QuestionCard";
import BlueprintView from "./BlueprintView";

type WizardPhase = "welcome" | "stage-intro" | "questions" | "complete";

export default function CourseWizard() {
  const [phase, setPhase] = useState<WizardPhase>("welcome");
  const [currentStage, setCurrentStage] = useState<Stage>(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [blueprint, setBlueprint] = useState<CourseBlueprint | null>(null);

  // Filter questions: skip duration_custom if duration is not "custom"
  const activeQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (q.id === "duration_custom") {
        return answers["duration"] === "custom";
      }
      return true;
    });
  }, [answers]);

  const stageQuestions = useMemo(
    () => activeQuestions.filter((q) => q.stage === currentStage),
    [activeQuestions, currentStage]
  );

  const currentQuestion = stageQuestions[currentQuestionIndex];

  const handleAnswer = useCallback(
    (questionId: string, value: string | string[]) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    },
    []
  );

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < stageQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentStage < 3) {
      // Move to next stage
      const nextStage = (currentStage + 1) as Stage;
      setCurrentStage(nextStage);
      setCurrentQuestionIndex(0);
      setPhase("stage-intro");
    } else {
      // All done - generate blueprint
      const bp = generateBlueprint(answers);
      setBlueprint(bp);
      setPhase("complete");
    }
  }, [currentQuestionIndex, stageQuestions.length, currentStage, answers]);

  const handleBack = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (currentStage > 1) {
      const prevStage = (currentStage - 1) as Stage;
      const prevStageQuestions = activeQuestions.filter(
        (q) => q.stage === prevStage
      );
      setCurrentStage(prevStage);
      setCurrentQuestionIndex(prevStageQuestions.length - 1);
    }
  }, [currentQuestionIndex, currentStage, activeQuestions]);

  const handleRestart = useCallback(() => {
    setPhase("welcome");
    setCurrentStage(1);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setBlueprint(null);
  }, []);

  const totalQuestionsInStage = stageQuestions.length;
  const canGoBack = currentQuestionIndex > 0 || currentStage > 1;

  // Determine if current question is the absolute last
  const isLastQuestion =
    currentStage === 3 && currentQuestionIndex === stageQuestions.length - 1;

  // Welcome screen
  if (phase === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center p-6">
        <div className="w-full max-w-2xl animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Sophia
            </h1>
            <p className="text-lg text-gray-500 mb-2">
              Course Design Studio
            </p>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Progettiamo insieme il tuo corso di formazione usando il metodo{" "}
              <strong>Understanding by Design</strong>. Ti guideremo attraverso 3 fasi
              per creare un blueprint completo e pronto per l&apos;implementazione.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                  1
                </span>
                Risultati
              </div>
              <div className="hidden sm:block text-gray-300">→</div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                  2
                </span>
                Valutazione
              </div>
              <div className="hidden sm:block text-gray-300">→</div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                  3
                </span>
                Esperienza
              </div>
            </div>
            <button
              onClick={() => {
                setPhase("stage-intro");
              }}
              className="px-8 py-3.5 bg-indigo-600 text-white rounded-xl font-medium text-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-4 focus:ring-indigo-200"
            >
              Inizia la Progettazione
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Blueprint view
  if (phase === "complete" && blueprint) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-6 pt-12">
        <BlueprintView blueprint={blueprint} onRestart={handleRestart} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col items-center p-6 pt-12">
      <ProgressBar
        currentStage={currentStage}
        currentQuestionInStage={currentQuestionIndex}
        totalQuestionsInStage={totalQuestionsInStage}
        isComplete={phase === "complete"}
      />

      {phase === "stage-intro" && (
        <StageIntro
          stage={currentStage}
          onContinue={() => setPhase("questions")}
        />
      )}

      {phase === "questions" && currentQuestion && (
        <QuestionCard
          key={currentQuestion.id}
          question={currentQuestion}
          currentAnswer={answers[currentQuestion.id]}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={canGoBack}
          isLast={isLastQuestion}
        />
      )}
    </div>
  );
}
