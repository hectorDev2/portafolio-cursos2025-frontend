
import { BarChart2, FileText, ListChecks } from "lucide-react";
import { Course } from "../types";
import { DocumentRow } from "./DocumentRow";
import { Modal } from "./Modal";

export const CourseDetailModal = ({
    course,
    onClose,
  }: {
    course: Course;
    onClose: () => void;
  }) => {
    return (
      <Modal onClose={onClose}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {course.name}
          </h3>
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
        </div>
      </Modal>
    );
  };
