import {
  Briefcase,
  FileClock,
  FileText,
  BookOpen,
  Library,
} from "lucide-react";
import { PersonalDocument } from "./types";

export const personalDocumentsData: PersonalDocument[] = [
  { id: "caratula", name: "Carátula", icon: FileText, action: "Upload" },
  {
    id: "carga-lectiva",
    name: "Carga Lectiva",
    icon: Library,
    action: "Upload",
  },
  { id: "filosofia", name: "Filosofía", icon: BookOpen, action: "Upload" },
  { id: "cv", name: "Mi Currículum", icon: Briefcase, action: "Upload" },
  { id: "progress", name: "Avances de Curso", icon: FileClock, action: "View" },
];
