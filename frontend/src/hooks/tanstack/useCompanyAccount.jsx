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

// Upgrade to a business account
export const useUpgradeAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (companyData) => {
      try {
        // Get the token from the cookie
        const token = getSessionToken();

        if (!token) {
          throw new Error("Session token not found");
        }

        console.log(token);
        const response = await axios.post(
          "http://localhost:8080/upgrade",
          companyData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        return response.data;
      } catch (error) {
        // Log more detailed error information
        console.error("API Error Details:", error.response?.data);
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate user profile data and other relevant queries
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
    onError: (error) => {
      console.error("Error upgrading account:", error);
    },
  });
};

// Downgrade from business account
export const useDowngradeAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (companyData) => {
      const token = getSessionToken();

      if (!token) {
        throw new Error("Session token not found");
      }

      const response = await axios.post(
        "http://localhost:8080/descend",
        companyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    },
    onSuccess: () => {
      // Invalidate user profile data and other relevant queries
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
    onError: (error) => {
      console.error("Error downgrading account:", error);
    },
  });
};

// Get company statistics
export const useCompanyStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const token = getSessionToken();

      if (!token) {
        throw new Error("Session token not found");
      }

      const response = await axios.get("http://localhost:8080/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Get job applicants using path parameter
export const useJobApplicants = (jobId) => {
  return useQuery({
    queryKey: ["jobApplicants", jobId],
    queryFn: async () => {
      const token = getSessionToken();
      if (!token) {
        throw new Error("Session token not found");
      }

      // Use the path parameter endpoint
      const response = await axios.get(
        `http://localhost:8080/applicants/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    enabled: !!jobId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Get applicant details by job ID and user ID
export const useApplicantDetails = (jobId, userId) => {
  return useQuery({
    queryKey: ["applicantDetails", jobId, userId],
    queryFn: async () => {
      const token = getSessionToken();
      if (!token) {
        throw new Error("Session token not found");
      }

      const response = await axios.get(
        `http://localhost:8080/applicants/${jobId}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    enabled: !!jobId && !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
