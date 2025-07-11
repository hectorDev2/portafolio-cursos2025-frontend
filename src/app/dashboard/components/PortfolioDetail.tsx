import { CourseList } from "./CourseList";
import { DocumentCard } from "./DocumentCard";
import { FeedbackList } from "./FeedbackList";
import { SectionCard } from "./SectionCard";
import { Plus } from "lucide-react";

export const PortfolioDetail = ({
  portfolio,
  onOpenUploadModal,
  onOpenCourseDetailModal,
  onAddCourse,
}: any) => {
  return (
    <div className="space-y-8">
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

      <SectionCard title="Documentos Generales">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(portfolio?.generalDocuments ?? []).map((doc: Document) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onUpload={() => onOpenUploadModal(doc)}
            />
          ))}
        </div>
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
          courses={portfolio.courses}
          onCourseClick={onOpenCourseDetailModal}
        />
      </SectionCard>

      <SectionCard title="Feedback de Evaluadores">
        <FeedbackList feedback={portfolio.feedback} />
      </SectionCard>
    </div>
  );
};
