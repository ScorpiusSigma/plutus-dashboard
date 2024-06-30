'use client';

import { useContext } from 'react';
import { IconButton } from '@mui/material';
import { ThemeContext } from '@/context/theme-context';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeToggleButton = (): JSX.Element => {
  const { toggleTheme, mode } = useContext(ThemeContext);
  const IconComponent = mode === 'dark' ? LightModeIcon : DarkModeIcon;

  return (
    <IconButton
      onClick={toggleTheme}
      color="primary"
      aria-label="toggle theme"
      className={`hover:${mode === 'dark' ? 'bg-black' : 'bg-white'} hover:animate-pulse`}
    >
      <IconComponent className={mode === 'dark' ? 'text-white' : 'text-black'} />
    </IconButton>
  );
};

export default ThemeToggleButton;
