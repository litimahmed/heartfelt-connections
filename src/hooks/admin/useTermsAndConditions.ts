/**
 * Terms and Conditions Hooks
 * Fetches terms and conditions from the Django backend API
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { termsAndConditionsService } from "@/services/admin/termsAndConditionsService";
import { TermsAndConditionsFormData } from "@/types/admin/termsAndConditions";
import { toast } from "@/hooks/use-toast";

export const useTermsAndConditions = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-terms-and-conditions"],
    queryFn: () => termsAndConditionsService.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (formData: TermsAndConditionsFormData) =>
      termsAndConditionsService.create(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-terms-and-conditions"] });
      toast({
        title: "Succès",
        description: "Conditions générales créées avec succès",
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
    mutationFn: ({
      conditionId,
      data,
    }: {
      conditionId: string;
      data: TermsAndConditionsFormData;
    }) => termsAndConditionsService.update(conditionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-terms-and-conditions"] });
      toast({
        title: "Succès",
        description: "Conditions générales mises à jour avec succès",
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

  const createTermsAndConditions = (formData: TermsAndConditionsFormData, options?: { onSuccess?: () => void }) => {
    return createMutation.mutate(formData, options);
  };

  const updateTermsAndConditions = (
    conditionId: string,
    formData: TermsAndConditionsFormData,
    options?: { onSuccess?: () => void }
  ) => {
    return updateMutation.mutate({ conditionId, data: formData }, options);
  };

  return {
    termsAndConditions: data || [],
    isLoading,
    error,
    refetch,
    createTermsAndConditions,
    updateTermsAndConditions,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
};
