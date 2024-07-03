'use client';
import { TextField, useTheme } from '@mui/material';
import { FC } from 'react';

interface IInputTextProps {
  placeholder?: string;
}

const InputText: FC<IInputTextProps> = ({ placeholder }): JSX.Element => {
  const theme = useTheme();

  const styles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.grey[600],
        borderRadius: 0,
      },
      '&:hover fieldset': {
        borderColor: '#8a5cff',
        borderRadius: 0,
      },
      '&.Mui-focused fieldset': {
        borderColor: '#8a5cff',
        borderRadius: 0,
        borderWidth: '1px',
      },
    },
    '& input': {
      py: '4px',
      px: '14px',
      width: '150px',
    },
  };

  return <TextField variant="outlined" size="small" sx={styles} placeholder={placeholder}></TextField>;
};

export default InputText;
