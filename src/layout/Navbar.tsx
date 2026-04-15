import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useCurrentUserQuery,
  useLogoutMutation,
} from "../features/auth/queries";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { data: user } = useCurrentUserQuery();

  const { mutate: logoutUser } = useLogoutMutation();

  const logout = () => {
    logoutUser();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const language = (lang: "en-IN" | "hi-IN" | "fr-FR") => {
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
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
            {t("home")}
          </button>

          <button
            onClick={() => navigate("/events/list")}
            className="text-sm text-gray-300 hover:text-white transition"
          >
            {t("events")}
          </button>

          <button
            onClick={() => navigate("/events/filter")}
            className="text-sm text-gray-300 hover:text-white transition"
          >
            {t("browse")}
          </button>
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <button
                onClick={() => navigate("auth/login")}
                className="text-sm text-gray-300 hover:text-white transition"
              >
                {t("login")}
              </button>

              <button
                onClick={() => navigate("auth/register")}
                className="px-4 py-2 text-sm bg-indigo-500 text-white rounded-xl shadow-md hover:bg-indigo-600 transition"
              >
                {t("signup")}
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
                onClick={() => navigate("reports/dashboard")}
                className="text-sm text-gray-300 hover:text-white transition"
              >
                {t("report")}
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
              >
                {t("logout")}
              </button>
            </>
          )}
          <select
            value={i18n.language}
            onChange={(e) => language(e.target.value as "en-IN" | "hi-IN" | "fr-FR")}
            className="bg-transparent text-white border rounded px-2 py-1"
          >
            <option value="en-IN" className="text-black">
              English
            </option>
            <option value="hi-IN" className="text-black">
              हिंदी
            </option>
            <option value="fr-FR" className="text-black">
              Français
            </option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
