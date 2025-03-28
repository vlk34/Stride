import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Save a job
export const useSaveJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId) => {
      await axios.post(
        "/save",
        { job_id: jobId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        "/unsave",
        { job_id: jobId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      const response = await axios.get("/saved", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    mutationFn: async (jobId) => {
      await axios.post(
        "/apply",
        { job_id: jobId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
      const response = await axios.get("/applied", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    },
    staleTime: 2 * 60 * 1000,
  });
};
