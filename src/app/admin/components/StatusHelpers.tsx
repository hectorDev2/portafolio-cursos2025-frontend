import React from "react";
import {
  CheckCircle,
  UserX,
  Clock,
  AlertCircle,
  Eye,
  Calendar,
  Award,
} from "lucide-react";

export const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900";
    case "teacher":
      return "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900";
    case "evaluator":
      return "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900";
    default:
      return "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900";
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "text-green-600 dark:text-green-400";
    case "inactive":
      return "text-red-600 dark:text-red-400";
    case "pending":
      return "text-orange-600 dark:text-orange-400";
    case "complete":
      return "text-green-600 dark:text-green-400";
    case "incomplete":
      return "text-orange-600 dark:text-orange-400";
    case "review":
      return "text-blue-600 dark:text-blue-400";
    case "upcoming":
      return "text-blue-600 dark:text-blue-400";
    case "completed":
      return "text-gray-600 dark:text-gray-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return <CheckCircle className="w-4 h-4" />;
    case "inactive":
      return <UserX className="w-4 h-4" />;
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "complete":
      return <CheckCircle className="w-4 h-4" />;
    case "incomplete":
      return <AlertCircle className="w-4 h-4" />;
    case "review":
      return <Eye className="w-4 h-4" />;
    case "upcoming":
      return <Calendar className="w-4 h-4" />;
    case "completed":
      return <Award className="w-4 h-4" />;
    default:
      return <AlertCircle className="w-4 h-4" />;
  }
};
