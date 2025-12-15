import { apiClient } from './api';
import { PrivacyPolicyData } from '@/types/privacyPolicy';

export const privacyPolicyService = {
  async getPrivacyPolicy(): Promise<PrivacyPolicyData | null> {
    // API returns the privacy policy object directly (no wrapper)
    const response = await apiClient.get<PrivacyPolicyData>('/home/politique_confidentialite/');
    return response || null;
  },
};
