/**
 * Privacy Policy Hooks
 * Fetches privacy policies from the Django backend API
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { privacyPolicyService } from "@/services/admin/privacyPolicyService";
import { PrivacyPolicyFormData } from "@/types/admin/privacyPolicy";
import { toast } from "@/hooks/use-toast";

export const usePrivacyPolicy = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-privacy-policies"],
    queryFn: () => privacyPolicyService.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (formData: PrivacyPolicyFormData) => privacyPolicyService.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-privacy-policies"] });
      toast({
        title: "Succès",
        description: "Politique de confidentialité créée avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la création",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: PrivacyPolicyFormData }) =>
      privacyPolicyService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-privacy-policies"] });
      toast({
        title: "Succès",
        description: "Politique de confidentialité mise à jour avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la mise à jour",
        variant: "destructive",
      });
    },
  });

  const createPrivacyPolicy = (formData: PrivacyPolicyFormData, options?: { onSuccess?: () => void }) => {
    return createMutation.mutate(formData, options);
  };

  const updatePrivacyPolicy = (id: number, formData: PrivacyPolicyFormData, options?: { onSuccess?: () => void }) => {
    return updateMutation.mutate({ id, data: formData }, options);
  };

  return {
    privacyPolicies: data || [],
    isLoading,
    error,
    refetch,
    createPrivacyPolicy,
    updatePrivacyPolicy,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
};
