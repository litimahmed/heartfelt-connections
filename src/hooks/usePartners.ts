import { useQuery } from '@tanstack/react-query';
import { partnerService } from '@/services/partnerService';
import { Partner } from '@/types/partner';

export const usePartners = () => {
  return useQuery<Partner[]>({
    queryKey: ['partners'],
    queryFn: async () => {
      try {
        const data = await partnerService.getPartners();
        // Ensure we always return an array
        if (Array.isArray(data)) {
          return data;
        }
        // If data is wrapped in an object with a data property
        if (data && typeof data === 'object' && 'data' in data) {
          const wrappedData = (data as any).data;
          return Array.isArray(wrappedData) ? wrappedData : [];
        }
        console.error('Invalid partners data format:', data);
        return [];
      } catch (error) {
        console.error('Error fetching partners:', error);
        return [];
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePartner = (id: string) => {
  return useQuery<Partner>({
    queryKey: ['partner', id],
    queryFn: async () => {
      try {
        const data = await partnerService.getPartnerById(id);
        // If data is wrapped in an object with a data property
        if (data && typeof data === 'object' && 'data' in data) {
          return (data as any).data;
        }
        return data;
      } catch (error) {
        console.error('Error fetching partner:', error);
        throw error;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!id,
  });
};
