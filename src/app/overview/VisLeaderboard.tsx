import LayoutBoxVis from '@/components/layouts/LayoutBoxVis';
import { MOCK_LEADERBOARD_DATA } from '@/constants/placeholderData';
import { FetchedLeaderboard } from '@/types/visDataTypes';
import { Box, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';

// USING MOCK_LEADERBOARD

interface IVisLeaderboardProps {
  userColors: { [key: string]: string };
}

const VisLeaderboard: FC<IVisLeaderboardProps> = ({ userColors }): JSX.Element => {
  const [leaderboardFetched, setLeaderboardFetched] = useState<FetchedLeaderboard>([]);

  useEffect(() => {
    setLeaderboardFetched(MOCK_LEADERBOARD_DATA);
  }, []);

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
        {/* <TableVis></TableVis> */}
      </LayoutBoxVis>
    </Box>
  );
};

export default VisLeaderboard;
