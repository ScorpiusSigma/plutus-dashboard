'use client';
import { AppBar, Box, Button, Divider, Grid } from '@mui/material';
import ButtonThemeToggle from '../buttons/button-theme-toggle';
import { useRouter } from 'next/navigation';

interface IHeaderBarProps {
  pageSelected: string;
}

const HeaderBar: React.FC<IHeaderBarProps> = ({ pageSelected }): JSX.Element => {
  const router = useRouter();

  const handleRoute = (route: string): void => {
    router.push(route);
  };

  const getButtonStyles = (page: string) => ({
    fontWeight: pageSelected === page ? 'bold' : 'normal',
    boxShadow: pageSelected === page ? 'inset 0 0 0 2px currentColor' : 'none',
    '&:hover': {
      fontWeight: 'bold',
    },
  });

  return (
    <Box>
      <AppBar color="inherit" sx={{ py: 2, px: 3 }}>
        <Box>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Button variant="text" sx={getButtonStyles('Overview')} onClick={() => handleRoute('/overview')}>
                Overview
              </Button>
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
              <Button
                variant="text"
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
        </Box>
      </AppBar>
    </Box>
  );
};

export default HeaderBar;
