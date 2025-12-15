import { apiClient } from './api';
import { ContactData } from '@/types/contact';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const contactService = {
  async getContactInfo(): Promise<ContactData | null> {
    const response = await apiClient.get<ContactData>('/home/contacte/');
    return response || null;
  },
  async sendContactMessage(formData: ContactFormData): Promise<any> {
    return apiClient.post('/admins/contacte/ajouter/', formData);
  },
};
 