import { IOverviewSetting } from '@/types/useOverviewSettingTypes';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface IOverviewSettingStore {
  overviewSetting: IOverviewSetting;
  setOverviewSetting: (overviewSetting: IOverviewSetting) => void;
}

const useOverviewSettings = create<IOverviewSettingStore>((set) => ({
  overviewSetting: {
    usersSelected: {
      1: false,
    },
    dataPollingRate: 1,
    instrumentFilter: '',
    userDict: {
      1: { username: 'Team Alpha', color: '#66c2a5' },
    },
  },

  setOverviewSetting: (overviewSetting: IOverviewSetting) => {
    set((state) => {
      return { ...state, overviewSetting: overviewSetting };
    });
  },
}));

export default useOverviewSettings;
