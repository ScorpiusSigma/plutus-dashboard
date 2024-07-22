import { FetchedLeaderboard, FetchedPLData, UserDataRaw } from '@/types/visDataTypes';

// GET /user
export const MOCK_USERS: any = [
  {
    username: 'Team Alpha',
    userid: 1,
  },
  {
    username: 'Team Beta',
    userid: 2,
  },
  {
    username: 'Team Gamma',
    userid: 3,
  },
  {
    username: 'Team Delta',
    userid: 4,
  },
];

// GET /pnl_history
export const MOCK_PL_DATA: FetchedPLData[] = [
  {
    user: {
      username: 'Team Alpha',
      userid: 1,
    },
    pnl_history: [
      { timestamp: '2024-01-01T00:00:00Z', pnl: 100 },
      { timestamp: '2024-02-01T00:00:00Z', pnl: 150 },
      { timestamp: '2024-03-01T00:00:00Z', pnl: 200 },
      { timestamp: '2024-04-01T00:00:00Z', pnl: 250 },
      { timestamp: '2024-05-01T00:00:00Z', pnl: 300 },
      { timestamp: '2024-06-01T00:00:00Z', pnl: 350 },
      { timestamp: '2024-07-01T00:00:00Z', pnl: 400 },
      { timestamp: '2024-08-01T00:00:00Z', pnl: 450 },
    ],
  },
  {
    user: {
      username: 'Team Beta',
      userid: 2,
    },
    pnl_history: [
      { timestamp: '2024-01-01T00:00:00Z', pnl: 200 },
      { timestamp: '2024-02-01T00:00:00Z', pnl: 250 },
      { timestamp: '2024-03-01T00:00:00Z', pnl: 300 },
      { timestamp: '2024-04-01T00:00:00Z', pnl: 350 },
      { timestamp: '2024-05-01T00:00:00Z', pnl: 400 },
      { timestamp: '2024-06-01T00:00:00Z', pnl: 450 },
      { timestamp: '2024-07-01T00:00:00Z', pnl: 500 },
      { timestamp: '2024-08-01T00:00:00Z', pnl: 550 },
    ],
  },
  {
    user: {
      username: 'Team Gamma',
      userid: 3,
    },
    pnl_history: [
      { timestamp: '2024-01-01T00:00:00Z', pnl: 300 },
      { timestamp: '2024-02-01T00:00:00Z', pnl: 350 },
      { timestamp: '2024-03-01T00:00:00Z', pnl: 400 },
      { timestamp: '2024-04-01T00:00:00Z', pnl: 450 },
      { timestamp: '2024-05-01T00:00:00Z', pnl: 500 },
      { timestamp: '2024-06-01T00:00:00Z', pnl: 550 },
      { timestamp: '2024-07-01T00:00:00Z', pnl: 600 },
      { timestamp: '2024-08-01T00:00:00Z', pnl: 650 },
    ],
  },
  {
    user: {
      username: 'Team Delta',
      userid: 4,
    },
    pnl_history: [
      { timestamp: '2024-01-01T00:00:00Z', pnl: 400 },
      { timestamp: '2024-02-01T00:00:00Z', pnl: 450 },
      { timestamp: '2024-03-01T00:00:00Z', pnl: 500 },
      { timestamp: '2024-04-01T00:00:00Z', pnl: 550 },
      { timestamp: '2024-05-01T00:00:00Z', pnl: 600 },
      { timestamp: '2024-06-01T00:00:00Z', pnl: 650 },
      { timestamp: '2024-07-01T00:00:00Z', pnl: 700 },
      { timestamp: '2024-08-01T00:00:00Z', pnl: 750 },
    ],
  },
];

// GET /leaderboard
export const MOCK_LEADERBOARD_DATA: FetchedLeaderboard = [
  {
    userid: 1,
    pnl: 750,
  },
  {
    userid: 2,
    pnl: 650,
  },
  {
    userid: 3,
    pnl: 550,
  },
  {
    userid: 4,
    pnl: 450,
  },
];
