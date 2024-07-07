import LayoutBoxVis from '@/components/layouts/LayoutBoxVis';
import { Box, Typography } from '@mui/material';
import { FC } from 'react';

const VisInstrOverview: FC = (): JSX.Element => {
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
        <Typography>Instrumental Overview</Typography>
      </LayoutBoxVis>
    </Box>
  );
};

export default VisInstrOverview;
