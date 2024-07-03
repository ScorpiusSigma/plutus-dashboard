'use client';
import { TextField } from '@mui/material';
import { FC } from 'react';

interface IInputTextProps {
  placeholder?: string;
}

const InputText: FC<IInputTextProps> = ({ placeholder }): JSX.Element => {
  return (
    <TextField
      variant="outlined"
      size="small"
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'gray',
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
      }}
      placeholder={placeholder}
    ></TextField>
  );
};

export default InputText;
