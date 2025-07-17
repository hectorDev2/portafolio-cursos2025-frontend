
import { LucideIcon } from "lucide-react";

export type DocumentStatus = "uploaded" | "missing";

export interface Document {
  id: string;
  type: "Carátula" | "Carga Lectiva" | "Filosofía";
  fileName?: string;
}

export interface Course {
  id: string;
  name: string;
  code?: string;
  syllabus: DocumentStatus;
  progress: DocumentStatus;
  record: DocumentStatus;
}

export interface Feedback {
  id: string;
  evaluator: string;
  role: string;
  date: string;
  comment: string;
}

export interface Portfolio {
  id:string;
  title: string;
  description: string;
  semester: string;
  generalDocuments: Document[];
  cursos: Course[];
  feedback: Feedback[];
}

export interface PersonalDocument {
  id: string;
  name: "Mi Currículum" | "Avances de Curso";
  icon: LucideIcon;
  action: "Upload" | "View";
}
