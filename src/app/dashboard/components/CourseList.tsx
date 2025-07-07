
import { Course } from "../types";
import { Plus } from "lucide-react";
import { StatusIndicator } from "./StatusIndicator";

export const CourseList = ({ courses, onCourseClick, onAddCourse }: any) => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
        <div className="p-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Cursos
          </h3>
          <button
            className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-600 text-white transition-transform active:scale-95 hover:bg-blue-700"
            onClick={onAddCourse}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="px-6 pb-6">
          <div className="space-y-4">
            {courses.length > 0 ? (
              courses.map((course: Course) => (
                <button
                  key={course.id}
                  onClick={() => onCourseClick(course)}
                  className="flex w-full flex-col gap-2 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {course.name}
                  </p>
                  <div className="flex items-center gap-4">
                    <StatusIndicator status={course.syllabus} text="Sílabo" />
                    <StatusIndicator status={course.progress} text="Avance" />
                    <StatusIndicator status={course.record} text="Registro" />
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
