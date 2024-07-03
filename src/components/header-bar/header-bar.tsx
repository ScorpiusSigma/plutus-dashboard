'use client';
import { FC } from 'react';
import { AppBar, Box, Button, Divider, Grid, useTheme } from '@mui/material';
import ButtonThemeToggle from '../buttons/button-theme-toggle';
import { useRouter } from 'next/navigation';

interface IHeaderBarProps {
  pageSelected: string;
}

const HeaderBar: FC<IHeaderBarProps> = ({ pageSelected }): JSX.Element => {
  const router = useRouter();
  const theme = useTheme();

  const handleRoute = (route: string): void => {
    router.push(route);
  };

  const getButtonStyles = (page: string) => ({
    fontWeight: pageSelected === page ? 'bold' : 'normal',
    color: pageSelected === page ? '' : 'gray',
    '&:hover': {
      fontWeight: 'bold',
      backgroundColor: 'transparent',
    },
  });

  return (
    <Box sx={{ position: 'static' }}>
      <AppBar
        color="inherit"
        sx={{ py: 2, pl: 3, pr: 4, bgcolor: `${theme.palette.mode === 'dark' ? 'black' : 'white'}` }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Button
              variant="text"
              color="inherit"
              sx={getButtonStyles('Overview')}
              onClick={() => handleRoute('/overview')}
            >
              Overview
            </Button>
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <Button
              variant="text"
              color="inherit"
              sx={getButtonStyles('Instrument Details')}
              onClick={() => handleRoute('/instrument-details')}
            >
              Instrument Details
            </Button>
          </Grid>
          <Grid item>
            <ButtonThemeToggle />
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
};

export default HeaderBar;
