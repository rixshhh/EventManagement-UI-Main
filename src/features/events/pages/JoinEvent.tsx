import { useNavigate, useParams } from "react-router-dom";
import { useGetEventById, useJoinEventMutations } from "../queries";
import { toast } from "sonner";

export default function JoinEvent() {
  const { id } = useParams();

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { data, isLoading } = useGetEventById(Number(id));

  const { mutate, isPending } = useJoinEventMutations();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 px-6 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto">Loading event...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen pt-24 px-6 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto">Event not found</div>
      </div>
    );
  }

  const handleJoin = () => {
    if (!user?.id) {
      navigate("/auth/login");
      return;
    }

    mutate(
      {
        userId: user.id,
        eventId: Number(id),
      },
      {
        onSuccess: () => {
          toast.success("Event joined successfully.");
          navigate("/user/profile");
        },
        onError : () => {
          toast.error("You have already joined this event.")
        }
      },
    );
  };

  return (
    <>
      <div className="min-h-screen pt-24 px-6 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tight">
                  {data.name}
                </h1>
                <p className="text-gray-400">{data.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 min-w-[320px]">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-sm text-gray-400">Event ID</p>
                  <p className="text-3xl font-bold text-indigo-400">
                    #{data.id}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-sm text-gray-400">Total Member Joined</p>
                  <p className="text-3xl font-bold text-indigo-400">
                    {data.joinedCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mt-8 grid sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <p className="text-gray-400 text-sm">📅 Date</p>
                <p className="text-lg font-semibold mt-2">{data.eventDate}</p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <p className="text-gray-400 text-sm">⏰ Time</p>
                <p className="text-lg font-semibold mt-2">{data.eventTime}</p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <p className="text-gray-400 text-sm">📍 Venue</p>
                <p className="text-lg font-semibold mt-2">{data.location}</p>
              </div>
            </div>

            <div className="relative mt-8">
              <button
                onClick={handleJoin}
                className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600 transition text-white font-semibold shadow-lg"
              >
                {isPending ? "Joining..." : "Join"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
