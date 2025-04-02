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

// Get all jobs created by the company
export const useCompanyJobs = () => {
  return useQuery({
    queryKey: ["companyJobs"],
    queryFn: async () => {
      const token = getSessionToken();
      const response = await axios.get("http://localhost:8080/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    staleTime: 2 * 60 * 1000,
  });
};

// Get applicants for a specific job
export const useJobApplicants = (jobId) => {
  return useQuery({
    queryKey: ["jobApplicants", jobId],
    queryFn: async () => {
      const token = getSessionToken();
      const response = await axios.get(
        `http://localhost:8080/applicants?job=${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    enabled: !!jobId,
    staleTime: 1 * 60 * 1000,
  });
};

// Create a new job listing
export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobData) => {
      const token = getSessionToken();
      await axios.post("http://localhost:8080/create", jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      // Invalidate company jobs query to refresh data
      queryClient.invalidateQueries({ queryKey: ["companyJobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
};

// Get job details
export const useJobDetails = (jobId) => {
  return useQuery({
    queryKey: ["jobDetails", jobId],
    queryFn: async () => {
      const token = getSessionToken();
      const response = await axios.get(
        `http://localhost:8080/details?job=${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    enabled: !!jobId,
    staleTime: 5 * 60 * 1000,
  });
};

// Update an existing job
export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobData) => {
      const token = getSessionToken();
      await axios.put("http://localhost:8080/update", jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
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
  });
};

// Delete a job
export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId) => {
      const token = getSessionToken();
      await axios.delete("http://localhost:8080/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { job_id: jobId },
      });
    },
    onSuccess: () => {
      // Invalidate company jobs query to refresh data
      queryClient.invalidateQueries({ queryKey: ["companyJobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
};
