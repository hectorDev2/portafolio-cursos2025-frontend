
import { Briefcase, FileClock, FileText, BookOpen, Library } from "lucide-react";
import { PersonalDocument, Portfolio } from "./types";

export const personalDocumentsData: PersonalDocument[] = [
    { id: "caratula", name: "Carátula", icon: FileText, action: "Upload" },
    { id: "carga-lectiva", name: "Carga Lectiva", icon: Library, action: "Upload" },
    { id: "filosofia", name: "Filosofía", icon: BookOpen, action: "Upload" },
    { id: "cv", name: "Mi Currículum", icon: Briefcase, action: "Upload" },
    { id: "progress", name: "Avances de Curso", icon: FileClock, action: "View" },
  ];


export const portfoliosData: Portfolio[] = [
  {
    id: "portfolio-2024",
    title: "Portafolio 2024",
    description: "Portafolio para el año 2024",
    semester: "2024-I",
    generalDocuments: [
      { id: "doc-4", type: "Carátula", fileName: "cover_2024.pdf" },
      { id: "doc-5", type: "Carga Lectiva" },
      { id: "doc-6", type: "Filosofía", fileName: "philosophy_2024.pdf" },
    ],
    cursos: [
      {
        id: "unit-3",
        name: "Ingeniería de Software II",
        syllabus: "uploaded",
        progress: "uploaded",
        record: "uploaded",
      },
      {
        id: "unit-4",
        name: "Programación Avanzada",
        syllabus: "uploaded",
        progress: "uploaded",
        record: "missing",
      },
      {
        id: "unit-5",
        name: "Bases de Datos",
        syllabus: "missing",
        progress: "missing",
        record: "missing",
      },
    ],
    feedback: [
      {
        id: "fb-3",
        evaluator: "Dra. Isabel Vargas",
        role: "Coordinadora Académica",
        date: "10 de Junio, 2024",
        comment:
          "El material de Programación Avanzada es muy completo y está bien estructurado. Buen trabajo.",
      },
    ],
  },
  {
    id: "portfolio-2023",
    title: "Portafolio 2023",
    description: "Portafolio para el año 2023",
    semester: "2023-II",
    generalDocuments: [
      { id: "doc-1", type: "Carátula", fileName: "caratula_2023.pdf" },
      {
        id: "doc-2",
        type: "Carga Lectiva",
        fileName: "carga_lectiva_2023.docx",
      },
      { id: "doc-3", type: "Filosofía" },
    ],
    cursos: [
      {
        id: "unit-1",
        name: "Cálculo I",
        syllabus: "uploaded",
        progress: "uploaded",
        record: "missing",
      },
      {
        id: "unit-2",
        name: "Física I",
        syllabus: "uploaded",
        progress: "missing",
        record: "missing",
      },
    ],
    feedback: [
      {
        id: "fb-1",
        evaluator: "Dr. Ana Torres",
        role: "Jefe de Departamento",
        date: "15 de Mayo, 2023",
        comment: "Excelente organización del portafolio.",
      },
    ],
  },
];
