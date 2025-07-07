"use client";

import React, { useState, useMemo } from "react";
import { portfoliosData } from "./data";
import { Course, Document, PersonalDocument, Portfolio } from "./types";
import { Header } from "./components/Header";
import { PortfolioList } from "./components/PortfolioList";
import { PersonalDocuments } from "./components/PersonalDocuments";
import { PortfolioDetail } from "./components/PortfolioDetail";
import { CreatePortfolioModal } from "./components/CreatePortfolioModal";
import { UploadFileModal } from "./components/UploadFileModal";
import { CourseDetailModal } from "./components/CourseDetailModal";
import { AddCourseModal } from "./components/AddCourseModal";

// ===================================================================================
// COMPONENTE PRINCIPAL
// ===================================================================================

export default function DashboardPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>(portfoliosData);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(
    portfoliosData[0]?.id || null
  );

  const [modals, setModals] = useState({
    createPortfolio: false,
    uploadFile: null as Document | PersonalDocument | null,
    courseDetail: null as Course | null,
    addCourse: false,
  });

  const selectedPortfolio = useMemo(() => {
    return portfolios.find((p) => p.id === selectedPortfolioId) || null;
  }, [selectedPortfolioId, portfolios]);

  const handleCreatePortfolio = ({
    title,
    description,
    semester,
  }: {
    title: string;
    description: string;
    semester: string;
  }) => {
    const newPortfolio: Portfolio = {
      id: `portfolio-${Date.now()}`,
      title,
      description,
      semester,
      generalDocuments: [
        { id: `doc-${Date.now()}-1`, type: "Carátula" },
        { id: `doc-${Date.now()}-2`, type: "Carga Lectiva" },
        { id: `doc-${Date.now()}-3`, type: "Filosofía" },
      ],
      courses: [],
      feedback: [],
    };
    setPortfolios((prev) => [newPortfolio, ...prev]);
    setSelectedPortfolioId(newPortfolio.id);
    closeModal("createPortfolio");
  };

  const handleAddCourse = ({ name }: { name: string }) => {
    if (!selectedPortfolioId) return;

    const newCourse: Course = {
      id: `course-${Date.now()}`,
      name,
      syllabus: "missing",
      progress: "missing",
      record: "missing",
    };

    setPortfolios((prevPortfolios) =>
      prevPortfolios.map((portfolio) =>
        portfolio.id === selectedPortfolioId
          ? { ...portfolio, courses: [...portfolio.courses, newCourse] }
          : portfolio
      )
    );
    closeModal("addCourse");
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

  return (
    <div className="flex h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="flex-1 overflow-hidden">
        <div className="grid h-full md:grid-cols-[30%_70%] xl:grid-cols-[25%_75%]">
          <aside className="hidden h-full flex-col gap-8 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 md:flex">
            <PortfolioList
              portfolios={portfolios}
              selectedPortfolioId={selectedPortfolioId}
              onSelectPortfolio={setSelectedPortfolioId}
              onOpenCreateModal={() => openModal("createPortfolio")}
            />
            <PersonalDocuments
              onUpload={(doc) => openModal("uploadFile", doc)}
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

      {modals.uploadFile && (
        <UploadFileModal
          document={modals.uploadFile}
          onClose={() => closeModal("uploadFile")}
        />
      )}

      {modals.courseDetail && (
        <CourseDetailModal
          course={modals.courseDetail}
          onClose={() => closeModal("courseDetail")}
        />
      )}

      {modals.addCourse && (
        <AddCourseModal
          onClose={() => closeModal("addCourse")}
          onAddCourse={handleAddCourse}
        />
      )}
    </div>
  );
}
