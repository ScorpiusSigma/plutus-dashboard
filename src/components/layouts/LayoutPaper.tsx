import { useTheme } from '@emotion/react';
import { Paper } from '@mui/material';
import { FC, ReactNode, useEffect } from 'react';

interface ILayoutPaperProps {
  children: ReactNode;
}

const LayoutPaper: FC<ILayoutPaperProps> = ({ children }: ILayoutPaperProps): JSX.Element => {
  const theme: any = useTheme();

  const styles = {
    position: 'static',
    height: 'calc(100vh - 72px)',
    mt: '72px',
    bgcolor: `${theme.palette.mode === 'dark' ? 'black' : 'white'}`,
  };

  return <Paper sx={styles}>{children}</Paper>;
};

export default LayoutPaper;
