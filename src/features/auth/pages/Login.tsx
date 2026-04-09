import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import {useLoginMutation} from "../queries";

export const Login = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<Master.LoginForm>();
  
  const { mutate, isPending, isSuccess, isError, data } =
    useLoginMutation();

  const onSubmit = (formData: Master.LoginForm) => {
    mutate(formData);
  };

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(`Welcome back ${data.user.name}`);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(data.user));

      setTimeout(() => navigate("/"), 1000);
    }
  }, [isSuccess, data, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error("Invalid username or password");
    }
  }, [isError]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-black px-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            placeholder="Username"
            {...register("name", { required: true })}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-gray-200"
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-gray-200"
          />

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-indigo-500 hover:bg-indigo-600 py-3 rounded-xl"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;