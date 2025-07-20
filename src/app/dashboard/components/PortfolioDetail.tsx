/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Cookies from "js-cookie";
import { CourseList } from "./CourseList";
import { DocumentCard } from "./DocumentCard";
import { FeedbackList } from "./FeedbackList";
import { SectionCard } from "./SectionCard";
import { Plus, Trash2 } from "lucide-react";

export const PortfolioDetail = ({
  portfolio,
  onOpenUploadModal,
  onOpenCourseDetailModal,
  onAddCourse,
  onDeletePortfolio,
}: any) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [showIframe, setShowIframe] = useState(false);

  const handleViewPdf = async (url: string) => {
    try {
      const response = await fetch(url, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (!response.ok) throw new Error("Archivo no encontrado");
      const blob = await response.blob();
      setPdfUrl(URL.createObjectURL(blob));
      setShowIframe(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("No se pudo cargar el PDF");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {portfolio.title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {portfolio.description}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Semestre: {portfolio.semester}
          </p>
        </div>
        <button
          onClick={onDeletePortfolio}
          className="h-8 w-8 rounded-full flex items-center justify-center bg-red-600 text-white transition-transform active:scale-95 hover:bg-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <SectionCard title="Documentos Generales">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {["Filosofía", "Carátula", "Carga Lectiva", "Curriculum"].map(
            (type) => {
              type DocumentType = {
                type: string;
                fileName?: string;
                fileUrl?: string;
                [key: string]: any;
              };
              let doc: DocumentType = { type };
              if (type === "Carátula" && portfolio.Caratula) {
                doc = { type, ...portfolio.Caratula };
              } else if (type === "Filosofía" && portfolio.Filosofia) {
                doc = { type, ...portfolio.Filosofia };
              } else if (type === "Carga Lectiva" && portfolio.CargaLectiva) {
                doc = { type, ...portfolio.CargaLectiva };
              } else if (type === "Curriculum" && portfolio.Curriculum) {
                doc = { type, ...portfolio.Curriculum };
              }
              return (
                <div key={type} className="flex flex-col items-center gap-2">
                  <DocumentCard
                    document={doc}
                    onUpload={() => onOpenUploadModal(doc)}
                  />
                  {(doc.fileName || doc.fileUrl) && (
                    <button
                      className="px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => {
                        const url = `api/${doc.fileUrl}`;
                        handleViewPdf(url);
                      }}
                    >
                      Ver PDF
                    </button>
                  )}
                </div>
              );
            }
          )}
        </div>
        {showIframe && pdfUrl && (
          <div className="mt-6 w-full flex flex-col items-center">
            <iframe
              src={pdfUrl}
              title="PDF"
              width="100%"
              height="600px"
              className="border rounded shadow"
            />
            <button
              className="mt-2 px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                setShowIframe(false);
                setPdfUrl(null);
              }}
            >
              Cerrar PDF
            </button>
          </div>
        )}
      </SectionCard>

      <SectionCard
        title="Cursos"
        actionButton={
          <button
            className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-600 text-white transition-transform active:scale-95 hover:bg-blue-700"
            onClick={onAddCourse}
          >
            <Plus className="h-4 w-4" />
          </button>
        }
      >
        <CourseList
          courses={portfolio.cursos}
          onCourseClick={onOpenCourseDetailModal}
        />
      </SectionCard>

      <SectionCard title="Feedback de Evaluadores">
        <FeedbackList feedback={portfolio.feedback} />
      </SectionCard>
    </div>
  );
};
