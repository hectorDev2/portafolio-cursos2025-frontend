# Portafolio Docente - Frontend

Este es el frontend para la aplicación de **Portafolio Docente**, una plataforma completa para la gestión de portafolios académicos. Construido con [Next.js](https://nextjs.org), [TypeScript](https://www.typescriptlang.org/) y estilizado con [Tailwind CSS](https://tailwindcss.com), este proyecto proporciona una interfaz de usuario moderna, reactiva y fácil de usar para docentes, evaluadores y administradores.

## ✨ Características Principales

La aplicación cuenta con varias vistas y funcionalidades clave adaptadas a diferentes roles de usuario:

*   **🏠 Página de Inicio (Landing Page):** Una página de presentación atractiva que describe las características, testimonios y planes del servicio.
*   **🔐 Autenticación:** Un flujo de autenticación seguro y moderno que incluye:
    *   Registro de nuevos usuarios (docentes).
    *   Inicio de sesión con manejo de tokens (JWT).
    *   Interfaz unificada para cambiar fácilmente entre registro e inicio de sesión.
*   **👤 Perfil de Usuario:** Una sección donde los usuarios pueden ver y editar su información personal, incluyendo datos de contacto, biografía y foto de perfil.
*   **🚀 Dashboard del Docente:** El corazón de la aplicación para los docentes.
    *   **Gestión de Portafolios:** Crear, ver y eliminar portafolios por semestre.
    *   **Documentos Generales:** Subir y gestionar documentos clave como Carátula, Filosofía de Enseñanza, Carga Lectiva y Currículum.
    *   **Gestión de Cursos:** Añadir y administrar cursos dentro de cada portafolio.
    *   **Documentos de Curso:** Subir y gestionar sílabos y avances curriculares para cada curso.
    *   **Feedback:** Recibir y visualizar comentarios de los evaluadores.
*   **🛡️ Panel de Administración:** Una vista exclusiva para administradores con funcionalidades para:
    *   **Resumen General:** Estadísticas clave sobre usuarios, portafolios y actividad del sistema.
    *   **Gestión de Usuarios:** Ver, crear, editar y eliminar usuarios (docentes, evaluadores, administradores).
    *   **Gestión de Portafolios:** Supervisar todos los portafolios del sistema.
    *   **Gestión de Semestres:** Crear y administrar los ciclos académicos.
*   **❓ Centro de Soporte:** Una página de ayuda completa con:
    *   **Preguntas Frecuentes (FAQ):** Buscador y categorías para encontrar respuestas rápidas.
    *   **Contacto:** Formulario para enviar tickets de soporte.
    *   **Gestión de Tickets:** Visualización del estado de los tickets enviados.
    *   **Recursos:** Acceso a guías, manuales y tutoriales.

## 🛠️ Tecnologías Utilizadas

*   **Framework:** [Next.js](https://nextjs.org) 15+ (App Router)
*   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
*   **Estilos:** [Tailwind CSS](https://tailwindcss.com) 4.0
*   **Iconos:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)
*   **Autenticación:** Basada en tokens JWT con `js-cookie` y `jwt-decode`.
*   **Subida de Archivos:** [React Dropzone](https://react-dropzone.js.org/) para una experiencia de arrastrar y soltar.
*   **Linting:** [ESLint](https://eslint.org/) configurado para Next.js.

## 🚀 Cómo Empezar

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18.x o superior) o [Bun](https://bun.sh/).

### Instalación

1.  Clona el repositorio a tu máquina local.
2.  Navega al directorio del proyecto:
    ```bash
    cd client
    ```
3.  Instala las dependencias del proyecto. Puedes usar `npm`, `yarn`, `pnpm` o `bun`.

    ```bash
    npm install
    # o
    yarn install
    # o
    pnpm install
    # o
    bun install
    ```

### Configuración del Backend

Este proyecto de frontend está diseñado para comunicarse con un backend. La configuración de reescritura de rutas en `next.config.ts` apunta a un servicio desplegado:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://portafolio-cursos2025-backend-production.up.railway.app/:path*",
      },
    ];
  },
};
```

No necesitas un archivo `.env` para la URL del API, ya que está configurada directamente. Si deseas apuntar a un backend local, puedes modificar esta URL.

### Ejecutar el Servidor de Desarrollo

Una vez instaladas las dependencias, puedes iniciar el servidor de desarrollo:

```bash
npm run dev
# o
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en funcionamiento.

## 📜 Scripts Disponibles

En el archivo `package.json`, encontrarás los siguientes scripts:

*   `dev`: Inicia el servidor de desarrollo en `localhost:3000`.
*   `build`: Compila la aplicación para producción.
*   `start`: Inicia un servidor de producción después de compilar con `build`.
*   `lint`: Ejecuta ESLint para analizar el código en busca de errores y problemas de estilo.

## 📁 Estructura del Proyecto

El proyecto sigue la estructura recomendada por Next.js con el App Router:

```
client/
├── public/              # Archivos estáticos (imágenes, SVGs)
├── src/
│   └── app/             # Rutas y componentes principales de la aplicación
│       ├── admin/       # Panel de Administración
│       ├── api/         # Rutas de API (manejadas por Next.js)
│       ├── auth/        # Flujo de Autenticación (Login, Registro)
│       ├── components/  # Componentes reutilizables globales
│       ├── dashboard/   # Dashboard principal del docente
│       ├── profile/     # Página de perfil de usuario
│       ├── support/     # Centro de Soporte y Ayuda
│       ├── globals.css  # Estilos globales de Tailwind
│       ├── layout.tsx   # Layout principal de la aplicación
│       └── page.tsx     # Página de inicio (Landing Page)
├── next.config.ts       # Configuración de Next.js
├── tailwind.config.mjs  # Configuración de Tailwind CSS
└── tsconfig.json        # Configuración de TypeScript
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar este proyecto, por favor, crea un fork del repositorio y envía un Pull Request con tus cambios.