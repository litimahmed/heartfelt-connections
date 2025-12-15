import { useQuery } from '@tanstack/react-query';
import { aboutUsService } from '@/services/aboutUsService';
import { AboutUsData } from '@/types/aboutUs';

export const useAboutUs = () => {
  return useQuery<AboutUsData>({
    queryKey: ['aboutUs'],
    queryFn: async () => {
      try {
        const data = await aboutUsService.getAboutUs();
        return data;
      } catch (error) {
        console.error('Error fetching about us:', error);
        throw error;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
