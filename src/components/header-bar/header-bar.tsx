'use client';
import { AppBar, Box, Button, Divider, Grid, useTheme } from '@mui/material';
import ButtonThemeToggle from '../buttons/button-theme-toggle';
import { useRouter } from 'next/navigation';

interface IHeaderBarProps {
  pageSelected: string;
}

const HeaderBar: React.FC<IHeaderBarProps> = ({ pageSelected }): JSX.Element => {
  const router = useRouter();
  const theme = useTheme();

  const handleRoute = (route: string): void => {
    router.push(route);
  };

  const styles = {
    appBar: {
      py: 2,
      pl: 3,
      pr: 4,
      bgcolor: theme.palette.mode === 'dark' ? 'black' : 'white',
    },
    button: (page: string) => ({
      fontWeight: pageSelected === page ? 'bold' : 'normal',
      color: pageSelected === page ? '' : 'gray',
      '&:hover': {
        fontWeight: 'bold',
        backgroundColor: 'transparent',
      },
    }),
    divider: {
      mx: 2,
    },
  };

  return (
    <Box sx={{ position: 'static' }}>
      <AppBar color="inherit" sx={styles.appBar}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Button
              variant="text"
              color="inherit"
              sx={styles.button('Overview')}
              onClick={() => handleRoute('/overview')}
            >
              Overview
            </Button>
            <Divider orientation="vertical" flexItem sx={styles.divider} />
            <Button
              variant="text"
              color="inherit"
              sx={styles.button('Instrument Details')}
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
