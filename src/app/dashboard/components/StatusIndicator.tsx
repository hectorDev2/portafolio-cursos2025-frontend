import { CheckCircle2, File, XCircle } from "lucide-react";
import { DocumentStatus } from "../types";

export const StatusIndicator = ({
  status,
  text,
}: {
  status: DocumentStatus;
  text: string;
}) => (
  <div
    className={`flex items-center gap-2 text-sm ${status === "uploaded" ? "text-green-600" : "text-gray-500 dark:text-gray-400"}`}
  >
    {status === "uploaded" ? (
      <File className="h-4 w-4" />
    ) : (
      <File className="h-4 w-4" />
    )}
    <span className="hidden sm:inline">{text}</span>
  </div>
);
