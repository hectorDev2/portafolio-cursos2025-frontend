interface AuthFooterProps {
  isLogin: boolean;
  setIsLogin: (v: boolean) => void;
}

export default function AuthFooter({ isLogin, setIsLogin }: AuthFooterProps) {
  return (
    <div className="text-center mt-6">
      <p className="text-gray-600 dark:text-gray-300">
        {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className={`font-semibold transition-colors underline ${
            isLogin
              ? "text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
              : "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          }`}
        >
          {isLogin ? "Regístrate" : "Inicia sesión"}
        </button>
      </p>
    </div>
  );
}
