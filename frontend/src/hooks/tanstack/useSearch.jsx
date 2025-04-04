import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useSearch = (searchParams) => {
  // Extract parameters from searchParams
  const { query, workstyle, type, industry, experience } = searchParams || {};

  return useQuery({
    queryKey: ["jobSearch", { query, workstyle, type, industry, experience }],
    queryFn: async () => {
      try {
        // Build query parameters
        const params = new URLSearchParams();
        if (query) params.append("q", query);
        if (workstyle) params.append("workstyle", workstyle.toLowerCase());
        if (type) params.append("jobtype", type.toLowerCase());
        if (industry) params.append("industry", industry.toLowerCase());
        if (experience) params.append("experience", experience.toLowerCase());

        // Make API request
        const response = await axios.get(
          `http://localhost:8080/search?${params.toString()}`
        );
        // Ensure we always return an array
        return Array.isArray(response.data) ? response.data : [];
      } catch (error) {
        console.error("Search error:", error);
        return []; // Return empty array on error
      }
    },
    // Don't auto-fetch if no parameters are provided
    enabled: Boolean(query || workstyle || type || industry || experience),
    // Cache the results for 5 minutes
    staleTime: 5 * 60 * 1000,
    // Retry up to 1 time if request fails
    retry: 1,
  });
};

export const useRecommendedJobs = () => {
  return useQuery({
    queryKey: ["recommendedJobs"],
    queryFn: async () => {
      const response = await axios.get("/recommended", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
