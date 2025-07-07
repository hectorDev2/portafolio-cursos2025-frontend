import { useState } from "react";
import { Modal } from "./Modal";
import Cookies from "js-cookie";

interface Portfolio {
  id?: string;
  title: string;
  description: string;
  semester: string;
  // Add other fields as needed
}

interface CreatePortfolioModalProps {
  onClose: () => void;
  onCreate: (portfolio: Portfolio) => void;
}

export const CreatePortfolioModal = ({
  onClose,
  onCreate,
}: CreatePortfolioModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [semester, setSemester] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && semester.trim()) {
      const token = Cookies.get("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const res = await fetch("/api/portfolios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: title.trim(),
            description: description.trim(),
            semester: semester.trim(),
          }),
        });

        if (res.ok) {
          const newPortfolio = await res.json();
          onCreate(newPortfolio);
          onClose();
        } else {
          console.error(
            "Failed to create portfolio:",
            res.status,
            res.statusText
          );
          // Handle error, maybe show an alert to the user
        }
      } catch (error) {
        console.error("Error creating portfolio:", error);
        // Handle network error
      }
    }
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Crear Nuevo Portafolio
          </h3>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div>
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Título
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Ej. Portafolio 2025-I"
              autoFocus
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Descripción
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Breve descripción del portafolio"
              rows={3}
            />
          </div>
          <div>
            <label
              htmlFor="semester"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Semestre
            </label>
            <input
              id="semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Ej. 2025-I"
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
            disabled={!title.trim() || !semester.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            Crear Portafolio
          </button>
        </div>
      </form>
    </Modal>
  );
};
