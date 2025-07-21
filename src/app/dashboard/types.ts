import { LucideIcon } from "lucide-react";

export type DocumentStatus = "uploaded" | "missing";

export interface Document {
  id: string;
  type: "caratula" | "cargalectiva" | "filosofia" | "curriculum";
  fileName?: string;
  name?: string;
  fileUrl?: string;
}

export interface Course {
  id: string;
  name: string;
  code?: string;
  silabo: Document;
  avanceCurso: Document;
}

export interface Feedback {
  id: string;
  evaluator: string;
  role: string;
  date: string;
  comment: string;
}

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  semester: string;
  cursos: Course[];
  feedback: Feedback[];
}

export interface PersonalDocument {
  id: string;
  name:
    | "Mi Currículum"
    | "Avances de Curso"
    | "Carátula"
    | "Carga Lectiva"
    | "Filosofía";
  icon: LucideIcon;
  action: "Upload" | "View";
}
