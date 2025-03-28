import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Get admin statistics
export const useAdminStats = () => {
  return useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const response = await axios.get("/adminstats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Get all users (admin only)
export const useAllUsers = () => {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const response = await axios.get("/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Get all business applications
export const useBusinessApplications = () => {
  return useQuery({
    queryKey: ["businessApplications"],
    queryFn: async () => {
      const response = await axios.get("/applications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Update user (admin only)
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData) => {
      await axios.patch("/updateuser", userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    },
    onSuccess: () => {
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
  });
};

// Upgrade user to business (admin only)
export const useUpgradeUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => {
      await axios.post(
        "/upgradeuser",
        { user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    },
    onSuccess: () => {
      // Invalidate users list and business applications
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      queryClient.invalidateQueries({ queryKey: ["businessApplications"] });
    },
  });
};
