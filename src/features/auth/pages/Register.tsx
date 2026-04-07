import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ApiServices } from "../../../services";

interface RegisterForm {
  name: string;
  password: string;
}

export const Register = () => {
  const { register, handleSubmit } = useForm<RegisterForm>();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: RegisterForm) => {
      return await ApiServices.post("auth/register", data);
    },
  });

  const onSubmit = (data: RegisterForm) => {
    mutate(data, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-black px-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            placeholder="Username"
            {...register("name", { required: true })}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-gray-200 focus:outline-none focus:border-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-gray-200 focus:outline-none focus:border-indigo-500"
          />

          <button
            onClick={() => navigate("/auth/login")}
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 py-3 rounded-xl transition"
          >
            {isPending ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/auth/login")}
            className="text-indigo-400 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
