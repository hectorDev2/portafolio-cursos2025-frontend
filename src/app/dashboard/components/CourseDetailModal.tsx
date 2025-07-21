/* eslint-disable @typescript-eslint/no-unused-vars */
import { BarChart2, FileText } from "lucide-react";
import { Course } from "../types";
import { DocumentRow } from "./DocumentRow";
import { Modal } from "./Modal";
import { useState, useEffect } from "react";
import { UploadCourseFileModal } from "./UploadCourseFileModal";
import Cookies from "js-cookie";

export const CourseDetailModal = ({
  course,
  onClose,
  onDelete,
  portfolioId,
  onUploadSuccess,
}: {
  course: Course;
  portfolioId: string;
  onClose: () => void;
  onDelete: () => void;
  onUploadSuccess: () => void;
}) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [documentToUpload, setDocumentToUpload] = useState<{
    name: string;
    type: string;
  } | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [showIframe, setShowIframe] = useState(false);
  const [courseData, setCourseData] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = Cookies.get("token");
        const response = await fetch(`/api/cursos/${course.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Error al obtener datos del curso");
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        // Puedes mostrar un mensaje de error aquí si lo deseas
      }
    };
    fetchCourse();
  }, [course.id, onUploadSuccess]);

  const handleOpenUploadModal = (name: string, type: string) => {
    setDocumentToUpload({ name, type });
    setShowUploadModal(true);
  };

  const handleCloseUploadModal = () => {
    setShowUploadModal(false);
    setDocumentToUpload(null);
  };

  const handleViewPdf = async (url: string) => {
    try {
      const response = await fetch(url, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (!response.ok) throw new Error("Error al obtener el PDF");
      const blob = await response.blob();
      setPdfUrl(URL.createObjectURL(blob));
      setShowIframe(true);
    } catch (error) {
      alert("No se pudo cargar el PDF");
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {courseData ? courseData.name : course.name}
          </h3>
          {(courseData ? courseData.code : course.code) && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Código: {courseData ? courseData.code : course.code}
            </p>
          )}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Gestiona los documentos del curso.
        </p>
      </div>
      <div className="p-6 space-y-4">
        <DocumentRow
          name="Sílabo"
          status={courseData?.silabo ? "uploaded" : "missing"}
          icon={<FileText className="h-5 w-5 text-gray-500" />}
          onUpload={() => handleOpenUploadModal("Sílabo", "silabo")}
          onView={
            courseData?.silabo
              ? async () => {
                  try {
                    const response = await fetch(
                      `/api/${courseData.silabo.fileUrl}`,
                      {
                        credentials: "include",
                        headers: {
                          Authorization: `Bearer ${Cookies.get("token")}`,
                        },
                      }
                    );
                    if (!response.ok)
                      throw new Error("Error al obtener el PDF");
                    const blob = await response.blob();
                    const pdfBlobUrl = URL.createObjectURL(blob);
                    window.open(pdfBlobUrl, "_blank");
                  } catch (error) {
                    alert("No se pudo cargar el PDF");
                  }
                }
              : undefined
          }
        />
        <DocumentRow
          name="Avance Curricular"
          status={courseData?.avanceCurso ? "uploaded" : "missing"}
          icon={<BarChart2 className="h-5 w-5 text-gray-500" />}
          onUpload={() =>
            handleOpenUploadModal("Avance Curricular", "avance-curso")
          }
          onView={
            courseData?.avanceCurso
              ? async () => {
                  try {
                    const response = await fetch(
                      `/api/${courseData.avanceCurso.fileUrl}`,
                      {
                        credentials: "include",
                        headers: {
                          Authorization: `Bearer ${Cookies.get("token")}`,
                        },
                      }
                    );
                    if (!response.ok) throw new Error("Archivo no encontrado");
                    const blob = await response.blob();
                    const pdfBlobUrl = URL.createObjectURL(blob);
                    window.open(pdfBlobUrl, "_blank");
                  } catch (error) {
                    alert("No se pudo cargar el PDF");
                  }
                }
              : undefined
          }
        />
      </div>
      <div className="flex justify-end space-x-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-b-xl">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          Cerrar
        </button>
        <button
          type="button"
          onClick={async () => {
            if (confirm("¿Seguro que deseas eliminar este curso?")) {
              try {
                await onDelete();
                onClose();
                alert("Curso eliminado con éxito");
              } catch (error) {
                alert("Error al eliminar el curso");
              }
            }
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          Eliminar Curso
        </button>
      </div>

      {showUploadModal && documentToUpload && (
        <UploadCourseFileModal
          document={documentToUpload}
          onClose={handleCloseUploadModal}
          portfolioId={portfolioId}
          courseId={course.id}
          onUploadSuccess={() => {
            handleCloseUploadModal();
            onUploadSuccess();
          }}
        />
      )}
    </Modal>
  );
};
