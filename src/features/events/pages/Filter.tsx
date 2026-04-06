import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFilterEventsMutation } from "../queries";
import EventCard from "../components/EventCard";

type FilterForm = {
  eventDate?: string;
  eventCategoryId?: number;
};

export const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<FilterForm>();
  const { mutate, data = [], isPending } = useFilterEventsMutation();

  const onSubmit = (formData: FilterForm) => {
    mutate({
      eventDate: formData.eventDate || undefined,
      eventCategoryId: formData.eventCategoryId
        ? Number(formData.eventCategoryId)
        : undefined,
    });
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen pt-24 px-6 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Browse Events</h2>

          <button
            onClick={() => setIsOpen(true)}
            className="bg-indigo-500 hover:bg-indigo-600 px-5 py-2 rounded-xl transition"
          >
            Filter Events
          </button>
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Filter Events</h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                  type="date"
                  {...register("eventDate")}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-gray-300 focus:outline-none focus:border-indigo-500"
                />

                <input
                  type="number"
                  placeholder="Category Id"
                  {...register("eventCategoryId")}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-gray-300 focus:outline-none focus:border-indigo-500"
                />

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      reset();
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-500 rounded-xl hover:bg-indigo-600 transition"
                  >
                    {isPending ? "Loading..." : "Apply"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isPending ? (
          <p className="text-gray-400">Loading events...</p>
        ) : data.length === 0 ? (
          <p className="text-gray-400">No events found</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((e: Master.Events) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
