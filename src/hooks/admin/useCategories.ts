/**
 * useCategories Hook
 * Fetches categories from the Django backend API
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/services/admin/categoryService";
import { useToast } from "@/hooks/use-toast";

export function useCategories() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: () => categoryService.getCategories(),
  });

  return {
    categories: data?.data || [],
    count: data?.count || data?.data?.length || 0,
    isLoading,
    error,
    refetch,
  };
}

export function useCreateCategory() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: FormData) => categoryService.createCategory(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast({
        title: "Succès",
        description: "Catégorie créée avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la création de la catégorie",
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

export function useUpdateCategory() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ categoryId, formData }: { categoryId: string | number; formData: FormData }) =>
      categoryService.updateCategory(categoryId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast({
        title: "Succès",
        description: "Catégorie modifiée avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la modification de la catégorie",
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

export function useDeleteCategory() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (categoryId: number) => categoryService.deleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast({
        title: "Succès",
        description: "Catégorie supprimée avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la suppression de la catégorie",
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

export function useSuspendCategory() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (categoryId: number) => categoryService.suspendCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast({
        title: "Succès",
        description: "Catégorie suspendue avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la suspension de la catégorie",
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

export function useResumeCategory() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (categoryId: number) => categoryService.resumeCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast({
        title: "Succès",
        description: "Catégorie activée avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de l'activation de la catégorie",
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
