import LayoutBoxVis from '@/components/layouts/LayoutBoxVis';
import TableVis from '@/components/table/TableVis';
import { MOCK_INSTRUMENTS_DATA } from '@/constants/placeholderData';
import { TableHeaderFormat } from '@/types/TableVisTypes';
import { FetchedInstrument } from '@/types/visDataTypes';
import { Box, Typography, useTheme } from '@mui/material';
import { FC, useEffect, useState } from 'react';

// USING MOCK_INSTRUMENTS_DATA

interface IVisInstrOverviewProps {}

const VisInstrOverview: FC<IVisInstrOverviewProps> = (): JSX.Element => {
  const theme = useTheme();
  const [instrumentsFetched, setInstrumentsFetched] = useState<FetchedInstrument>([]);
  const [columnHeader, setColumnHeader] = useState<TableHeaderFormat>({
    symbol: { columnHeader: 'Instrument', color: 'auto' },
    exchange: { columnHeader: 'Exchange', color: theme.palette.grey[500] },
    best_bid_price: { columnHeader: 'Best Bid', color: '#81c1bd' },
    best_bid_quantity: { columnHeader: '# Bid', color: '#81c1bd' },
    best_ask_price: { columnHeader: 'Best Ask', color: '#cf6f6f' },
    best_ask_quantity: { columnHeader: '# Ask', color: '#cf6f6f' },
  });

  useEffect(() => {
    setInstrumentsFetched(MOCK_INSTRUMENTS_DATA);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <LayoutBoxVis margin="0">
        <Typography>Instrumental Overview</Typography>
        <TableVis headerFormat={columnHeader} data={instrumentsFetched} />
      </LayoutBoxVis>
    </Box>
  );
};

export default VisInstrOverview;
