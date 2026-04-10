import { useNavigate } from "react-router-dom";
import { useCurrentUserQuery } from "../../auth/queries";

interface EventCardProps {
  event: Master.Events;
}

export const EventCard = ({ event }: EventCardProps) => {
  const navigate = useNavigate();

  const {data : user } = useCurrentUserQuery();

  return (
    <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-transparent hover:from-indigo-500/50 hover:to-purple-500/40 transition">
      <div className="h-full w-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 hover:shadow-xl transition">
        <h3 className="text-lg font-semibold mb-2 text-white">{event.name}</h3>

        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="text-sm text-gray-400 space-y-1 mb-4">
          <p>📅 {event.eventDate}</p>
          <p>🕐 {event.eventTime}</p>
          <p>📍 {event.location}</p>
          <p>👥 Joined: {event.joinedCount}</p>
        </div>

        <button
          onClick={() => {
            if (!user) {
              navigate("/auth/login");
            } else {
              navigate(`/events/join/${event.id}`);
            }
          }}
          className="w-full py-2 text-sm bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 shadow-md transition"
        >
          Join Event
        </button>
      </div>
    </div>
  );
};

export default EventCard;
