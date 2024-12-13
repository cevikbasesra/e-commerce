import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify"; // Toastify'i import ediyoruz

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true); // Form gönderilmeye başlandığında
    const loginToastId = toast.info("Logging in...", { autoClose: false }); // Giriş işlemi başladığında gösterilecek toast

    try {
      // 1000ms (1 saniye) bekleyelim, ardından giriş işlemini başlatalım.
      setTimeout(async () => {
        try {
          const response = await axios.post(
            "https://workintech-fe-ecommerce.onrender.com/login",
            data
          );

          // Başarılı giriş
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", response.data.token);

          // `toast.dismiss()` ile "Logging in..." mesajını hemen kapatıyoruz
          toast.dismiss(loginToastId);

          // Başarılı giriş mesajı
          toast.success("Login successful! Redirecting...");

          // Yönlendirme işlemi
          setTimeout(() => {
            window.location.href = "/"; // Anasayfaya yönlendiriyoruz
          }, 2000); // 2 saniye sonra yönlendirme
        } catch (error) {
          // `toast.dismiss()` ile "Logging in..." mesajını hemen kapatıyoruz
          toast.dismiss(loginToastId);

          // Başarısız giriş mesajı
          toast.error("Invalid credentials or other error");
        } finally {
          setIsSubmitting(false); // Form gönderimi sonlandı
        }
      }, 1000); // 1 saniye sonra login işlemi başlatılıyor
    } catch (error) {
      // `toast.dismiss()` ile "Logging in..." mesajını hemen kapatıyoruz
      toast.dismiss(loginToastId);

      // Başarısız giriş mesajı
      toast.error("Invalid credentials or other error");
    } finally {
      setIsSubmitting(false); // Form gönderimi sonlandı
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center">Login</h2>

      {/* Login formu */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Signup Link */}
      <div className="text-center mt-4">
        <p className="text-sm">
          Don't have an account?{" "}
          <button
            onClick={() => (window.location.href = "/signup")}
            className="text-blue-500 hover:underline"
          >
            Create one now.
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
