import { useNavigate } from "react-router-dom";
import EventCard from "../features/events/components/EventCard";
import { useTodaysEventQuery } from "../features/events/queries";

export default function Home() {
  const navigate = useNavigate();
  const { data = [], isLoading } = useTodaysEventQuery();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100">
      <section className="text-center py-24 px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Discover & Manage <br />
          <span className="text-indigo-400">Amazing Events</span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
          Create, explore, and manage events effortlessly. From tech meetups to
          concerts — everything in one place.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/events/list")}
            className="bg-indigo-500 text-white px-8 py-3 rounded-2xl shadow-lg hover:bg-indigo-600 transition"
          >
            Explore Events
          </button>
          {/* <button
            onClick={() => navigate("/events/filter")}
            className="border border-gray-700 px-8 py-3 rounded-2xl hover:bg-gray-800 transition"
          >
            Browse Event
          </button> */}
        </div>
      </section>

      {/* <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Easy Event Creation",
            desc: "Create and manage events in just a few clicks with a clean UI.",
          },
          {
            title: "Smart Discovery",
            desc: "Find events based on your interests and location.",
          },
          {
            title: "Real-time Updates",
            desc: "Stay updated with live changes and notifications.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-md hover:shadow-xl hover:border-indigo-500/40 transition"
          >
            <h3 className="text-lg font-semibold mb-2 text-white">{f.title}</h3>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </section> */}

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6 tracking-tight text-white">
          Today's Events
        </h2>

        {isLoading ? (
          <p className="text-gray-400">Loading events...</p>
        ) : data.length === 0 ? (
          <p className="text-gray-400">No events available</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        )}
      </section>

      <footer className="text-center py-6 text-sm text-gray-500 border-t border-gray-800">
        © {new Date().getFullYear()} EventHub. All rights reserved.
      </footer>
    </div>
  );
}
