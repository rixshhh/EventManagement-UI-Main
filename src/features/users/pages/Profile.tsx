import { useEffect, useState } from "react";
import { ApiServices } from "../../../services";

export default function Profile() {
  const [data, setData] = useState<Master.UserProfile>();
  const [isLoading, setIsLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!user.id) return;

    ApiServices.get<Master.UserProfile>(`users/${user.id}/events`)
      .then(setData)
      .finally(() => setIsLoading(false));
  }, [user.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white pt-24 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-3xl font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight">{user.name}</h1>
                <p className="text-gray-400 mt-1">Welcome back to your event dashboard</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 min-w-[280px]">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-sm text-gray-400">Joined Events</p>
                <p className="text-3xl font-bold text-indigo-400">{data?.totalJoinedEvents ?? 0}</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <p className="text-sm text-gray-400">Profile ID</p>
                <p className="text-3xl font-bold">#{user.id}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Joined Events</h2>
              <p className="text-gray-400 text-sm mt-1">Track all events you are participating in</p>
            </div>
          </div>

          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-44 rounded-2xl bg-white/5 animate-pulse border border-white/10" />
              ))}
            </div>
          ) : !data?.joinedEvents?.length ? (
            <div className="text-center py-20 rounded-2xl border border-dashed border-white/10 bg-white/5">
              <p className="text-xl text-gray-300">No joined events yet</p>
              <p className="text-gray-500 mt-2">Explore events and start joining amazing sessions 🚀</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.joinedEvents.map((event) => (
                <div
                  key={event.id}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 shadow-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold line-clamp-1">{event.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/20">
                      Joined
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm line-clamp-2 min-h-[40px]">
                    {event.description}
                  </p>

                  <div className="mt-5 space-y-2 text-sm">
                    <p>📅 {event.eventDate}</p>
                    <p>⏰ {event.eventTime}</p>
                    <p>📍 {event.location}</p>
                  </div>

                  <button className="mt-5 w-full rounded-xl bg-indigo-500/20 border border-indigo-400/20 py-2 text-sm font-medium hover:bg-indigo-500/30 transition">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
