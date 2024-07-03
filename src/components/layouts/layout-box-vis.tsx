import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

interface ILayoutBoxVisProps {
  children: ReactNode;
}

const LayoutBoxVis: FC<ILayoutBoxVisProps> = ({ children }: ILayoutBoxVisProps): JSX.Element => {
  const theme: any = useTheme();

  return <Box sx={{ bgcolor: theme.palette.grey[900], py: '10px', px: 2 }}>{children}</Box>;
};

export default LayoutBoxVis;
