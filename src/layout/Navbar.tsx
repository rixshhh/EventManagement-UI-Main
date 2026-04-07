import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();

  const user: Master.User | null = JSON.parse(
    localStorage.getItem("user") || "null",
  );

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div
          onClick={() => navigate("/")}
          className="text-xl font-semibold cursor-pointer tracking-tight text-white"
        >
          Event<span className="text-indigo-400">Hub</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-300 hover:text-white transition"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/events/list")}
            className="text-sm text-gray-300 hover:text-white transition"
          >
            Events
          </button>

          <button
            onClick={() => navigate("/events/filter")}
            className="text-sm text-gray-300 hover:text-white transition"
          >
            Browse
          </button>
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <button
                onClick={() => navigate("auth/login")}
                className="text-sm text-gray-300 hover:text-white transition"
              >
                Login
              </button>

              <button
                onClick={() => navigate("auth/register")}
                className="px-4 py-2 text-sm bg-indigo-500 text-white rounded-xl shadow-md hover:bg-indigo-600 transition"
              >
                Signup
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("user/profile")}
                className="text-sm text-gray-300 hover:text-white transition"
              >
                {user.name}
              </button>

              <button
                onClick={logout}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
