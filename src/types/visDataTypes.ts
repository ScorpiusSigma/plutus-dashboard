type PLHistoryEntry = {
  timestamp: string;
  pnl: number;
};

export interface LeaderboardEntry {
  userid: number;
  pnl: number;
}

export type InstrumentData = {
  symbol: string;
  exchange: string;
  best_ask_price: number;
  best_ask_quantity: number;
  best_bid_price: number;
  best_bid_quantity: number;
};

export type TradeEntry = {
  userid: number;
  id: number;
  symbol: string;
  exchange: string;
  type: string;
  side: string;
  quantity: number;
  price: number;
  state: string;
  executed_price: number;
  matched_userid: number;
  latest_timestamp: string;
  is_resting: boolean;
};

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

export type FetchedInstrument = InstrumentData[];

export type FetchedTrades = TradeEntry[];
