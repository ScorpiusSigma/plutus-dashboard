type PLHistoryEntry = {
  timestamp: string;
  pnl: number;
};

interface LeaderboardEntry {
  userid: number;
  pnl: number;
}

export interface UserData {
  username: string;
  id: number;
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
