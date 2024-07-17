type PLHistoryEntry = {
  timestamp: string;
  pnl: number;
};

export interface LeaderboardEntry {
  userid: number;
  pnl: number;
}

export interface UserData {
  [userid: number]: string; // userid: username
}

export type PLPlotDataPoint = {
  dateTimeStamp: string;
  [key: string]: number | string;
};

export type FetchedPLData = {
  user: {
    username: string;
    id: number;
  };
  pnl_history: PLHistoryEntry[];
};

export type FetchedUserData = UserData[];

export type FetchedLeaderboard = LeaderboardEntry[];
