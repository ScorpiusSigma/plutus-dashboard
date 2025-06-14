'use client';
import { Divider, DividerProps, SxProps, Theme, useTheme } from '@mui/material';
import React, { FC } from 'react';
import { PanelResizeHandle } from 'react-resizable-panels';

interface IDividerResizableProps extends DividerProps {
  direction: 'horizontal' | 'vertical';
  sx?: SxProps<Theme>;
}

const DividerResizable: FC<IDividerResizableProps> = ({
  id = 'drag-bar',
  direction,
  sx,
  ...props
}: IDividerResizableProps): JSX.Element => {
  const theme = useTheme();

  const size = theme.palette.mode === 'dark' ? '3.5px' : '2px';

  const styles = {
    width: direction === 'horizontal' ? '100%' : size,
    height: direction === 'horizontal' ? size : '100%',
    cursor: direction === 'horizontal' ? 'row-resize' : 'col-resize',
    margin: direction === 'horizontal' ? '10px 0px 10px 0px' : '0px 10px 0px 10px',
    transition: 'background-color 0.15s ease-in-out',
    border: 0,
    bgcolor: theme.palette.mode === 'dark' ? '#5b3fa0' : '#8757ff',
    '&:hover': {
      bgcolor: '#8a5cff',
    },
    '&:focus': {
      backgroundColor: '#6e35ff',
    },
  };

  return (
    <PanelResizeHandle>
      <Divider orientation={direction} id={id} tabIndex={0} sx={{ ...styles, ...sx }} {...props} />
    </PanelResizeHandle>
  );
};

export default DividerResizable;
