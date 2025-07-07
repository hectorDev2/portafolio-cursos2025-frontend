import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-black">
      {/* Header */}
      <header className="flex justify-between items-center px-6 md:px-10 py-5 max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <Image
            src="/globe.svg"
            alt="Logo PortafolioDocente"
            width={32}
            height={32}
            className="text-blue-600"
          />
          <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            PortafolioDocente
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-gray-600 dark:text-gray-300 font-medium">
          <a href="#features" className="hover:text-blue-600 transition-colors">
            Características
          </a>
          <a
            href="#testimonios"
            className="hover:text-blue-600 transition-colors"
          >
            Testimonios
          </a>
          <a href="#precios" className="hover:text-blue-600 transition-colors">
            Planes
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/auth/"
            className="font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/auth/"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Regístrate Gratis
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-5 text-gray-900 dark:text-white max-w-4xl leading-tight">
          Centraliza y Optimiza tu{" "}
          <span className="text-blue-600">Portafolio Docente</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl">
          Registra, gestiona y comparte toda tu documentación académica en un
          solo lugar seguro. Diseñado para simplificar tu trabajo y cumplir con
          los estándares institucionales.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/auth"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-xl hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Crear Cuenta Gratis
          </Link>
          <Link
            href="#features"
            className="inline-block bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            Descubrir Funciones
          </Link>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="bg-white dark:bg-gray-800/50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Una Plataforma Diseñada para la Excelencia Académica
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
              <Image
                src="/file.svg"
                alt="Gestión Integral"
                width={52}
                height={52}
              />
              <h3 className="font-bold text-xl mt-5 mb-3 text-blue-600 dark:text-blue-400">
                Gestión Integral
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Crea portafolios y sube documentos clave como carátulas, carga
                lectiva y tu filosofía de enseñanza.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
              <Image
                src="/window.svg"
                alt="Organización por Cursos"
                width={52}
                height={52}
              />
              <h3 className="font-bold text-xl mt-5 mb-3 text-blue-600 dark:text-blue-400">
                Organización por Cursos
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Administra cursos dentro de tus portafolios, gestionando
                sílabos, avances y registros de entrega de forma centralizada.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
              <Image
                src="/globe.svg"
                alt="Colaboración y Roles"
                width={52}
                height={52}
              />
              <h3 className="font-bold text-xl mt-5 mb-3 text-blue-600 dark:text-blue-400">
                Colaboración y Roles
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Facilita la supervisión y el feedback con roles para Docentes,
                Evaluadores y Administradores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonios" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Lo que dicen nuestros docentes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <p className="text-gray-700 dark:text-gray-200 italic mb-5">
                “Ahora todo mi portafolio está organizado y disponible en
                segundos. ¡Me ahorra horas cada semestre!”
              </p>
              <div className="flex items-center gap-4">
                <Image
                  src="/vercel.svg"
                  alt="Avatar Docente 1"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="font-semibold text-gray-900 dark:text-white">
                  Dra. María González
                </span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <p className="text-gray-700 dark:text-gray-200 italic mb-5">
                “La interfaz es muy intuitiva y el soporte es excelente.
                Recomiendo la plataforma a todos mis colegas.”
              </p>
              <div className="flex items-center gap-4">
                <Image
                  src="/next.svg"
                  alt="Avatar Docente 2"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="font-semibold text-gray-900 dark:text-white">
                  Prof. Luis Ramírez
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Precios y CTA */}
      <section id="precios" className="bg-white dark:bg-gray-800/50 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Planes Flexibles para Cada Necesidad
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-8 flex flex-col text-center">
              <h3 className="font-bold text-2xl mb-4 text-blue-600 dark:text-blue-400">
                Docente
              </h3>
              <p className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                Gratis
              </p>
              <ul className="text-gray-600 dark:text-gray-300 mb-8 space-y-2">
                <li>✔️ Gestión de Portafolios Ilimitada</li>
                <li>✔️ Organización de Cursos y Sílabos</li>
                <li>✔️ Subida Segura de Documentos</li>
                <li>✔️ Acceso 24/7</li>
              </ul>
              <Link
                href="/auth/"
                className="mt-auto bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
              >
                Comenzar Gratis
              </Link>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-8 flex flex-col text-center">
              <h3 className="font-bold text-2xl mb-4 text-blue-600 dark:text-blue-400">
                Institución
              </h3>
              <p className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                Personalizado
              </p>
              <ul className="text-gray-600 dark:text-gray-300 mb-8 space-y-2">
                <li>✔️ Todas las funciones del plan Docente</li>
                <li>✔️ Roles de Administrador y Evaluador</li>
                <li>✔️ Soporte y Capacitación Dedicada</li>
                <li>✔️ Integración con Sistemas Existentes</li>
              </ul>
              <a
                href="mailto:ventas@portafoliodocente.com"
                className="mt-auto bg-gray-800 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              >
                Solicitar Cotización
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section
        id="cta"
        className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center"
      >
        <h2 className="text-4xl font-bold mb-4">
          ¿Listo para optimizar tu trabajo?
        </h2>
        <p className="mb-8 text-xl max-w-2xl mx-auto">
          Crea tu cuenta gratis y empieza a gestionar tus portafolios en
          minutos.
        </p>
        <Link
          href="/auth/register"
          className="bg-white text-blue-700 px-10 py-4 rounded-full font-bold shadow-2xl hover:bg-gray-100 transition-transform transform hover:scale-105"
        >
          Regístrate Ahora
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-800">
        <p>
          © {new Date().getFullYear()} PortafolioDocente. Todos los derechos
          reservados.
        </p>
        <p className="mt-2">Diseñado para la comunidad académica.</p>
      </footer>
    </div>
  );
}
