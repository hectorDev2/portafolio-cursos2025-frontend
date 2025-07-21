"use client";
import React, { useState } from "react";
import {
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  Search,
  ChevronDown,
  ChevronUp,
  Book,
  Video,
  FileText,
  Users,
  Settings,
  Clock,
  CheckCircle,
  Send,
  User,
  Calendar,
  Globe,
  Headphones,
  MessageSquare,
  ExternalLink,
  Download,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Plus,
} from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  notHelpful: number;
}

interface SupportTicket {
  id: string;
  subject: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  lastUpdate: string;
}

const SupportPage = () => {
  const [activeTab, setActiveTab] = useState<
    "faq" | "contact" | "tickets" | "resources"
  >("faq");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "technical",
    priority: "medium",
    message: "",
  });

  const faqCategories = [
    { id: "all", name: "Todas las Categorías", icon: HelpCircle },
    { id: "account", name: "Cuenta y Acceso", icon: User },
    { id: "portfolios", name: "Portafolios", icon: Book },
    { id: "technical", name: "Problemas Técnicos", icon: Settings },
    { id: "files", name: "Archivos y Documentos", icon: FileText },
    { id: "evaluation", name: "Evaluación", icon: CheckCircle },
  ];

  const faqItems: FAQItem[] = [
    {
      id: "1",
      question: "¿Cómo puedo restablecer mi contraseña?",
      answer:
        'Para restablecer tu contraseña, ve a la página de inicio de sesión y haz clic en "¿Olvidaste tu contraseña?". Ingresa tu correo electrónico y recibirás un enlace para crear una nueva contraseña. El enlace expira en 24 horas por seguridad.',
      category: "account",
      helpful: 45,
      notHelpful: 3,
    },
    {
      id: "2",
      question: "¿Cuál es el tamaño máximo de archivo que puedo subir?",
      answer:
        "El tamaño máximo por archivo es de 5MB. Para archivos más grandes, te recomendamos comprimirlos o dividirlos en partes más pequeñas. Los formatos soportados incluyen PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, JPG, PNG y ZIP.",
      category: "files",
      helpful: 38,
      notHelpful: 2,
    },
    {
      id: "3",
      question: "¿Cómo creo un nuevo portafolio?",
      answer:
        'En tu dashboard, haz clic en el botón "Nuevo Portafolio". Completa la información requerida: nombre del curso, código del curso y semestre académico. Una vez creado, podrás comenzar a subir documentos en las diferentes secciones.',
      category: "portfolios",
      helpful: 52,
      notHelpful: 1,
    },
    {
      id: "4",
      question: "¿Por qué no puedo acceder a ciertas secciones?",
      answer:
        "El acceso a las secciones depende de tu rol de usuario. Los docentes pueden gestionar sus portafolios, los evaluadores pueden revisar portafolios asignados, y los administradores tienen acceso completo. Si crees que deberías tener acceso, contacta al administrador.",
      category: "account",
      helpful: 29,
      notHelpful: 5,
    },
    {
      id: "5",
      question: "¿Cómo puedo ver el progreso de mi portafolio?",
      answer:
        "En tu dashboard verás una barra de progreso para cada portafolio. El porcentaje se calcula basado en las secciones completadas: Sílabos, Materiales, Prácticas, Exámenes y Trabajos Estudiantiles. Cada sección representa el 20% del total.",
      category: "portfolios",
      helpful: 41,
      notHelpful: 2,
    },
    {
      id: "6",
      question: "¿Qué hago si el sistema está lento o no responde?",
      answer:
        "Primero, verifica tu conexión a internet. Luego, intenta refrescar la página (Ctrl+F5). Si el problema persiste, cierra y vuelve a abrir tu navegador. Para problemas persistentes, contacta al soporte técnico con detalles sobre tu navegador y sistema operativo.",
      category: "technical",
      helpful: 33,
      notHelpful: 4,
    },
    {
      id: "7",
      question: "¿Cómo funciona el proceso de evaluación?",
      answer:
        "Una vez que completes tu portafolio, será asignado automáticamente a un evaluador. El evaluador revisará todos los documentos y dejará comentarios. Recibirás una notificación cuando la evaluación esté completa. Puedes ver los comentarios en la sección de retroalimentación.",
      category: "evaluation",
      helpful: 47,
      notHelpful: 1,
    },
    {
      id: "8",
      question: "¿Puedo editar un portafolio después de enviarlo?",
      answer:
        'Sí, puedes editar tu portafolio hasta que sea marcado como "En Revisión" por un evaluador. Una vez en revisión, necesitarás contactar al evaluador o administrador para hacer cambios. Después de la evaluación final, los cambios requieren aprobación especial.',
      category: "portfolios",
      helpful: 35,
      notHelpful: 3,
    },
  ];

  const supportTickets: SupportTicket[] = [
    {
      id: "TK-001",
      subject: "Error al subir archivo PDF",
      status: "in-progress",
      priority: "medium",
      createdAt: "2024-01-15",
      lastUpdate: "2024-01-15 14:30",
    },
    {
      id: "TK-002",
      subject: "No puedo acceder a mi dashboard",
      status: "resolved",
      priority: "high",
      createdAt: "2024-01-14",
      lastUpdate: "2024-01-14 16:45",
    },
    {
      id: "TK-003",
      subject: "Solicitud de cambio de rol",
      status: "open",
      priority: "low",
      createdAt: "2024-01-13",
      lastUpdate: "2024-01-13 10:20",
    },
  ];

  const resources = [
    {
      id: "1",
      title: "Guía de Usuario Completa",
      description:
        "Manual detallado sobre todas las funcionalidades del sistema",
      type: "pdf",
      icon: FileText,
      downloadUrl: "#",
    },
    {
      id: "2",
      title: "Video Tutorial: Creando tu Primer Portafolio",
      description: "Tutorial paso a paso para crear y gestionar portafolios",
      type: "video",
      icon: Video,
      downloadUrl: "#",
    },
    {
      id: "3",
      title: "Plantillas de Documentos",
      description:
        "Plantillas prediseñadas para sílabos y materiales académicos",
      type: "zip",
      icon: Download,
      downloadUrl: "#",
    },
    {
      id: "4",
      title: "Webinar: Mejores Prácticas",
      description:
        "Grabación del webinar sobre mejores prácticas en portafolios académicos",
      type: "video",
      icon: Video,
      downloadUrl: "#",
    },
  ];

  const filteredFAQs = faqItems.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    // Aquí iría la lógica para enviar el formulario
    alert("Tu mensaje ha sido enviado. Te contactaremos pronto.");
    setContactForm({
      name: "",
      email: "",
      subject: "",
      category: "technical",
      priority: "medium",
      message: "",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900";
      case "in-progress":
        return "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900";
      case "resolved":
        return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900";
      case "closed":
        return "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900";
      default:
        return "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-red-600 dark:text-red-400";
      case "high":
        return "text-orange-600 dark:text-orange-400";
      case "medium":
        return "text-yellow-600 dark:text-yellow-400";
      case "low":
        return "text-green-600 dark:text-green-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Centro de Soporte y Ayuda
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Encuentra respuestas y obtén ayuda técnica
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ¿En qué podemos ayudarte?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Encuentra respuestas rápidas en nuestras preguntas frecuentes o
            contacta directamente con nuestro equipo de soporte técnico
            especializado.
          </p>

          {/* Quick Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Busca en preguntas frecuentes, guías y recursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              50+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Preguntas Frecuentes
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              &lt; 2h
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Tiempo de Respuesta
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              98%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Satisfacción
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Headphones className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              24/7
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Disponibilidad
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: "faq", name: "Preguntas Frecuentes", icon: HelpCircle },
              { id: "contact", name: "Contactar Soporte", icon: MessageCircle },
              { id: "tickets", name: "Mis Tickets", icon: FileText },
              { id: "resources", name: "Recursos y Guías", icon: Book },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Categorías
                </h3>
                <nav className="space-y-2">
                  {faqCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                          selectedCategory === category.id
                            ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        <span className="text-sm font-medium">
                          {category.name}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map((faq) => (
                    <div
                      key={faq.id}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                    >
                      <button
                        onClick={() =>
                          setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
                        }
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                          {faq.question}
                        </h3>
                        {expandedFAQ === faq.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>

                      {expandedFAQ === faq.id && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                              {faq.answer}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  ¿Te fue útil esta respuesta?
                                </span>
                                <div className="flex items-center space-x-2">
                                  <button className="flex items-center space-x-1 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span className="text-sm">
                                      {faq.helpful}
                                    </span>
                                  </button>
                                  <button className="flex items-center space-x-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                                    <ThumbsDown className="w-4 h-4" />
                                    <span className="text-sm">
                                      {faq.notHelpful}
                                    </span>
                                  </button>
                                </div>
                              </div>

                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  faq.category === "account"
                                    ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                                    : faq.category === "portfolios"
                                      ? "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
                                      : faq.category === "technical"
                                        ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                                        : faq.category === "files"
                                          ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                                          : "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200"
                                }`}
                              >
                                {
                                  faqCategories.find(
                                    (cat) => cat.id === faq.category
                                  )?.name
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No se encontraron resultados
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Intenta con otros términos de búsqueda o selecciona una
                      categoría diferente.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Enviar Mensaje de Soporte
              </h3>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Asunto
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.subject}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        subject: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Describe brevemente tu problema"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Categoría
                    </label>
                    <select
                      value={contactForm.category}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="technical">Problema Técnico</option>
                      <option value="account">Cuenta y Acceso</option>
                      <option value="portfolios">Portafolios</option>
                      <option value="files">Archivos y Documentos</option>
                      <option value="evaluation">Evaluación</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Prioridad
                    </label>
                    <select
                      value={contactForm.priority}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          priority: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                      <option value="urgent">Urgente</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Descripción del Problema
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Describe detalladamente tu problema, incluyendo pasos para reproducirlo si es aplicable..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Mensaje
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Contact Methods */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Otros Métodos de Contacto
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Email
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        soporte@universidad.edu
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Teléfono
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        +1 (555) 123-4567
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Chat en Vivo
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Disponible 24/7
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Horarios de Atención
                </h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Lunes - Viernes
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      8:00 AM - 8:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Sábados
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      9:00 AM - 5:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Domingos
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      10:00 AM - 4:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Soporte de Emergencia
                    </span>
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      24/7
                    </span>
                  </div>
                </div>
              </div>

              {/* Response Times */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Tiempos de Respuesta
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Urgente
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      15 minutos
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Alta
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      1 hora
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Media
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      4 horas
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Baja
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      24 horas
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tickets Tab */}
        {activeTab === "tickets" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Mis Tickets de Soporte
              </h2>
              <button
                onClick={() => setActiveTab("contact")}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Ticket
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Ticket ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Asunto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Prioridad
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Creado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Última Actualización
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {supportTickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {ticket.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {ticket.subject}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}
                          >
                            {ticket.status === "open"
                              ? "Abierto"
                              : ticket.status === "in-progress"
                                ? "En Progreso"
                                : ticket.status === "resolved"
                                  ? "Resuelto"
                                  : "Cerrado"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`text-sm font-medium ${getPriorityColor(ticket.priority)}`}
                          >
                            {ticket.priority === "urgent"
                              ? "Urgente"
                              : ticket.priority === "high"
                                ? "Alta"
                                : ticket.priority === "medium"
                                  ? "Media"
                                  : "Baja"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {ticket.createdAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {ticket.lastUpdate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                              <MessageCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {supportTickets.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No tienes tickets de soporte
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Cuando contactes al soporte, tus tickets aparecerán aquí.
                </p>
                <button
                  onClick={() => setActiveTab("contact")}
                  className="flex items-center mx-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Primer Ticket
                </button>
              </div>
            )}
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === "resources" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Recursos y Guías de Ayuda
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Encuentra manuales, tutoriales y recursos adicionales para
                aprovechar al máximo el sistema de gestión de portafolios
                académicos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource) => {
                const Icon = resource.icon;
                return (
                  <div
                    key={resource.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {resource.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                          {resource.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              resource.type === "pdf"
                                ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                                : resource.type === "video"
                                  ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                                  : "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
                            }`}
                          >
                            {resource.type.toUpperCase()}
                          </span>

                          <button className="flex items-center space-x-1 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium">
                            <Download className="w-4 h-4" />
                            <span className="text-sm">Descargar</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Resources */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Recursos Adicionales
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Portal de Conocimiento
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Base de conocimientos completa con artículos y tutoriales
                    detallados.
                  </p>
                  <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm">
                    Visitar Portal →
                  </button>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Comunidad de Usuarios
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Conecta con otros usuarios, comparte experiencias y obtén
                    consejos.
                  </p>
                  <button className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium text-sm">
                    Unirse →
                  </button>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Webinars y Entrenamientos
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Sesiones en vivo para aprender nuevas funcionalidades y
                    mejores prácticas.
                  </p>
                  <button className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 font-medium text-sm">
                    Ver Calendario →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportPage;
