import { useTheme } from '@emotion/react';
import { Paper } from '@mui/material';
import { FC, ReactNode } from 'react';

interface ILayoutPaperProps {
  children: ReactNode;
}

const LayoutPaper: FC<ILayoutPaperProps> = ({ children }: ILayoutPaperProps): JSX.Element => {
  const theme: any = useTheme();

  const styles = {
    position: 'static',
    height: 'calc(100vh - 64px)',
    mt: '64px',
    bgcolor: `${theme.palette.mode === 'dark' ? 'black' : 'white'}`,
  };

  return <Paper sx={styles}>{children}</Paper>;
};

export default LayoutPaper;
