/**
 * Services Hooks
 * Fetches services from the Django backend API
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceService } from "@/services/admin/serviceService";
import { useToast } from "@/hooks/use-toast";

/**
 * Hook for fetching all services for a professional
 */
export function useServices(proffessionnelId: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-services", proffessionnelId],
    queryFn: () => serviceService.getServices(proffessionnelId),
    enabled: !!proffessionnelId,
  });

  return {
    services: data || [],
    count: data?.length || 0,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook for fetching all services (no filter)
 */
export function useAllServices() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-services-all"],
    queryFn: () => serviceService.getServices(""),
  });

  return {
    services: data || [],
    count: data?.length || 0,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Hook for fetching a single service by ID
 */
export function useService(serviceId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-service", serviceId],
    queryFn: () => serviceService.getServiceById(serviceId),
    enabled: !!serviceId,
  });

  return {
    service: data,
    isLoading,
    error,
  };
}

/**
 * Hook for creating a new service
 */
export function useCreateService() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: FormData) => serviceService.createService(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      queryClient.invalidateQueries({ queryKey: ["admin-services-all"] });
      toast({
        title: "Succès",
        description: "Service créé avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la création du service",
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
}

/**
 * Hook for updating a service
 */
export function useUpdateService() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ serviceId, formData }: { serviceId: string; formData: FormData }) =>
      serviceService.updateService(serviceId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      queryClient.invalidateQueries({ queryKey: ["admin-services-all"] });
      queryClient.invalidateQueries({ queryKey: ["admin-service"] });
      toast({
        title: "Succès",
        description: "Service modifié avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la modification du service",
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
}

/**
 * Hook for deleting a service
 */
export function useDeleteService() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (serviceId: string) => serviceService.deleteService(serviceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      queryClient.invalidateQueries({ queryKey: ["admin-services-all"] });
      toast({
        title: "Succès",
        description: "Service supprimé avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la suppression du service",
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
}

/**
 * Hook for suspending a service
 */
export function useSuspendService() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (serviceId: string) => serviceService.suspendService(serviceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      queryClient.invalidateQueries({ queryKey: ["admin-services-all"] });
      toast({
        title: "Succès",
        description: "Service suspendu avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la suspension du service",
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
}
