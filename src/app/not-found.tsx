import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Image
        src="/globe.svg"
        alt="404"
        width={80}
        height={80}
        className="mb-6"
      />
      <h1 className="text-5xl font-extrabold text-blue-700 dark:text-blue-400 mb-4">
        404
      </h1>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Página no encontrada
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8 text-center max-w-md">
        Lo sentimos, la ruta que buscas no existe o fue movida. Puedes regresar
        al inicio o explorar otras secciones.
      </p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-blue-700 transition"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}
