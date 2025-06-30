import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef] dark:from-[#0a0a0a] dark:to-[#23272f]">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 max-w-6xl w-full mx-auto">
        <div className="flex items-center gap-2">
          <Image src="/bolt.svg" alt="Bolt Logo" width={36} height={36} />
          <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            bolt.news
          </span>
        </div>
        <nav className="hidden md:flex gap-8 text-gray-700 dark:text-gray-200 font-medium">
          <a href="#features" className="hover:text-blue-600 transition">
            Features
          </a>
          <a href="#pricing" className="hover:text-blue-600 transition">
            Pricing
          </a>
          <a href="#about" className="hover:text-blue-600 transition">
            About
          </a>
        </nav>
        <a
          href="#get-started"
          className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white max-w-3xl leading-tight">
          Lightning-fast <span className="text-blue-600">collaboration</span>{" "}
          for modern teams
        </h1>
        <p className="text-lg sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
          Organize, share, and move your projects forward with the speed of
          Bolt. Simple, beautiful, and built for productivity.
        </p>
        <a
          href="#get-started"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-blue-700 transition mb-4"
        >
          Start for Free
        </a>
        <div className="flex justify-center gap-4 mt-6">
          <Image src="/globe.svg" alt="Globe" width={48} height={48} />
          <Image src="/window.svg" alt="Window" width={48} height={48} />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-200 dark:border-gray-800">
        © {new Date().getFullYear()} bolt.new. All rights reserved.
      </footer>
    </div>
  );
}
