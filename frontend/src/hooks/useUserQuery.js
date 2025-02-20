import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";

export const USER_QUERY_KEY = ["user-data"];

export function useUserQuery() {
  const { user, isLoaded } = useUser();
  const queryClient = useQueryClient();

  // Query for user data
  const { data: userData, isLoading } = useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: async () => {
      if (!isLoaded || !user) return null;
      return {
        name: user.fullName,
        role: user.unsafeMetadata?.role || "No role set",
        description: user.unsafeMetadata?.description || "No description set",
        about: user.unsafeMetadata?.about || "No about information set",
        experiences: user.unsafeMetadata?.experiences || [],
        education: user.unsafeMetadata?.education || [],
        skills: user.unsafeMetadata?.skills || [],
        imageUrl: user.imageUrl,
        email: user.primaryEmailAddress?.emailAddress,
      };
    },
    enabled: isLoaded && !!user,
  });

  // Mutation for updating profile
  const updateProfileMutation = useMutation({
    mutationFn: async ({ updates, nameUpdate }) => {
      if (nameUpdate) {
        const names = nameUpdate.trim().split(" ");
        // Ensure we always have both first and last name
        const firstName = names[0];
        const lastName = names.length > 1 ? names.slice(1).join(" ") : "."; // Use dot as fallback last name

        await user.update({
          firstName,
          lastName,
        });
      }

      if (Object.keys(updates).length > 0) {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            ...updates,
          },
        });
      }
    },
    onMutate: async ({ updates, nameUpdate }) => {
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEY });
      const previousData = queryClient.getQueryData(USER_QUERY_KEY);

      queryClient.setQueryData(USER_QUERY_KEY, (old) => ({
        ...old,
        ...updates,
        ...(nameUpdate && { name: nameUpdate }),
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

  // Mutation for updating profile image
  const updateImageMutation = useMutation({
    mutationFn: async (file) => {
      if (!file) return null;
      const result = await user.setProfileImage({ file });
      return result;
    },
    onMutate: async (file) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEY });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData(USER_QUERY_KEY);

      // Create a temporary URL for the file
      const tempImageUrl = URL.createObjectURL(file);

      // Optimistically update the cache
      queryClient.setQueryData(USER_QUERY_KEY, (old) => ({
        ...old,
        imageUrl: tempImageUrl,
      }));

      return { previousData, tempImageUrl };
    },
    onError: (err, file, context) => {
      // On error, roll back to the previous value
      queryClient.setQueryData(USER_QUERY_KEY, context.previousData);

      // Cleanup temporary URL
      if (context.tempImageUrl) {
        URL.revokeObjectURL(context.tempImageUrl);
      }
    },
    onSuccess: async (result, file, context) => {
      // Wait a bit to ensure Clerk has processed the image
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Then invalidate the query to get the new image URL
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });

      // Cleanup temporary URL after successful update
      if (context.tempImageUrl) {
        URL.revokeObjectURL(context.tempImageUrl);
      }
    },
    onSettled: (data, error, variables, context) => {
      // Additional cleanup if needed
      if (context.tempImageUrl) {
        URL.revokeObjectURL(context.tempImageUrl);
      }
    },
  });

  return {
    userData,
    isLoading,
    updateProfile: updateProfileMutation.mutate,
    updateExperiences: updateExperiencesMutation.mutate,
    updateEducation: updateEducationMutation.mutate,
    updateSkills: updateSkillsMutation.mutate,
    updateImage: updateImageMutation.mutate,
  };
}
