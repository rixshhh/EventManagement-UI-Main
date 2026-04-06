import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiServices } from "../../services";

const QUERY_KEY = ["events"];

const CATEGORY_QUERY_KEY = ["category"];

export function useCategoryQuery() {
  return useQuery({
    queryKey: CATEGORY_QUERY_KEY,
    queryFn: async () => {
      return await ApiServices.get<Master.Category[]>("categories");
    },
  });
}

export function useEventQuery() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      return await ApiServices.get<Master.Events[]>("events");
    },
  });
}

export function useGetEventById(eventId: number) {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      return await ApiServices.get<Master.Events>(`events/${eventId}`);
    },
    enabled: !!eventId,
  });
}

export function useJoinEventMutations() {
  return useMutation({
    mutationFn: async (data: Master.JoinEvent) => {
      return await ApiServices.post("events/join", data);
    },
  });
}

export function useTodaysEventQuery() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      return await ApiServices.get<Master.Events[]>("events/today");
    },
  });
}

export function useFilterEventsMutation() {
  return useMutation({
    mutationFn: async (event: {
      eventDate?: string;
      eventCategoryId?: number;
    }) => {
      return await ApiServices.post<Master.Events[]>("events/filter", event);
    },
  });
}

export default function useCreateEventMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (event: Master.EventForm) => {
      return await ApiServices.post<Master.Events>("events", event);
    },
    onSuccess: (result: Master.Events) => {
      if (!result) {
        return;
      }

      const existingEvents =
        queryClient.getQueryData<Master.Events[]>(QUERY_KEY);

      if (!existingEvents) return;
      queryClient.setQueryData<Master.Events[]>(QUERY_KEY, [
        ...existingEvents,
        result,
      ]);
    },
  });
}
