import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Get all jobs created by the company
export const useCompanyJobs = () => {
  return useQuery({
    queryKey: ["companyJobs"],
    queryFn: async () => {
      const response = await axios.get("/jobs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      const response = await axios.get(`/applicants?job=${jobId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
      await axios.post("/create", jobData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      const response = await axios.get(`/details?job=${jobId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
      await axios.put("/update", jobData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      await axios.delete("/delete", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
