import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Helper function to get the session token from cookie
const getSessionToken = () => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("__session=")) {
      return cookie.substring("__session=".length, cookie.length);
    }
  }
  return null;
};

// Get company details by ID
export const useCompanyDetails = (companyId) => {
  return useQuery({
    queryKey: ["companyDetails", companyId],
    queryFn: async () => {
      if (!companyId) return null;

      const sessionToken = getSessionToken();
      const response = await axios.get(
        `http://localhost:8080/company/${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );
      return response.data;
    },
    enabled: !!companyId, // Only run the query if companyId exists
    staleTime: 5 * 60 * 1000,
  });
};

// Get admin statistics
export const useAdminStats = () => {
  return useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const sessionToken = getSessionToken();
      const response = await axios.get("http://localhost:8080/adminstats", {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
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
      const sessionToken = getSessionToken();
      const response = await axios.get("http://localhost:8080/users", {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
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
      const sessionToken = getSessionToken();
      const response = await axios.get("http://localhost:8080/applications", {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      return Array.isArray(response.data) ? response.data : [];
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Update user (admin only)
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData) => {
      const sessionToken = getSessionToken();
      await axios.patch("http://localhost:8080/updateuser", userData, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
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
      const sessionToken = getSessionToken();
      await axios.post(
        "http://localhost:8080/upgradeuser",
        { user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
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

// Decline business application (admin only)
export const useDeclineBusinessApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => {
      const sessionToken = getSessionToken();
      await axios.post(
        "http://localhost:8080/declineupgrade",
        { user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );
    },
    onSuccess: () => {
      // Invalidate business applications list
      queryClient.invalidateQueries({ queryKey: ["businessApplications"] });
    },
  });
};
