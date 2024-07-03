'use client';
import { useContext } from 'react';
import { IconButton } from '@mui/material';
import { ThemeContext } from '@/context/theme-context';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ButtonThemeToggle = (): JSX.Element => {
  const { toggleTheme, mode } = useContext(ThemeContext);
  const IconComponent = mode === 'dark' ? LightModeIcon : DarkModeIcon;

  return (
    <IconButton
      onClick={toggleTheme}
      color="primary"
      aria-label="toggle theme"
      sx={{
        '&:hover': {
          backgroundColor: mode === 'dark' ? 'black' : 'white',
          animation: 'pulse 2s infinite',
        },
        '& .MuiSvgIcon-root': {
          color: mode === 'dark' ? 'white' : 'black',
        },
        '@keyframes pulse': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
      }}
    >
      <IconComponent />
    </IconButton>
  );
};

export default ButtonThemeToggle;
