// Este archivo ha sido desactivado. El dark mode global se gestiona en AppLayout y AppNavigation.
// No usar este componente. Toda la lógica de dark mode está centralizada.

// "use client";
// import React from "react";
// import { Sun, Moon } from "lucide-react";

// export default function DarkModeToggle() {
//   const [dark, setDark] = React.useState(false);
//   const [mounted, setMounted] = React.useState(false);

//   React.useEffect(() => {
//     setMounted(true);
//     // Leer preferencia guardada o del sistema
//     const saved =
//       typeof window !== "undefined" ? localStorage.getItem("theme") : null;
//     if (
//       saved === "dark" ||
//       (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
//     ) {
//       setDark(true);
//       document.body.classList.add("dark");
//     } else {
//       setDark(false);
//       document.body.classList.remove("dark");
//     }
//   }, []);

//   const toggleDark = () => {
//     setDark((prev) => {
//       if (!prev) {
//         document.body.classList.add("dark");
//         localStorage.setItem("theme", "dark");
//       } else {
//         document.body.classList.remove("dark");
//         localStorage.setItem("theme", "light");
//       }
//       return !prev;
//     });
//   };

//   if (!mounted) return null; // Evita hydration mismatch

//   return (
//     <button
//       aria-label="Toggle dark mode"
//       onClick={toggleDark}
//       style={{
//         position: "fixed",
//         top: 20,
//         right: 20,
//         zIndex: 50,
//         background: dark ? "#23272f" : "#fff",
//         color: dark ? "#fff" : "#23272f",
//         border: "1px solid #ccc",
//         borderRadius: 9999,
//         padding: "0.5rem 1rem",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
//         cursor: "pointer",
//         fontWeight: 600,
//         fontSize: 16,
//         transition: "all .2s",
//         display: "flex",
//         alignItems: "center",
//         gap: "0.5rem",
//       }}
//     >
//       {dark ? <Moon size={20} /> : <Sun size={20} />}
//     </button>
//   );
// }
