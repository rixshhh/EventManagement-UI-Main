import { useForm, Controller } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import useCreateEventMutation from "../queries";
import { ApiServices } from "../../../services";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Categories {
  id: number;
  name: string;
}

export const CreateEvent = ({ isOpen, onClose }: CreateEventModalProps) => {
  const [users, setUser] = useState<Master.User[]>([]);

  const [categories, setCategories] = useState<Categories[]>([]);

  const { register, handleSubmit, control, reset } =
    useForm<Master.EventForm>();

  const { mutate, isPending } = useCreateEventMutation();

  const onSubmit = (data: Master.EventForm) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Event created successfully.")
        reset();
        onClose();
      },
    });
  };

  const fetchCategories = () => {
    ApiServices.get<Categories[]>("categories").then(setCategories);
  };

  const fetchUser = () => {
    ApiServices.get<Master.User[]>("users").then(setUser);
  };

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      fetchUser();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-white">Create Event</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            placeholder="Event Name"
            {...register("name", { required: true })}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-gray-200 focus:outline-none focus:border-indigo-500"
          />

          <textarea
            placeholder="Description"
            {...register("description")}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-gray-200 focus:outline-none focus:border-indigo-500"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              {...register("eventDate", { required: true })}
              className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-gray-200"
            />

            <input
              type="time"
              {...register("eventTime", { required: true })}
              className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-gray-200"
            />
          </div>

          <input
            placeholder="Location"
            {...register("location")}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-gray-200"
          />

          <Controller
            name="eventCategoryId"
            control={control}
            render={({ field }) => (
              <Dropdown
                {...field}
                options={categories}
                optionLabel="name"
                optionValue="id"
                placeholder="Select Category"
                className="w-full bg-white/5 border border-white/10 rounded-xl text-gray-200"
                onChange={(e) => field.onChange(e.value)}
              />
            )}
          />

          <Controller
            name="userId"
            control={control}
            render={({ field }) => (
              <Dropdown
                {...field}
                options={users}
                optionLabel="name"
                optionValue="id"
                placeholder="Select User"
                className="w-full bg-white/5 border border-white/10 rounded-xl text-gray-200"
                onChange={(e) => field.onChange(e.value)}
              />
            )}
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 rounded-xl hover:bg-indigo-600 transition"
            >
              {isPending ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
