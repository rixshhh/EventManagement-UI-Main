import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

export default function Report() {
  return (
    <>
      <Routes>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}
