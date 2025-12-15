/**
 * Contacts Hooks
 * Fetches contact info from the Django backend API
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getContact,
  createContact as createContactService,
  updateContact as updateContactService,
} from "@/services/admin/contactService";
import { ContactPayload, ContactResponse } from "@/types/admin/contact";
import { useToast } from "@/hooks/use-toast";

export const useContacts = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-contact"],
    queryFn: getContact,
  });

  const createMutation = useMutation({
    mutationFn: (payload: ContactPayload) => createContactService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-contact"] });
      toast({
        title: "Succès",
        description: "Contact créé avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la création du contact",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: ContactPayload) => updateContactService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-contact"] });
      toast({
        title: "Succès",
        description: "Contact mis à jour avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message || "Échec de la mise à jour du contact",
        variant: "destructive",
      });
    },
  });

  const createContact = async (payload: ContactPayload): Promise<ContactResponse> => {
    return createMutation.mutateAsync(payload);
  };

  const updateContact = async (payload: ContactPayload): Promise<ContactResponse> => {
    return updateMutation.mutateAsync(payload);
  };

  return {
    contact: data,
    isLoading,
    error,
    refetch,
    createContact,
    updateContact,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
};
