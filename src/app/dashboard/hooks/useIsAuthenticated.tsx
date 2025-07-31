import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@/app/shared/hooks/useAuth";

export const useIsAuthenticated = () => {
  const router = useRouter();
  const { userId, token, rol } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push("/auth");
    } else {
      // Para mayor seguridad, aquí podrías agregar una verificación
      // del token contra un endpoint de tu API.
      // ej: fetch('/api/auth/verify').then(...)
      if (rol !== "ESTUDIANTE") {
        router.push("/dashboard");
        return;
      }
      setIsAuthenticated(true);
    }
  }, [router]);
  return { isAuthenticated };
};
