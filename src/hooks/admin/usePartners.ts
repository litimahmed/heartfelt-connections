/**
 * Partners Hooks
 * Fetches partners from the Django backend API
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllPartners,
  getPartner,
  createPartner as createPartnerService,
  updatePartner as updatePartnerService,
  deletePartner as deletePartnerService,
} from "@/services/admin/partnerService";
import { PartnerPayload, PartnerResponse } from "@/types/admin/partner";
import { useToast } from "@/hooks/use-toast";

export const usePartners = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-partners"],
    queryFn: getAllPartners,
  });

  const createMutation = useMutation({
    mutationFn: ({
      payload,
      logoFile,
      bannerFile,
    }: {
      payload: PartnerPayload;
      logoFile?: File;
      bannerFile?: File;
    }) => createPartnerService(payload, logoFile, bannerFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-partners"] });
      toast({
        title: "Succès",
        description: "Partenaire créé avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la création du partenaire",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ partnerId, payload }: { partnerId: number; payload: PartnerPayload }) =>
      updatePartnerService(partnerId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-partners"] });
      toast({
        title: "Succès",
        description: "Partenaire mis à jour avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la mise à jour du partenaire",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (partnerId: number) => deletePartnerService(partnerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-partners"] });
      toast({
        title: "Succès",
        description: "Partenaire supprimé avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la suppression du partenaire",
        variant: "destructive",
      });
    },
  });

  const getPartnerById = async (partnerId: number): Promise<PartnerResponse | undefined> => {
    try {
      return await getPartner(partnerId);
    } catch {
      return undefined;
    }
  };

  const createPartner = async (
    payload: PartnerPayload,
    logoFile?: File,
    bannerFile?: File
  ): Promise<PartnerResponse> => {
    return createMutation.mutateAsync({ payload, logoFile, bannerFile });
  };

  const updatePartner = async (
    partnerId: number,
    payload: PartnerPayload
  ): Promise<PartnerResponse | undefined> => {
    return updateMutation.mutateAsync({ partnerId, payload });
  };

  const deletePartner = async (partnerId: number): Promise<void> => {
    return deleteMutation.mutateAsync(partnerId);
  };

  return {
    partners: data || [],
    isLoading,
    error,
    refetch,
    getPartner: getPartnerById,
    createPartner,
    updatePartner,
    deletePartner,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
