import { useMutation } from "@tanstack/react-query";
import { ApiServices } from "../../services";

// export function useFilterEventsMutation() {
//   return useMutation({
//     mutationFn: async (event: {
//       eventDate?: string;
//       eventCategoryId?: number;
//     }) => {
//       return await ApiServices.post<Master.Events[]>("events/filter", event);
//     },
//   });
// }

export default function useLoginMutation() {
  return useMutation({
    mutationFn: async (data: { name: string; password: string }) => {
      return await ApiServices.post<Master.LoginResponse>("auth/login", data);
    },
  });
}
