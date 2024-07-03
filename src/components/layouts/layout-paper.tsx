import { useTheme } from '@emotion/react';
import { Paper } from '@mui/material';
import { FC, ReactNode, useEffect } from 'react';

interface ILayoutPaperProps {
  children: ReactNode;
}

const LayoutPaper: FC<ILayoutPaperProps> = ({ children }: ILayoutPaperProps): JSX.Element => {
  const theme: any = useTheme();

  return (
    <Paper
      sx={{
        position: 'static',
        height: 'calc(100vh - 72px)',
        mt: '72px',
        bgcolor: `${theme.palette.mode === 'dark' ? 'black' : 'white'}`,
      }}
    >
      {children}
    </Paper>
  );
};

export default LayoutPaper;
