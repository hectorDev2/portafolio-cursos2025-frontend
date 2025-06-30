import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef] dark:from-[#0a0a0a] dark:to-[#23272f]">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 max-w-6xl w-full mx-auto">
        <div className="flex items-center gap-2">
          <Image
            src="/globe.svg"
            alt="Logo AppDocente"
            width={36}
            height={36}
          />
          <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            PortafolioDocente
          </span>
        </div>
        <nav className="hidden md:flex gap-8 text-gray-700 dark:text-gray-200 font-medium">
          <a href="#features" className="hover:text-blue-600 transition">
            Características
          </a>
          <a href="#screenshots" className="hover:text-blue-600 transition">
            Capturas
          </a>
          <a href="#testimonios" className="hover:text-blue-600 transition">
            Testimonios
          </a>
          <a href="#precios" className="hover:text-blue-600 transition">
            Precios
          </a>
        </nav>
        <a
          href="#cta"
          className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition"
        >
          Solicita Demo
        </a>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white max-w-3xl leading-tight">
          La plataforma <span className="text-blue-600">más fácil</span> para
          gestionar portafolios docentes
        </h1>
        <p className="text-lg sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
          Sube, organiza y comparte tus sílabos, exámenes, evidencias y más.
          Cumple con los requisitos institucionales y ahorra tiempo con una
          solución pensada para docentes universitarios.
        </p>
        <a
          href="#cta"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-blue-700 transition mb-4"
        >
          Solicita tu Demo Gratis
        </a>
        <div className="flex justify-center gap-4 mt-6" id="screenshots">
          <Image
            src="/window.svg"
            alt="Screenshot 1"
            width={220}
            height={140}
            className="rounded-xl shadow-lg border"
          />
          <Image
            src="/file.svg"
            alt="Screenshot 2"
            width={220}
            height={140}
            className="rounded-xl shadow-lg border"
          />
        </div>
      </main>

      {/* Features */}
      <section
        id="features"
        className="max-w-5xl mx-auto py-16 px-4 grid md:grid-cols-3 gap-10"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center text-center">
          <Image src="/vercel.svg" alt="Portafolios" width={48} height={48} />
          <h3 className="font-bold text-lg mt-4 mb-2 text-blue-700 dark:text-blue-400">
            Portafolios Digitales
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Sube y organiza sílabos, exámenes, prácticas, evidencias y más en un
            solo lugar seguro y accesible.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center text-center">
          <Image src="/next.svg" alt="Gestión" width={48} height={48} />
          <h3 className="font-bold text-lg mt-4 mb-2 text-blue-700 dark:text-blue-400">
            Gestión Sencilla
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Arrastra y suelta archivos, clasifica por curso, periodo o tipo de
            documento. Todo desde una interfaz intuitiva.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center text-center">
          <Image src="/bolt.svg" alt="Cumplimiento" width={48} height={48} />
          <h3 className="font-bold text-lg mt-4 mb-2 text-blue-700 dark:text-blue-400">
            Cumplimiento y Seguridad
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Cumple con normativas universitarias y protege tus datos con
            autenticación y respaldo seguro.
          </p>
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonios" className="bg-blue-50 dark:bg-blue-950 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-300 mb-10">
            Lo que dicen los docentes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <p className="text-gray-700 dark:text-gray-200 italic mb-4">
                “Ahora todo mi portafolio está organizado y disponible en
                segundos. ¡Me ahorra horas cada semestre!”
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src="/vercel.svg"
                  alt="Docente 1"
                  width={32}
                  height={32}
                />
                <span className="font-semibold text-gray-900 dark:text-white">
                  Dra. María González
                </span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <p className="text-gray-700 dark:text-gray-200 italic mb-4">
                “La interfaz es muy intuitiva y el soporte es excelente.
                Recomiendo la plataforma a todos mis colegas.”
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src="/globe.svg"
                  alt="Docente 2"
                  width={32}
                  height={32}
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
      <section id="precios" className="max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
          Planes y Precios
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 flex flex-col items-center">
            <h3 className="font-bold text-xl mb-2 text-blue-700 dark:text-blue-400">
              Docente Individual
            </h3>
            <p className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
              S/ 29
              <span className="text-lg font-normal">/mes</span>
            </p>
            <ul className="text-gray-600 dark:text-gray-300 mb-6 text-center">
              <li>✔️ Portafolios ilimitados</li>
              <li>✔️ Soporte prioritario</li>
              <li>✔️ Acceso seguro 24/7</li>
            </ul>
            <a
              href="#cta"
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition"
            >
              Comenzar
            </a>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 flex flex-col items-center">
            <h3 className="font-bold text-xl mb-2 text-blue-700 dark:text-blue-400">
              Institución
            </h3>
            <p className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
              A consultar
            </p>
            <ul className="text-gray-600 dark:text-gray-300 mb-6 text-center">
              <li>✔️ Integración con sistemas</li>
              <li>✔️ Capacitación y soporte dedicado</li>
              <li>✔️ Personalización institucional</li>
            </ul>
            <a
              href="#cta"
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition"
            >
              Solicitar Cotización
            </a>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section
        id="cta"
        className="py-16 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-center"
      >
        <h2 className="text-3xl font-bold mb-4">
          ¿Listo para transformar tu gestión docente?
        </h2>
        <p className="mb-8 text-lg">
          Solicita una demo personalizada o comienza gratis hoy mismo.
        </p>
        <a
          href="mailto:ventas@portafoliodocente.com"
          className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
        >
          Solicitar Demo
        </a>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-200 dark:border-gray-800">
        © {new Date().getFullYear()} PortafolioDocente. Todos los derechos
        reservados.
      </footer>
    </div>
  );
}
