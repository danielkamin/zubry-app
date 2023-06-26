import create from 'zustand';
import { persist } from 'zustand/middleware';

import { TStrapiGlobalSettings } from '@/types/strapi.types';
import MainPageService from 'common/services/main.service';
type TGlobalStore = {
  settings: TStrapiGlobalSettings | null;
  loading: boolean;
  hasErrors: boolean;
  fetchSettings: () => Promise<void>;
  getSettingByKey: (key: keyof TStrapiGlobalSettings) => string;
};
const useGlobalStore = create<TGlobalStore>(
  persist(
    (set, get) => ({
      settings: null,
      loading: false,
      hasErrors: false,
      fetchSettings: async () => {
        set(() => ({ loading: true }));
        const globalSettingsResult = await MainPageService.getGlobalSettings();
        if (!globalSettingsResult.status) {
          set(() => ({ hasErrors: true }));
          return;
        }
        set(() => ({ loading: false }));
        set(() => ({
          settings: globalSettingsResult.result.data.attributes
        }));
      },

      getSettingByKey: (key) => {
        if (!get().settings) return '';
        if (key === 'Team_Banner') {
          return get().settings.Team_Banner.data.attributes.url;
        } else return get().settings[key];
      }
    }),
    {
      name: 'global-storage',
      getStorage: () => sessionStorage
    }
  )
);

export default useGlobalStore;
