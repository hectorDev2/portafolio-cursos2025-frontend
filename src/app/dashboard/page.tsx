"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { Course, Document, PersonalDocument, Portfolio } from "./types";
import { Header } from "./components/Header";
import { PortfolioList } from "./components/PortfolioList";
import { PortfolioDetail } from "./components/PortfolioDetail";
import { CreatePortfolioModal } from "./components/CreatePortfolioModal";
import { UploadFileModal } from "./components/UploadFileModal";
import { CourseDetailModal } from "./components/CourseDetailModal";
import { AddCourseModal } from "./components/AddCourseModal";

// ===================================================================================
// COMPONENTE PRINCIPAL
// ===================================================================================

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/auth");
    } else {
      // Para mayor seguridad, aquí podrías agregar una verificación
      // del token contra un endpoint de tu API.
      // ej: fetch('/api/auth/verify').then(...)
      setIsAuthenticated(true);
    }
  }, [router]);

  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(
    null
  );

  const fetchPortfolios = async () => {
    const token = Cookies.get("token");
    try {
      const response = await fetch("/api/portfolios", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener los portafolios");
      }
      const data = await response.json();
      setPortfolios(data);
      if (data.length > 0) {
        setSelectedPortfolioId(data[0].id);
      }
    } catch (error) {
      console.error(error);
      // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario.
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPortfolios();
    }
  }, [isAuthenticated]);

  const refreshPortfolios = () => {
    fetchPortfolios();
  };

  const [modals, setModals] = useState({
    createPortfolio: false,
    uploadFile: null as Document | PersonalDocument | null,
    courseDetail: null as Course | null,
    addCourse: false,
  });

  const selectedPortfolio = useMemo(() => {
    return portfolios.find((p) => p.id === selectedPortfolioId) || null;
  }, [selectedPortfolioId, portfolios]);

  const handleCreatePortfolio = async ({
    title,
    description,
    semester,
  }: {
    title: string;
    description: string;
    semester: string;
  }) => {
    const token = Cookies.get("token");
    try {
      const response = await fetch("/api/portfolios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, semester }),
      });
      if (!response.ok) throw new Error("Error al crear el portafolio");
      const newPortfolio: Portfolio = await response.json();
      setPortfolios((prev) => [newPortfolio, ...prev]);
      setSelectedPortfolioId(newPortfolio.id);
      closeModal("createPortfolio");
    } catch (error) {
      console.error(error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const handleAddCourse = async ({
    name,
    code,
    portfolioId,
  }: {
    name: string;
    code?: string;
    portfolioId: string;
  }) => {
    if (!portfolioId) return;
    const token = Cookies.get("token");
    try {
      const response = await fetch(`/api/cursos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          code,
          portfolioId: selectedPortfolioId,
        }),
      });
      if (!response.ok) throw new Error("Error al agregar el curso");
      const newCourse: Course = await response.json();
      console.log("🚀 ~ handleAddCourse ~ newCourse:", newCourse);

      setPortfolios((prevPortfolios) =>
        prevPortfolios.map((portfolio) =>
          portfolio.id === selectedPortfolioId
            ? { ...portfolio, cursos: [...(portfolio.cursos || []), newCourse] }
            : portfolio
        )
      );
      closeModal("addCourse");
    } catch (error) {
      console.error(error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const handleDeletePortfolio = async () => {
    if (!selectedPortfolioId) return;

    if (
      window.confirm("¿Estás seguro de que quieres eliminar este portafolio?")
    ) {
      const token = Cookies.get("token");
      try {
        const response = await fetch(`/api/portfolios/${selectedPortfolioId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al eliminar el portafolio");

        setPortfolios((prev) =>
          prev.filter((p) => p.id !== selectedPortfolioId)
        );
        setSelectedPortfolioId(null);
      } catch (error) {
        console.error(error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!selectedPortfolioId) return;
    const token = Cookies.get("token");
    try {
      const response = await fetch(`/api/cursos/${courseId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Error al eliminar el curso");
      setPortfolios((prevPortfolios) =>
        prevPortfolios.map((portfolio) =>
          portfolio.id === selectedPortfolioId
            ? {
                ...portfolio,
                cursos: portfolio.cursos?.filter(
                  (course) => course.id !== courseId
                ),
              }
            : portfolio
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (
    modalName: keyof typeof modals,
    data: boolean | Document | PersonalDocument | Course = true
  ) => {
    setModals((prev) => ({ ...prev, [modalName]: data }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: null }));
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">Verificando...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="flex-1 overflow-hidden">
        <div className="grid h-full md:grid-cols-[30%_70%] xl:grid-cols-[25%_75%]">
          <aside className="hidden h-full flex-col gap-8 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 md:flex">
            <PortfolioList
              portfolios={portfolios}
              selectedPortfolioId={selectedPortfolioId}
              onSelectPortfolio={(id) => setSelectedPortfolioId(id?.toString())}
              onOpenCreateModal={() => openModal("createPortfolio")}
            />
          </aside>
          <section className="h-full overflow-y-auto p-4 md:p-8">
            {selectedPortfolio ? (
              <PortfolioDetail
                portfolio={selectedPortfolio}
                onOpenUploadModal={(doc: Document) =>
                  openModal("uploadFile", doc)
                }
                onOpenCourseDetailModal={(course: Course) =>
                  openModal("courseDetail", course)
                }
                onAddCourse={() => openModal("addCourse")}
                onDeletePortfolio={handleDeletePortfolio}
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Seleccione un portafolio para ver los detalles.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      {modals.createPortfolio && (
        <CreatePortfolioModal
          onClose={() => closeModal("createPortfolio")}
          onCreate={handleCreatePortfolio}
        />
      )}

      {modals.uploadFile && selectedPortfolioId && (
        <UploadFileModal
          document={modals.uploadFile}
          onClose={() => closeModal("uploadFile")}
          portfolioId={selectedPortfolioId}
          onUploadSuccess={refreshPortfolios}
        />
      )}

      {modals.courseDetail && (
        <CourseDetailModal
          onDelete={() => handleDeleteCourse(modals.courseDetail!.id)}
          portfolioId={selectedPortfolioId!}
          course={modals.courseDetail}
          onClose={() => closeModal("courseDetail")}
          onUploadSuccess={refreshPortfolios}
        />
      )}

      {modals.addCourse && (
        <AddCourseModal
          onClose={() => closeModal("addCourse")}
          onAddCourse={handleAddCourse}
          portfolioId={selectedPortfolioId!}
        />
      )}
    </div>
  );
}
