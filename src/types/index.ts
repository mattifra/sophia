export type QuestionType = "text" | "textarea" | "single-choice" | "multi-choice" | "textarea-with-upload";

export type Stage = 1 | 2 | 3;

export interface QuestionOption {
  value: string;
  label: string;
  description?: string;
}

export interface Question {
  id: string;
  stage: Stage;
  stageTitle: string;
  text: string;
  explanation: string;
  type: QuestionType;
  options?: QuestionOption[];
  placeholder?: string;
  required: boolean;
  acceptedFileTypes?: string;
}

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  content: string; // base64 or extracted text
}

export interface Answer {
  questionId: string;
  value: string | string[];
}

export interface CourseBlueprint {
  title: string;
  transferObjective: string;
  businessObjective: string;
  depthLevel: string;
  assessmentMethods: string[];
  shortTermKPI: string;
  longTermKPI: string;
  learnerProfile: string;
  resistanceReasons: string;
  scenarios: string;
  excludedContent: string;
  includedReferences: string;
  citedReferences: string;
  duration: string;
  toneOfVoice: string;
  teachingStrategy: string;
  modules: CourseModule[];
  uploadedDocuments?: { questionId: string; files: UploadedFile[] }[];
}

export interface CourseModule {
  number: number;
  title: string;
  objective: string;
  duration: string;
  activities: string[];
  assessment: string;
}

export interface AIGeneratedContent {
  title: string;
  modules: AIModule[];
}

export interface AIModule {
  number: number;
  title: string;
  objective: string;
  duration: string;
  content: string;
  activities: string[];
  assessment: string;
  speakerNotes: string;
}
