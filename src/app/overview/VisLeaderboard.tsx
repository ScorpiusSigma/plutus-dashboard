import LayoutBoxVis from '@/components/layouts/LayoutBoxVis';
import TableVis from '@/components/table/TableVis';
import { MOCK_LEADERBOARD_DATA } from '@/constants/placeholderData';
import useOverviewSettings from '@/stores/useOverviewSetting';
import { TableHeaderFormat } from '@/types/TableVisTypes';
import { FetchedLeaderboard, LeaderboardEntry } from '@/types/visDataTypes';
import { Box, Typography } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';

// USING MOCK_LEADERBOARD

interface IVisLeaderboardProps {}

const VisLeaderboard: FC<IVisLeaderboardProps> = (): JSX.Element => {
  const { overviewSetting } = useOverviewSettings();
  const [leaderboardFetched, setLeaderboardFetched] = useState<FetchedLeaderboard>([]);
  const [leaderboardData, setLeaderboardData] = useState<any>([]);
  const [columnHeader, setColumnHeader] = useState<TableHeaderFormat>({
    rank: { columnHeader: 'Rank', color: 'auto' },
    username: { columnHeader: 'User', color: 'auto' },
    pnl: { columnHeader: 'PnL', color: '#81c1bd' },
  });

  const updateLeaderboardData = useCallback((): void => {
    const leaderboardFiltered: FetchedLeaderboard = leaderboardFetched.filter(
      (leaderboardData: LeaderboardEntry) => overviewSetting.usersSelected[leaderboardData.userid],
    );
    const newLeaderboardData: any[] = leaderboardFiltered.map((userEntry: LeaderboardEntry, index: number) => {
      return {
        rank: index + 1,
        username: userEntry.userid,
        pnl: userEntry.pnl,
      };
    });
    setLeaderboardData(newLeaderboardData);
  }, [leaderboardFetched, overviewSetting.usersSelected]);

  // INITIAL LOAD / FETCH
  useEffect(() => {
    setLeaderboardFetched(MOCK_LEADERBOARD_DATA);
  }, []);

  useEffect(() => {
    updateLeaderboardData();
  }, [leaderboardFetched, overviewSetting.usersSelected]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <LayoutBoxVis margin="0">
        <Typography>Leaderboard</Typography>
        <TableVis headerFormat={columnHeader} data={leaderboardData} />
      </LayoutBoxVis>
    </Box>
  );
};

export default VisLeaderboard;
