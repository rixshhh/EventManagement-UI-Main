import { useEventQuery } from "../queries";
import EventCard from "../components/EventCard";
import { Outlet, useNavigate } from "react-router-dom";

export const EventsPage = () => {
  const { data = [], isLoading } = useEventQuery();

  // const [isCreateOpen, setIsCreateOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 px-6 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Events</h2>

          <button
            onClick={() => navigate("create")}
            className="bg-indigo-500 hover:bg-indigo-600 px-5 py-2 rounded-xl transition"
          >
            + Create Event
          </button>
        </div>

        {isLoading ? (
          <p className="text-gray-400">Loading events...</p>
        ) : data.length === 0 ? (
          <p className="text-gray-400">No events found</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
            {data.map((e: Master.Events) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        )}
      </div>
      <Outlet/>
    </div>
  );
};

export default EventsPage;
