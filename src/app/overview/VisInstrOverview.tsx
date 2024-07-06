import LayoutBoxVis from '@/components/layouts/LayoutBoxVis';
import { Box, Typography } from '@mui/material';

const VisInstrOverview = (): JSX.Element => {
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
      <LayoutBoxVis margin="10px 0px 10px 10px">
        <Typography>Instrumental Overview</Typography>
      </LayoutBoxVis>
    </Box>
  );
};

export default VisInstrOverview;
