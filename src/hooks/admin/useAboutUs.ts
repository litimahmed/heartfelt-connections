/**
 * About Us Hooks
 * Fetches About Us content from the Django backend API
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllAboutUs,
  getActiveAboutUs,
  createAboutNous as createAboutNousService,
  updateAboutUs as updateAboutUsService,
  toggleAboutUsActive,
  getAboutUsById,
} from "@/services/admin/aboutUsService";
import { AboutNousPayload, AboutNousResponse } from "@/types/admin/aboutUs";
import { useToast } from "@/hooks/use-toast";

export const useAboutUs = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: versions,
    isLoading: isLoadingVersions,
    error: versionsError,
    refetch: refetchVersions,
  } = useQuery({
    queryKey: ["admin-about-us-versions"],
    queryFn: getAllAboutUs,
  });

  const {
    data: activeVersion,
    isLoading: isLoadingActive,
  } = useQuery({
    queryKey: ["admin-about-us-active"],
    queryFn: getActiveAboutUs,
  });

  const createMutation = useMutation({
    mutationFn: (payload: AboutNousPayload) => createAboutNousService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-about-us-versions"] });
      queryClient.invalidateQueries({ queryKey: ["admin-about-us-active"] });
      toast({
        title: "Succès",
        description: "Contenu 'À propos' créé avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la création du contenu",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ aboutId, payload }: { aboutId: string; payload: AboutNousPayload }) =>
      updateAboutUsService(aboutId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-about-us-versions"] });
      queryClient.invalidateQueries({ queryKey: ["admin-about-us-active"] });
      toast({
        title: "Succès",
        description: "Contenu 'À propos' mis à jour avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la mise à jour du contenu",
        variant: "destructive",
      });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: (aboutId: string) => toggleAboutUsActive(aboutId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-about-us-versions"] });
      queryClient.invalidateQueries({ queryKey: ["admin-about-us-active"] });
      toast({
        title: "Succès",
        description: "Version activée avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de l'activation de la version",
        variant: "destructive",
      });
    },
  });

  const useAboutUsById = (aboutId: string | undefined) => {
    const { data, isLoading, error } = useQuery({
      queryKey: ["admin-about-us", aboutId],
      queryFn: () => getAboutUsById(aboutId!),
      enabled: !!aboutId,
    });

    return {
      data,
      isLoading,
      error,
    };
  };

  const createAboutNous = async (payload: AboutNousPayload): Promise<AboutNousResponse> => {
    return createMutation.mutateAsync(payload);
  };

  const updateAboutUs = async (aboutId: string, payload: AboutNousPayload): Promise<void> => {
    await updateMutation.mutateAsync({ aboutId, payload });
  };

  const toggleActive = async (aboutId: string): Promise<void> => {
    await toggleMutation.mutateAsync(aboutId);
  };

  return {
    versions: versions || [],
    activeVersion,
    isLoadingVersions,
    isLoadingActive,
    refetchVersions,
    useAboutUsById,
    createAboutNous,
    updateAboutUs,
    toggleActive,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isToggling: toggleMutation.isPending,
  };
};
