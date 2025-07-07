
import { CourseList } from "./CourseList";
import { DocumentCard } from "./DocumentCard";
import { FeedbackList } from "./FeedbackList";

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
  
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.generalDocuments.map((doc: Document) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onUpload={() => onOpenUploadModal(doc)}
            />
          ))}
        </div>
  
        <hr className="border-gray-200 dark:border-gray-700" />
  
        <CourseList
          courses={portfolio.courses}
          onCourseClick={onOpenCourseDetailModal}
          onAddCourse={onAddCourse}
        />
  
        <hr className="border-gray-200 dark:border-gray-700" />
  
        <FeedbackList feedback={portfolio.feedback} />
      </div>
    );
  };
