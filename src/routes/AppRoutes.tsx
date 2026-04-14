import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Events from "../features/events";
import Auth from "../features/auth";
import User from "../features/users";
import Report from "../features/report";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="auth/*" element={<Auth />} />
      <Route path="events/*" element={<Events />} />
      <Route path="user/*" element={<User/>}/>
      <Route path="reports/*" element={<Report/>}/>
    </Routes>
  );
}

export default AppRoutes;
