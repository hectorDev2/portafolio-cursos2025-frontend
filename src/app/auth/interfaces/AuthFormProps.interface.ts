export interface AuthFormProps {
  isLogin: boolean;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  formData: {
    name?: string;
    lastName?: string;
    email: string;
    password: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}
