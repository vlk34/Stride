import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Get image by ID
export const useImage = (imageId) => {
  return useQuery({
    queryKey: ["image", imageId],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8080/images/${imageId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "blob",
        }
      );
      return URL.createObjectURL(response.data);
    },
    enabled: !!imageId,
    staleTime: 24 * 60 * 60 * 1000, // Images can be cached for longer periods
  });
};

// Upload an image
export const useUploadImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (imageFile) => {
      const formData = new FormData();
      formData.append("file", imageFile);

      const response = await axios.post(
        "http://localhost:8080/images/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      // No need to invalidate any queries as this is a new upload
    },
  });
};

// Get CV/Resume by ID
export const useResume = (resumeId) => {
  return useQuery({
    queryKey: ["resume", resumeId],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8080/resume/${resumeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "blob",
        }
      );
      return URL.createObjectURL(response.data);
    },
    enabled: !!resumeId,
    staleTime: 24 * 60 * 60 * 1000, // Resumes can be cached for longer periods
  });
};

// Upload a CV/Resume
export const useUploadResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (pdfFile) => {
      const formData = new FormData();
      formData.append("file", pdfFile);

      const response = await axios.post(
        "http://localhost:8080/resume/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      // No need to invalidate any queries as this is a new upload
    },
  });
};

// Get company details
export const useCompanyDetails = (companyId) => {
  return useQuery({
    queryKey: ["companyDetails", companyId],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8080/company/${companyId}`
      );
      return response.data;
    },
    enabled: !!companyId,
    staleTime: 10 * 60 * 1000,
  });
};
