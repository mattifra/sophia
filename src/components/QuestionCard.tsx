"use client";

import { useState } from "react";
import { Question } from "@/types";

interface QuestionCardProps {
  question: Question;
  currentAnswer: string | string[] | undefined;
  onAnswer: (questionId: string, value: string | string[]) => void;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
  isLast: boolean;
}

export default function QuestionCard({
  question,
  currentAnswer,
  onAnswer,
  onNext,
  onBack,
  canGoBack,
  isLast,
}: QuestionCardProps) {
  const [textValue, setTextValue] = useState<string>(
    typeof currentAnswer === "string" ? currentAnswer : ""
  );

  const handleTextChange = (value: string) => {
    setTextValue(value);
    onAnswer(question.id, value);
  };

  const handleSingleChoice = (value: string) => {
    onAnswer(question.id, value);
  };

  const handleMultiChoice = (value: string) => {
    const current = Array.isArray(currentAnswer) ? currentAnswer : [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onAnswer(question.id, updated);
  };

  const isValid = () => {
    if (!question.required) return true;
    if (question.type === "multi-choice") {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0;
    }
    if (question.type === "single-choice") {
      return typeof currentAnswer === "string" && currentAnswer.length > 0;
    }
    return typeof currentAnswer === "string" && currentAnswer.trim().length > 0;
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Explanation banner */}
        <div className="bg-indigo-50 border-b border-indigo-100 px-6 py-4">
          <p className="text-sm text-indigo-700 leading-relaxed">
            {question.explanation}
          </p>
        </div>

        {/* Question */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {question.text}
          </h3>

          {/* Text input */}
          {question.type === "text" && (
            <input
              type="text"
              value={textValue}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder={question.placeholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder:text-gray-400 transition-colors"
            />
          )}

          {/* Textarea */}
          {question.type === "textarea" && (
            <textarea
              value={textValue}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder={question.placeholder}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder:text-gray-400 resize-none transition-colors"
            />
          )}

          {/* Single choice */}
          {question.type === "single-choice" && question.options && (
            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSingleChoice(option.value)}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all ${
                    currentAnswer === option.value
                      ? "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="font-medium text-gray-900">
                    {option.label}
                  </div>
                  {option.description && (
                    <div className="text-sm text-gray-500 mt-1">
                      {option.description}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Multi choice */}
          {question.type === "multi-choice" && question.options && (
            <div className="space-y-3">
              {question.options.map((option) => {
                const selected =
                  Array.isArray(currentAnswer) &&
                  currentAnswer.includes(option.value);
                return (
                  <button
                    key={option.value}
                    onClick={() => handleMultiChoice(option.value)}
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all ${
                      selected
                        ? "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          selected
                            ? "bg-indigo-500 border-indigo-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selected && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {option.label}
                        </div>
                        {option.description && (
                          <div className="text-sm text-gray-500 mt-1">
                            {option.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
              <p className="text-xs text-gray-400 mt-2">
                Puoi selezionare più opzioni
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={onBack}
            disabled={!canGoBack}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              canGoBack
                ? "text-gray-700 hover:bg-gray-200"
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            Indietro
          </button>
          <div className="flex items-center gap-2">
            {!question.required && (
              <button
                onClick={onNext}
                className="px-5 py-2.5 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
              >
                Salta
              </button>
            )}
            <button
              onClick={onNext}
              disabled={!isValid()}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isValid()
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isLast ? "Genera Blueprint" : "Avanti"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
