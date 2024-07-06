import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface ILayoutBoxVisProps {
  children: ReactNode;
  margin: string | number;
}

const LayoutBoxVis = ({ children, margin }: ILayoutBoxVisProps): JSX.Element => {
  const theme: any = useTheme();

  const styles = {
    height: '100%',
    width: '100%',
    bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : 'white',
    py: '10px',
    px: 2,
    margin: margin,
    border: theme.palette.mode === 'dark' ? '' : `1px solid ${theme.palette.grey[700]}`,
    borderRadius: 0,
  };

  return <Box sx={styles}>{children}</Box>;
};

export default LayoutBoxVis;
