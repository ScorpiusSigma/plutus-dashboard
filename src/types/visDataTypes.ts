type PLHistoryEntry = {
  timestamp: string;
  pnl: number;
};

export interface LeaderboardEntry {
  userid: number;
  pnl: number;
}

export interface UserDataRaw {
  username: string;
  userid: number; // userid: username
}

export type PLPlotDataPoint = {
  dateTimeStamp: string;
  [key: string]: number | string;
};

export type FetchedPLData = {
  user: {
    username: string;
    userid: number;
  };
  pnl_history: PLHistoryEntry[];
};

export type FetchedUserData = UserDataRaw[];

export type FetchedLeaderboard = LeaderboardEntry[];
