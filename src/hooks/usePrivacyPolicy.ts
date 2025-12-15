import { useQuery } from '@tanstack/react-query';
import { privacyPolicyService } from '@/services/privacyPolicyService';
import { PrivacyPolicyData } from '@/types/privacyPolicy';

export const usePrivacyPolicy = () => {
  return useQuery<PrivacyPolicyData | null>({
    queryKey: ['privacyPolicy'],
    queryFn: async () => {
      try {
        const data = await privacyPolicyService.getPrivacyPolicy();
        return data;
      } catch (error) {
        console.error('Error fetching privacy policy:', error);
        throw error;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
