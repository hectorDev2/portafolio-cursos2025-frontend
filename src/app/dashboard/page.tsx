import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  PenTool, 
  GraduationCap, 
  Users, 
  Upload, 
  Eye, 
  Trash2, 
  Plus, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  MessageSquare,
  Settings,
  LogOut,
  User,
  Download,
  Search,
  Filter,
  Calendar,
  BarChart3
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  type: string;
}

interface Portfolio {
  id: string;
  courseName: string;
  courseCode: string;
  semester: string;
  status: 'complete' | 'incomplete' | 'review';
  completionPercentage: number;
  lastModified: string;
}

const DashboardPage = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState<string>('1');
  const [activeSection, setActiveSection] = useState<string>('silabos');
  const [showNewPortfolioModal, setShowNewPortfolioModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Mock data
  const teacherName = "Dr. María González";
  const portfolios: Portfolio[] = [
    {
      id: '1',
      courseName: 'Algoritmos y Estructuras de Datos',
      courseCode: 'CS-301',
      semester: '2024-I',
      status: 'complete',
      completionPercentage: 100,
      lastModified: '2024-01-15'
    },
    {
      id: '2',
      courseName: 'Programación Web',
      courseCode: 'CS-205',
      semester: '2024-I',
      status: 'incomplete',
      completionPercentage: 75,
      lastModified: '2024-01-10'
    },
    {
      id: '3',
      courseName: 'Base de Datos',
      courseCode: 'CS-302',
      semester: '2024-I',
      status: 'review',
      completionPercentage: 90,
      lastModified: '2024-01-12'
    }
  ];

  const sections = [
    { id: 'silabos', name: 'Sílabos', icon: BookOpen, color: 'blue' },
    { id: 'materiales', name: 'Materiales', icon: FileText, color: 'green' },
    { id: 'practicas', name: 'Prácticas', icon: PenTool, color: 'purple' },
    { id: 'examenes', name: 'Exámenes', icon: GraduationCap, color: 'red' },
    { id: 'trabajos', name: 'Trabajos Estudiantiles', icon: Users, color: 'orange' }
  ];

  const mockFiles: { [key: string]: FileItem[] } = {
    silabos: [
      { id: '1', name: 'Silabo_CS301_2024I.pdf', size: '2.3 MB', uploadDate: '2024-01-15', type: 'pdf' },
      { id: '2', name: 'Cronograma_Actividades.xlsx', size: '1.8 MB', uploadDate: '2024-01-14', type: 'excel' }
    ],
    materiales: [
      { id: '3', name: 'Clase01_Introduccion.pptx', size: '4.2 MB', uploadDate: '2024-01-13', type: 'powerpoint' },
      { id: '4', name: 'Lectura_Algoritmos.pdf', size: '3.1 MB', uploadDate: '2024-01-12', type: 'pdf' }
    ],
    practicas: [
      { id: '5', name: 'Practica01_Arrays.pdf', size: '1.5 MB', uploadDate: '2024-01-11', type: 'pdf' }
    ],
    examenes: [
      { id: '6', name: 'Examen_Parcial_2024I.pdf', size: '2.8 MB', uploadDate: '2024-01-10', type: 'pdf' }
    ],
    trabajos: [
      { id: '7', name: 'Proyecto_Final_Grupo1.zip', size: '4.9 MB', uploadDate: '2024-01-09', type: 'zip' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'text-green-600 dark:text-green-400';
      case 'incomplete': return 'text-orange-600 dark:text-orange-400';
      case 'review': return 'text-blue-600 dark:text-blue-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete': return <CheckCircle className="w-5 h-5" />;
      case 'incomplete': return <AlertCircle className="w-5 h-5" />;
      case 'review': return <Clock className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'complete': return 'Completo';
      case 'incomplete': return 'Incompleto';
      case 'review': return 'En Revisión';
      default: return 'Desconocido';
    }
  };

  const currentPortfolio = portfolios.find(p => p.id === selectedPortfolio);
  const currentSection = sections.find(s => s.id === activeSection);

  // ...el resto del renderizado (igual que tu código anterior)...

  return (
    // ...todo el JSX que enviaste...
  );
};

export default DashboardPage;
