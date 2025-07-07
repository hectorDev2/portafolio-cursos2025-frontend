
import { Feedback } from "../types";

export const FeedbackList = ({ feedback }: any) => {
    return (
      <div className="bg-yellow-50/50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
        <div className="p-6">
          <h3 className="text-xl font-bold text-yellow-900 dark:text-yellow-200">
            Feedback de Evaluadores
          </h3>
        </div>
        <div className="px-6 pb-6">
          <div className="space-y-4">
            {feedback.length > 0 ? (
              feedback.map((item: Feedback) => (
                <div
                  key={item.id}
                  className="border-l-4 border-yellow-400 bg-white dark:bg-gray-800 p-4 rounded-r-lg shadow-sm"
                >
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {item.evaluator}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.role}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.date}
                    </p>
                  </div>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    {item.comment}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No hay feedback para este portafolio.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };
