import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const useIsAuthenticated = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const tokenValue = Cookies.get("token");
    setToken(tokenValue);
    if (!tokenValue) {
      router.push("/auth");
    } else {
      // Para mayor seguridad, aquí podrías agregar una verificación
      // del token contra un endpoint de tu API.
      // ej: fetch('/api/auth/verify').then(...)
      setIsAuthenticated(true);
    }
  }, [router]);
  return { isAuthenticated, token };
};
