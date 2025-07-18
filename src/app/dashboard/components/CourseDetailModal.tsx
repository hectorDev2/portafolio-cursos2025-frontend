import { BarChart2, FileText, ListChecks } from "lucide-react";
import { Course } from "../types";
import { DocumentRow } from "./DocumentRow";
import { Modal } from "./Modal";

export const CourseDetailModal = ({
  course,
  onClose,
  onDelete,
}: {
  course: Course;
  portfolioId: string;
  onClose: () => void;
  onDelete: () => void;
}) => {
  return (
    <Modal onClose={onClose}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {course.name}
          </h3>
          {course.code && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Código: {course.code}
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
          status={course.syllabus}
          icon={<FileText className="h-5 w-5 text-gray-500" />}
        />
        <DocumentRow
          name="Avance Programático"
          status={course.progress}
          icon={<BarChart2 className="h-5 w-5 text-gray-500" />}
        />
        <DocumentRow
          name="Registro de Notas"
          status={course.record}
          icon={<ListChecks className="h-5 w-5 text-gray-500" />}
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
                // Aquí podrías llamar una función para refrescar la lista de cursos si la tienes
                alert("Curso eliminado con éxito");
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    </Modal>
  );
};
