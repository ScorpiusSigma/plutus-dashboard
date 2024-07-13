import { IOverviewSetting } from '@/types/useOverviewSettingTypes';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface IOverviewSettingStore {
  overviewSetting: IOverviewSetting;
  setOverviewSetting: (overviewSetting: IOverviewSetting) => void;
}

const useOverviewSettings = create<IOverviewSettingStore>((set) => ({
  overviewSetting: {
    teamsSelected: {
      'Team Alpha': true,
      'Team Beta': true,
      'Team Gamma': true,
    },
    dataPollingRate: 1,
    instrumentFilter: '',
  },

  setOverviewSetting: (overviewSetting: IOverviewSetting) => {
    set((state) => {
      return { ...state, overviewSetting: overviewSetting };
    });
  },
}));

export default useOverviewSettings;
