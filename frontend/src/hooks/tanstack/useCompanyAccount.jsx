import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Upgrade to a business account
export const useUpgradeAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (companyData) => {
      await axios.post("/upgrade", companyData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    },
    onSuccess: () => {
      // Invalidate user profile data and other relevant queries
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
};

// Downgrade from business account
export const useDowngradeAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (companyData) => {
      await axios.post("/descend", companyData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    },
    onSuccess: () => {
      // Invalidate user profile data and other relevant queries
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
};

// Get company statistics
export const useCompanyStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await axios.get("/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
