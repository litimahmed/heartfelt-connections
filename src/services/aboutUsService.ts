import {AboutUsData} from "@/types/aboutUs.ts";
import {apiClient} from "@/services/api.ts";


export const aboutUsService = {
    async getAboutUs(): Promise<AboutUsData> {
        const response = await apiClient.get<{ data: AboutUsData[] }>('/home/aboutnous/');
        const activeAboutUs = response.data.find(item => item.active === true);

        if (!activeAboutUs) {
            throw new Error('No active "About Us" content found.');
        }
        return activeAboutUs;
    },
};
