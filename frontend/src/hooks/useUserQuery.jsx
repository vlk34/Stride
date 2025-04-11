import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

export const USER_QUERY_KEY = ["user-data"];
export const NOTIFICATIONS_QUERY_KEY = ["notifications"];

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

export function useUserQuery() {
  const { user, isLoaded } = useUser();
  const queryClient = useQueryClient();

  // Query for user data
  const { data: userData, isLoading } = useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: async () => {
      if (!isLoaded || !user) return null;
      return {
        role: user.unsafeMetadata?.role || "No role set",
        description: user.unsafeMetadata?.description || "No description set",
        about: user.unsafeMetadata?.about || "No about information set",
        experiences: user.unsafeMetadata?.experiences || [],
        education: user.unsafeMetadata?.education || [],
        skills: user.unsafeMetadata?.skills || [],
        email: user.primaryEmailAddress?.emailAddress,
      };
    },
    enabled: isLoaded && !!user,
    staleTime: 1000,
  });

  // Query for user notifications
  const {
    data: notifications,
    isLoading: isLoadingNotifications,
    refetch: refetchNotifications,
  } = useQuery({
    queryKey: NOTIFICATIONS_QUERY_KEY,
    queryFn: async () => {
      if (!isLoaded || !user) return [];
      try {
        const response = await axios.get(
          "http://localhost:8080/notifications",
          {
            headers: {
              Authorization: `Bearer ${getSessionToken()}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching notifications:", error);
        return [];
      }
    },
    enabled: isLoaded && !!user,
    staleTime: 60000, // 1 minute
  });

  // Mutation for updating profile
  const updateProfileMutation = useMutation({
    mutationFn: async ({ updates }) => {
      if (Object.keys(updates).length > 0) {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            ...updates,
          },
        });
      }
    },
    onMutate: async ({ updates }) => {
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEY });
      const previousData = queryClient.getQueryData(USER_QUERY_KEY);

      queryClient.setQueryData(USER_QUERY_KEY, (old) => ({
        ...old,
        ...updates,
      }));

      return { previousData };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(USER_QUERY_KEY, context.previousData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });

  // Mutation for updating experiences
  const updateExperiencesMutation = useMutation({
    mutationFn: async (experiences) => {
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          experiences,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });

  // Mutation for updating education
  const updateEducationMutation = useMutation({
    mutationFn: async (education) => {
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          education,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });

  // Mutation for updating skills
  const updateSkillsMutation = useMutation({
    mutationFn: async (skills) => {
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          skills,
        },
      });
    },
    onMutate: async (newSkills) => {
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEY });
      const previousData = queryClient.getQueryData(USER_QUERY_KEY);

      queryClient.setQueryData(USER_QUERY_KEY, (old) => ({
        ...old,
        skills: newSkills,
      }));

      return { previousData };
    },
    onError: (err, newSkills, context) => {
      queryClient.setQueryData(USER_QUERY_KEY, context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });

  return {
    userData,
    isLoading,
    notifications: notifications || [],
    isLoadingNotifications,
    refetchNotifications,
    updateProfile: updateProfileMutation.mutate,
    updateExperiences: updateExperiencesMutation.mutate,
    updateEducation: updateEducationMutation.mutate,
    updateSkills: updateSkillsMutation.mutate,
  };
}
