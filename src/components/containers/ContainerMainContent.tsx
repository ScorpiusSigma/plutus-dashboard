'use client';
import React, { FC, ReactNode } from 'react';
import { Box, useTheme } from '@mui/material';

interface IContainerMainContentProps {
  children: ReactNode;
}

const ContainerMainContent: FC<IContainerMainContentProps> = ({
  children,
}: IContainerMainContentProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(97vh - 140px)',
        maxHeight: 'calc(97vh - 140px)',
        mx: 4,
        backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : 'white',
        overflow: 'hidden',
      }}
    >
      {children}
    </Box>
  );
};

export default ContainerMainContent;
