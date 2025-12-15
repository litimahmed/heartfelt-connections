import { useQuery } from '@tanstack/react-query';
import { termsOfServiceService } from '@/services/termsOfServiceService';
import { TermsOfServiceData } from '@/types/termsOfService';

export const useTermsOfService = () => {
  return useQuery<TermsOfServiceData | null>({
    queryKey: ['termsOfService'],
    queryFn: async () => {
      try {
        const data = await termsOfServiceService.getTermsOfService();
        return data;
      } catch (error) {
        console.error('Error fetching terms of service:', error);
        throw error;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
