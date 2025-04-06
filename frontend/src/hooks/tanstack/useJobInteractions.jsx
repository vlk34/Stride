import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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
// Save a job
export const useSaveJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId) => {
      await axios.post(
        "http://localhost:8080/save",
        { job_id: jobId },
        {
          headers: {
            Authorization: `Bearer ${getSessionToken()}`,
          },
        }
      );
    },
    onSuccess: () => {
      // Invalidate saved jobs query to refresh data
      queryClient.invalidateQueries({ queryKey: ["savedJobs"] });
    },
  });
};

// Unsave a job
export const useUnsaveJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId) => {
      await axios.post(
        "http://localhost:8080/unsave",
        { job_id: jobId },
        {
          headers: {
            Authorization: `Bearer ${getSessionToken()}`,
          },
        }
      );
    },
    onSuccess: () => {
      // Invalidate saved jobs query to refresh data
      queryClient.invalidateQueries({ queryKey: ["savedJobs"] });
    },
  });
};

// Get saved jobs
export const useSavedJobs = () => {
  return useQuery({
    queryKey: ["savedJobs"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:8080/saved", {
        headers: {
          Authorization: `Bearer ${getSessionToken()}`,
        },
      });
      return response.data;
    },
    staleTime: 2 * 60 * 1000,
  });
};

// Apply to a job
export const useApplyToJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (applicationData) => {
      // Extract just the job_id and cv properties needed by the API
      const payload = {
        job_id: applicationData.job_id,
        cv: applicationData.cv, // This is the CV ID from the resume upload
      };

      await axios.post("http://localhost:8080/apply", payload, {
        headers: {
          Authorization: `Bearer ${getSessionToken()}`,
        },
      });
    },
    onSuccess: () => {
      // Invalidate applied jobs query to refresh data
      queryClient.invalidateQueries({ queryKey: ["appliedJobs"] });
    },
  });
};

// Get applied jobs
export const useAppliedJobs = () => {
  return useQuery({
    queryKey: ["appliedJobs"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:8080/applied", {
        headers: {
          Authorization: `Bearer ${getSessionToken()}`,
        },
      });
      return response.data;
    },
    staleTime: 2 * 60 * 1000,
  });
};

// Get job details by ID - update to handle URL-specified jobId better
export const useJobDetails = (jobId) => {
  return useQuery({
    queryKey: ["jobDetails", jobId],
    queryFn: async () => {
      if (!jobId) return null;

      try {
        // Make API request - no authentication required for job details
        const response = await axios.get(
          `http://localhost:8080/details?job=${jobId}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching job details:", error);
        return null;
      }
    },
    enabled: !!jobId, // Only run query if jobId exists
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 1, // Retry once on failure
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  });
};
