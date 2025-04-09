import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

// Get company statistics
export const useCompanyStats = () => {
  return useQuery({
    queryKey: ["companyStats"],
    queryFn: async () => {
      const sessionToken = getSessionToken();
      if (!sessionToken) {
        throw new Error("Session token not found");
      }

      const response = await axios.get("http://localhost:8080/stats", {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get company jobs
export const useCompanyJobs = () => {
  return useQuery({
    queryKey: ["companyJobs"],
    queryFn: async () => {
      const sessionToken = getSessionToken();
      if (!sessionToken) {
        throw new Error("Session token not found");
      }

      const response = await axios.get("http://localhost:8080/jobs", {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Get job applicants
export const useJobApplicants = (jobId) => {
  return useQuery({
    queryKey: ["jobApplicants", jobId],
    queryFn: async () => {
      const sessionToken = getSessionToken();
      if (!sessionToken) {
        throw new Error("Session token not found");
      }

      const response = await axios.get(
        `http://localhost:8080/applicants/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );
      return response.data;
    },
    enabled: !!jobId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

// Get recent applicants
export const useRecentApplicants = (limit = 5) => {
  return useQuery({
    queryKey: ["recentApplicants"],
    queryFn: async () => {
      const sessionToken = getSessionToken();
      if (!sessionToken) {
        throw new Error("Session token not found");
      }

      const response = await axios.get(
        "http://localhost:8080/recentapplicants",
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );

      // Return the API response directly without modifying it
      return response.data || [];
    },
    staleTime: 2 * 60 * 1000,
  });
};

// Get recent jobs (uses the dedicated endpoint)
export const useRecentJobs = (limit = 5) => {
  return useQuery({
    queryKey: ["recentJobs"],
    queryFn: async () => {
      const sessionToken = getSessionToken();
      if (!sessionToken) {
        throw new Error("Session token not found");
      }

      const response = await axios.get("http://localhost:8080/recentjobs", {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      // Return raw data
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Delete a job
export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId) => {
      const sessionToken = getSessionToken();
      if (!sessionToken) {
        throw new Error("Session token not found");
      }

      await axios.delete("http://localhost:8080/delete", {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
        data: { job_id: jobId },
      });
    },
    onSuccess: () => {
      // Invalidate company jobs query to refresh data
      queryClient.invalidateQueries({ queryKey: ["companyJobs"] });
      queryClient.invalidateQueries({ queryKey: ["companyStats"] });
    },
    onError: (error) => {
      console.error("Error deleting job:", error);
    },
  });
};

// Helper function to format relative time (make it accessible)
export const getRelativeTime = (timestamp) => {
  if (!timestamp) return "Unknown";

  const now = new Date();
  const pastDate = new Date(timestamp);
  const diffInSeconds = Math.floor((now - pastDate) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
};

// Helper function to format time remaining until deadline
export const getTimeRemaining = (deadline) => {
  if (!deadline) return "No deadline";

  const now = new Date();
  const deadlineDate = new Date(deadline);

  // If deadline has passed
  if (deadlineDate < now) {
    return "Expired";
  }

  const diffInSeconds = Math.floor((deadlineDate - now) / 1000);
  const diffInDays = Math.floor(diffInSeconds / 86400);

  if (diffInDays < 1) {
    const diffInHours = Math.floor(diffInSeconds / 3600);
    if (diffInHours < 1) {
      return "Less than an hour left";
    }
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} left`;
  }
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} left`;
  }
  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} left`;
  }
  const months = Math.floor(diffInDays / 30);
  return `${months} month${months > 1 ? "s" : ""} left`;
};

// Get job details by ID
export const useJobDetails = (jobId) => {
  return useQuery({
    queryKey: ["jobDetails", jobId],
    queryFn: async () => {
      const sessionToken = getSessionToken();
      if (!sessionToken) {
        throw new Error("Session token not found");
      }

      console.log(`Fetching job details for job ID: ${jobId}`); // Debug log

      const response = await axios.get(
        `http://localhost:8080/details?job=${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );
      console.log("Job details response:", response.data); // Debug log
      return response.data;
    },
    enabled: !!jobId, // Only run query if jobId exists
    staleTime: 5 * 60 * 1000,
  });
};

// Update job
export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobData) => {
      const sessionToken = getSessionToken();
      if (!sessionToken) {
        throw new Error("Session token not found");
      }

      await axios.put("http://localhost:8080/update", jobData, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: (_, variables) => {
      // Invalidate specific job details and company jobs list
      queryClient.invalidateQueries({
        queryKey: ["jobDetails", variables.job_id],
      });
      queryClient.invalidateQueries({ queryKey: ["companyJobs"] });
    },
    onError: (error) => {
      console.error("Error updating job:", error);
    },
  });
};

// Get all applicants for the business
export const useAllApplicants = () => {
  return useQuery({
    queryKey: ["allApplicants"],
    queryFn: async () => {
      const sessionToken = getSessionToken();
      if (!sessionToken) {
        throw new Error("Session token not found");
      }

      const response = await axios.get("http://localhost:8080/applicants", {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
