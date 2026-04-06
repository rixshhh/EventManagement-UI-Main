import { Navigate, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";

export default function User() {
  return (
    <>
      <Routes>
        <Route index element={<Navigate to="profile" />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </>
  );
}
