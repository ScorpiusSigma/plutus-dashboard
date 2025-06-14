'use client';
import { AppBar, Box, Button, Divider, Grid, useTheme } from '@mui/material';
import ButtonThemeToggle from '../buttons/ButtonThemeToggle';
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
      pl: 4,
      pr: 4,
      bgcolor: theme.palette.mode === 'dark' ? '#0b0b0b' : 'white',
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
      <AppBar color="inherit" elevation={0} sx={styles.appBar}>
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
              onClick={() => handleRoute('/instrumentDetails')}
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
