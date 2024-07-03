import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface ILayoutBoxVisProps {
  children: ReactNode;
}

const LayoutBoxVis = ({ children }: ILayoutBoxVisProps): JSX.Element => {
  const theme: any = useTheme();

  const styles = {
    bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : 'white',
    py: '10px',
    px: 2,
    border: theme.palette.mode === 'dark' ? '' : `1px solid ${theme.palette.grey[700]}`,
    borderRadius: 0,
  };

  return <Box sx={styles}>{children}</Box>;
};

export default LayoutBoxVis;
