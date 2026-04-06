import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useLoginMutation from "../queries";

export const Login = () => {
  const { register, handleSubmit } = useForm<Master.LoginForm>();
  const { mutate, isPending, isError, error } = useLoginMutation();

  const navigate = useNavigate();

  // const onSubmit = (data: Master.LoginForm) => {
  //   mutate(data, {
  //     onSuccess: (res) => {
  //       localStorage.setItem("token", res?.token || "");
  //       navigate("/");
  //     },
  //     onError: () => {
  //       alert("Invalid username or password")
  //     }
  //   });
  // };

  const onSubmit = (data: Master.LoginForm) => {
    mutate(data, {
      onSuccess: (res) => {
        console.log("LOGIN RESPONSE =>", res);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/");
      },
      onError: () => {
        alert("Invalid username or password");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-black px-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            placeholder="Username"
            {...register("name", { required: "Username is required" })}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-gray-200 focus:outline-none focus:border-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-gray-200 focus:outline-none focus:border-indigo-500"
          />

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-indigo-500 hover:bg-indigo-600 py-3 rounded-xl transition disabled:opacity-50"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        {isError && (
          <p className="text-red-400 text-sm mt-3">
            {(error as Error)?.message || "Login failed"}
          </p>
        )}

        <p className="text-gray-400 text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/auth/register")}
            className="text-indigo-400 cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
