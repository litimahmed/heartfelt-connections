import { apiClient } from './api';
import { TermsOfServiceData } from '@/types/termsOfService';

interface TermsApiResponse {
  message: string;
  data: TermsOfServiceData[];
}

export const termsOfServiceService = {
  async getTermsOfService(): Promise<TermsOfServiceData | null> {
    const response = await apiClient.get<TermsApiResponse>('/home/condition_dutilisation/');
    // Return the last item (most recent/complete one) or the first item
    const data = response.data;
    return data[data.length - 1] || data[0] || null;
  },
};
