import { Navigate, Route, Routes } from "react-router-dom";
import EventsList from "./pages/EventList";
import Filter from "./pages/Filter";
import JoinEvent from "./pages/JoinEvent";
import CreateEvent from "./pages/Create";

export default function Events() {
  return (
    <Routes>
      <Route index element={<Navigate to="list" />} />

      <Route path="list" element={<EventsList />}>
        <Route
          path="create"
          element={
            <CreateEvent isOpen={true} onClose={() => window.history.back()} />
          }
        />
      </Route>

      <Route path="filter" element={<Filter />} />
      <Route path="join/:id" element={<JoinEvent />} />
    </Routes>
  );
}
