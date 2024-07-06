import LayoutBoxVis from '@/components/layouts/LayoutBoxVis';
import { Box, Typography } from '@mui/material';

const VisLeaderboard = (): JSX.Element => {
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
      <LayoutBoxVis margin="0px 0px 10px 10px">
        <Typography>Leaderboard</Typography>
      </LayoutBoxVis>
    </Box>
  );
};

export default VisLeaderboard;
