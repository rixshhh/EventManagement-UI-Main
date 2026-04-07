import { Toaster } from "sonner";
import "./App.css";
import Navbar from "./layout/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
    <Toaster
        position="bottom-right"
        richColors
        theme="dark"
        toastOptions={{
          className:
            "!bg-white/10 !backdrop-blur-xl !border !border-white/10 !text-white !rounded-2xl",
        }}
      />
      <Navbar />
      <AppRoutes />
    </>
  );
}

export default App;
