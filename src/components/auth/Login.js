import { useForm } from "react-hook-form";
import { useState } from "react";
import { AiOutlineEye as EyeIcon, AiOutlineEyeInvisible as EyeOffIcon } from "react-icons/ai";

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(data) {
    setLoading(true);

    // Aqui você pode enviar os dados para o servidor
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const token = response.headers.get("Token");
      sessionStorage.setItem("token", token);

      window.location.href = "/";
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto px-4 pt-6 pb-8 bg-white">
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">E-mail</label>
        <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} type="email" id="email" name="email" className={`w-full p-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline ${errors.email ? "border-red-500" : ""}`} />
        {errors.email && <span className="block text-red-500 mt-2">Campo obrigatório e deve ser um email válido.</span>}
      </div>

      <div className="mb-4 relative">
      <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
        Senha
      </label>
      <div className="flex">
        <input
          {...register("password", { required: true })}
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          className={`w-full p-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline ${
            errors.password ? "border-red-500" : ""
          }`}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-3 mt-8"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOffIcon className="h-6 w-6 text-gray-600" /> : <EyeIcon className="h-6 w-6 text-gray-600" />}
        </button>
      </div>
      {errors.password && <span className="block text-red-500 mt-2">Campo obrigatório.</span>}
    </div>

      <button type="submit" className={`w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`} disabled={loading}>
        {loading ? "Carregando..." : "Entrar"}
      </button>

      <div className="text-right mt-2">
        <a href="auth/forgetpassword" className="text-blue-500 hover:text-blue-700">Esqueceu sua senha?</a>
      </div>
    </form>
  );
}