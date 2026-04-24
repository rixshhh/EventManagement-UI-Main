import { useDashboardQuery } from "../queries";

export default function Dashboard() {
  const { data, isLoading, isError } = useDashboardQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-28 px-6 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen pt-28 px-6 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto">Failed to load report.</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen pt-28 px-6 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto">Data not found</div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Events",
      value: data.totalEvents,
      color: "text-white",
    },
    {
      title: "Total Users",
      value: data.totalUsers,
      color: "text-white",
    },
    {
      title: "Active Events",
      value: data.activeEvents,
      color: "text-green-400",
    },
    {
      title: "Expired Events",
      value: data.expiredEvents,
      color: "text-red-400",
    },
  ];

  return (
    <div className="min-h-screen pt-28 px-6 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Report</h1>
          <p className="text-gray-400 mt-1">
            Overview of events, users and activity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-gray-400">{stat.title}</h2>
              <p className={`text-3xl font-bold mt-2 ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-lg">
          <div className="p-5 border-b border-white/10">
            <h2 className="text-xl font-semibold">Event Reports</h2>
          </div>

          <table className="w-full">
            <thead className="bg-white/5 text-gray-300">
              <tr>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Event Name</th>
                <th className="text-left p-4">Joined Users</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.eventReports.map((event) => (
                <tr
                  key={event.eventId}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-4">{event.eventId}</td>
                  <td className="p-4">{event.eventName}</td>
                  <td className="p-4">{event.joinedUsers}</td>
                  <td className="p-4">
                    {new Date(event.eventDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        event.status === "Active"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
