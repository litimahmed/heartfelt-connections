/**
 * Professionals Hooks
 * Fetches professionals from the Django backend API
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProfessionals,
  getProfessionalById,
  createProfessional,
  updateProfessional,
  activateProfessional,
  deactivateProfessional,
  deleteProfessional,
} from "@/services/admin/professionalService";
import { ProfessionalCreatePayload, ProfessionalUpdatePayload } from "@/types/admin/professional";
import { useToast } from "@/hooks/use-toast";

export const useProfessionals = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-professionals"],
    queryFn: getProfessionals,
  });

  return {
    professionals: data || [],
    count: data?.length || 0,
    isLoading,
    error,
    refetch,
  };
};

export const useProfessional = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-professional", id],
    queryFn: () => getProfessionalById(id),
    enabled: !!id,
  });

  return {
    professional: data,
    isLoading,
    error,
  };
};

export const useCreateProfessional = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: ProfessionalCreatePayload) => createProfessional(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-professionals"] });
      toast({
        title: "Succès",
        description: "Professionnel créé avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la création du professionnel",
        variant: "destructive",
      });
    },
  });

  return {
    mutateAsync: mutation.mutateAsync,
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    isLoading: mutation.isPending,
  };
};

export const useUpdateProfessional = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ProfessionalUpdatePayload }) =>
      updateProfessional(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-professionals"] });
      queryClient.invalidateQueries({ queryKey: ["admin-professional"] });
      toast({
        title: "Succès",
        description: "Professionnel modifié avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la modification du professionnel",
        variant: "destructive",
      });
    },
  });

  return {
    mutateAsync: mutation.mutateAsync,
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    isLoading: mutation.isPending,
  };
};

export const useActivateProfessional = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => activateProfessional(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-professionals"] });
      toast({
        title: "Succès",
        description: "Professionnel activé avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de l'activation du professionnel",
        variant: "destructive",
      });
    },
  });

  return {
    mutateAsync: mutation.mutateAsync,
    mutate: mutation.mutate,
    isPending: mutation.isPending,
  };
};

export const useDeactivateProfessional = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deactivateProfessional(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-professionals"] });
      toast({
        title: "Succès",
        description: "Professionnel désactivé avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la désactivation du professionnel",
        variant: "destructive",
      });
    },
  });

  return {
    mutateAsync: mutation.mutateAsync,
    mutate: mutation.mutate,
    isPending: mutation.isPending,
  };
};

export const useDeleteProfessional = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteProfessional(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-professionals"] });
      toast({
        title: "Succès",
        description: "Professionnel supprimé avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la suppression du professionnel",
        variant: "destructive",
      });
    },
  });

  return {
    mutateAsync: mutation.mutateAsync,
    mutate: mutation.mutate,
    isPending: mutation.isPending,
  };
};
