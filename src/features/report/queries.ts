import { useQuery } from "@tanstack/react-query";
import { ApiServices } from "../../services";

const QUERY_KEY = ["dashboard"];

export function useDashboardQuery() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      return await ApiServices.get<Master.DashboardReport>(
        "report/dashboard",
      );
    },
  });
}
