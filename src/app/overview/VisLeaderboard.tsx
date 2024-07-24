import LayoutBoxVis from '@/components/layouts/LayoutBoxVis';
import TableVis from '@/components/table/TableVis';
import { MOCK_LEADERBOARD_DATA } from '@/constants/placeholderData';
import useOverviewSettings from '@/stores/useOverviewSetting';
import { TableHeaderFormat, TableUserColors } from '@/types/TableVisTypes';
import { FetchedLeaderboard, FetchedUserData, LeaderboardEntry, UserDataRaw } from '@/types/visDataTypes';
import { LeaderboardOutlined } from '@mui/icons-material';
import { Box, Typography, useTheme } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';

// USING MOCK_LEADERBOARD

interface IVisLeaderboardProps {}

const VisLeaderboard: FC<IVisLeaderboardProps> = (): JSX.Element => {
  const theme = useTheme();
  const { overviewSetting } = useOverviewSettings();
  const [leaderboardFetched, setLeaderboardFetched] = useState<FetchedLeaderboard>([]);
  const [leaderboardData, setLeaderboardData] = useState<any>([]);
  const [columnHeader, setColumnHeader] = useState<TableHeaderFormat>({
    rank: { columnHeader: 'Rank', color: 'auto' },
    username: { columnHeader: 'User', color: 'auto' },
    pnl: { columnHeader: 'PnL', color: '#69aba7' },
  });

  const updateLeaderboardData = useCallback((): void => {
    const newLeaderboardData: any[] = leaderboardFetched.map((userEntry: LeaderboardEntry, index: number) => {
      return {
        rank: index + 1,
        username: userEntry.userid,
        pnl: userEntry.pnl,
      };
    });
    setLeaderboardData(newLeaderboardData);
  }, [leaderboardFetched]);

  useEffect(() => {
    setLeaderboardFetched(MOCK_LEADERBOARD_DATA);
  }, []);

  useEffect(() => {
    updateLeaderboardData();
  }, [leaderboardFetched]);

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
