export interface IOverviewSetting {
  usersSelected: Record<string, boolean>;
  userDict: {
    [userid: number]: {
      username: string;
      color: string;
    };
  };
  dataPollingRate: number;
  instrumentFilter: string;
}
