import { classNames } from "primereact/utils";

const ToastTheme = {
  root: {
    className: classNames("w-96 opacity-100"),
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: ({ state, index }: any) => ({
    className: classNames(
      "my-4 rounded-2xl w-full backdrop-blur-xl border shadow-lg overflow-hidden",
      {
        "bg-indigo-500/10 border-indigo-400/30 text-indigo-200":
          state.messages[index]?.message.severity === "info",

        "bg-green-500/10 border-green-400/30 text-green-200":
          state.messages[index]?.message.severity === "success",

        "bg-yellow-500/10 border-yellow-400/30 text-yellow-200":
          state.messages[index]?.message.severity === "warn",

        "bg-red-500/10 border-red-400/30 text-red-200":
          state.messages[index]?.message.severity === "error",
      },
    ),
  }),

  content: {
    className: "flex items-center py-4 px-5",
  },

  icon: {
    className: classNames("w-5 h-5 text-lg mr-3"),
  },

  text: {
    className: "text-sm flex flex-col flex-1 ml-2",
  },

  summary: {
    className: "font-semibold text-white",
  },

  detail: {
    className: "mt-1 text-gray-300 text-sm",
  },

  closebutton: {
    className: classNames(
      "w-8 h-8 rounded-full bg-transparent transition duration-200",
      "ml-auto flex items-center justify-center",
      "hover:bg-white/10 text-gray-300",
    ),
  },

  transition: {
    enterFromClass: "opacity-0 translate-y-4 scale-95",
    enterActiveClass: "transition-all duration-300 ease-out",
    leaveFromClass: "opacity-100 max-h-40",
    leaveActiveClass: "transition-all duration-300 ease-in",
    leaveToClass: "opacity-0 translate-y-2 scale-95 max-h-0 overflow-hidden",
  },
};

export default ToastTheme;
