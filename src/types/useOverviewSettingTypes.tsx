export interface IOverviewSetting {
  usersSelected: Record<number, boolean>;
  userDict: {
    [userid: number]: {
      username: string;
      color: string;
    };
  };
  dataPollingRate: number;
  instrumentFilter: string;
}
