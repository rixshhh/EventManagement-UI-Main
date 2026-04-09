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
  return useMutation({
    mutationFn: async (data: { name: string; password: string }) => {
      return await ApiServices.post<Master.LoginResponse>("auth/login", data);
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await ApiServices.post("auth/logout",data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["current-user"],
      });
    },
  });
}