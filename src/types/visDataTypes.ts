type PLHistoryEntry = {
  timestamp: string;
  pnl: number;
};

export type PLFetchedData = {
  name: string;
  id: number;
  pnl_history: PLHistoryEntry[];
};

export type PLPlotDataPoint = {
  dateTimeStamp: string;
  [key: string]: number | string;
};
