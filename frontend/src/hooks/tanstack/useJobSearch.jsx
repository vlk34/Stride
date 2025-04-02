import { useQuery } from "@tanstack/react-query";
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

// Fetch all available jobs for the search results
export const useAllJobs = () => {
  return useQuery({
    queryKey: ["allJobs"],
    queryFn: async () => {
      const token = getSessionToken();
      const response = await axios.get("http://localhost:8080/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Map the response data to match the expected job format
      const jobsData = Array.isArray(response.data) ? response.data : [];
      return jobsData.map((job) => ({
        id: job.job_id,
        title: job.title,
        company: job.company,
        companyLogo: job.logo
          ? `http://localhost:8080/images/${job.logo}`
          : "https://via.placeholder.com/150",
        location: job.location,
        type: job.job_type,
        workstyle: job.workstyle,
        isVerified: true,
        overview: job.description || "",
        responsibilities: job.responsibilities
          ? job.responsibilities.split("\n").filter((r) => r.trim())
          : [],
        about: job.description || "",
        industry: job.department || "",
        experience: job.experience || "",
        qualifications: job.qualifications || "",
        languages: job.languages || [],
        skills: job.skills || [],
        education: job.education || "",
        deadline: job.deadline || "",
        created_at: job.start || "",
        openings: job.openings || 1,
      }));
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
