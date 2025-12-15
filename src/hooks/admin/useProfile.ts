/**
 * Profile Hooks
 * Fetches admin profile from the Django backend API
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminProfile, updateAdminProfile } from "@/services/admin/profileService";
import { UpdateProfilePayload } from "@/types/admin/profile";
import { toast } from "sonner";

export const useProfile = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-profile"],
    queryFn: getAdminProfile,
  });

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateAdminProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-profile"] });
      toast.success("Profil mis à jour avec succès");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Échec de la mise à jour du profil");
    },
  });

  const updateProfile = async (payload: UpdateProfilePayload) => {
    return updateMutation.mutateAsync(payload);
  };

  return {
    profile: data,
    isLoading,
    error,
    refetch,
    updateProfile,
    isUpdating: updateMutation.isPending,
  };
};
