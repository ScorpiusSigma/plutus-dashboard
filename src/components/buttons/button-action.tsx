'use client';
import { FC, ReactNode } from 'react';
import { Button, darken, useTheme } from '@mui/material';

interface IButtonActionProps {
  children: ReactNode;
}

const ButtonAction: FC<IButtonActionProps> = ({ children }: IButtonActionProps): JSX.Element => {
  const hoverBgColor = darken('#5b3fa0', 0.2);

  const styles = {
    bgcolor: '#5b3fa0',
    color: 'white',
    textTransform: 'none',
    height: '30px',
    borderRadius: 0,
    '&:hover': {
      bgcolor: hoverBgColor,
    },
  };

  return (
    <Button variant="contained" sx={styles}>
      {children}
    </Button>
  );
};

export default ButtonAction;
