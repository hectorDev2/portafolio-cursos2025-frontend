import { Course } from "../types";
import { StatusIndicator } from "./StatusIndicator";

interface CourseListProps {
  courses: Course[];
  onCourseClick: (course: Course) => void;
}

import { useEffect, useState } from "react";

export const CourseList = ({ courses, onCourseClick }: CourseListProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent rendering on server to avoid hydration mismatch
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Cursos
        </h3>
      </div>
      <div className="px-6 pb-6">
        <div className="space-y-4">
          {courses?.length > 0 ? (
            courses?.map((course: Course) => (
              <button
                key={course.id}
                onClick={() => onCourseClick(course)}
                className="flex w-full flex-col gap-2 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {course.name}
                  </p>
                  {course.code && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {course.code}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <StatusIndicator
                    status={course?.silabo?.fileUrl ? "uploaded" : "missing"}
                    text="Sílabo"
                  />
                  <StatusIndicator
                    status={
                      course?.avanceCurso?.fileUrl ? "uploaded" : "missing"
                    }
                    text="Avance"
                  />
                  <StatusIndicator
                    status={
                      course?.avanceCurso?.fileUrl ? "uploaded" : "missing"
                    }
                    text="Registro entrega de Sílabo"
                  />
                </div>
              </button>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-4">
              No hay cursos en este portafolio.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
