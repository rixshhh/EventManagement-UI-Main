import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiServices } from "../../services";

export function useCurrentUserQuery() {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      return await ApiServices.get<Master.User>("auth/me");
    },
    retry: false,
  });
}

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; password: string }) => {
      return await ApiServices.post<Master.LoginResponse>("auth/login", data);
    },
    onSuccess: async () => {
      const user = await ApiServices.get<Master.User>("auth/me");

     queryClient.setQueryData(["current-user"], user);
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await ApiServices.post("auth/logout", {});
    },
    onSuccess: async () => {
    queryClient.setQueryData(["current-user"], null);

    queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });
}
