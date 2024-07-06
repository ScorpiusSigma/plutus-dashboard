import LayoutBoxVis from '@/components/layouts/LayoutBoxVis';
import { Box, Typography } from '@mui/material';

const VisTradeTicker = (): JSX.Element => {
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
      <LayoutBoxVis margin="10px 0px 0px 0px">
        <Typography>Trade Ticker</Typography>
      </LayoutBoxVis>
    </Box>
  );
};

export default VisTradeTicker;
