import { useState } from "react";
import { Modal } from "./Modal";

export const AddCourseModal = ({ onClose, onAddCourse, portfolioId }: any) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddCourse({ name: name.trim(), code: code.trim(), portfolioId }); // Assuming portfolioId is handled elsewhere
    }
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Agregar Nuevo Curso
          </h3>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div>
            <label
              htmlFor="courseName"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Nombre del Curso
            </label>
            <input
              id="courseName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Ej. Cálculo I"
              autoFocus
            />
          </div>
          <div>
            <label
              htmlFor="courseCode"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Código del Curso (Opcional)
            </label>
            <input
              id="courseCode"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Ej. CS101"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-b-xl">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!name.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            Agregar Curso
          </button>
        </div>
      </form>
    </Modal>
  );
};
