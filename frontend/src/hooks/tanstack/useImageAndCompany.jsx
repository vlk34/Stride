import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Get image by ID
export const useImage = (imageId) => {
  return useQuery({
    queryKey: ["image", imageId],
    queryFn: async () => {
      const response = await axios.get(`/images/${imageId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: "blob",
      });
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
      formData.append("image", imageFile);

      const response = await axios.post("/images/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
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
      const response = await axios.get(`/companies/${companyId}`);
      return response.data;
    },
    enabled: !!companyId,
    staleTime: 10 * 60 * 1000,
  });
};
