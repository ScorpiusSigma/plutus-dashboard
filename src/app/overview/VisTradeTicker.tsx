import LayoutBoxVis from '@/components/layouts/LayoutBoxVis';
import TableVis from '@/components/table/TableVis';
import { MOCK_TRADES_DATA } from '@/constants/placeholderData';
import { TableHeaderFormat } from '@/types/TableVisTypes';
import { FetchedTrades } from '@/types/visDataTypes';
import { Box, Typography, useTheme } from '@mui/material';
import { FC, useEffect, useState } from 'react';

// USING MOCK_TRADES_DATA

const VisTradeTicker: FC = (): JSX.Element => {
  const theme = useTheme();
  const [tradesFetched, setTradesFetched] = useState<FetchedTrades>([]);
  const [columnHeader, setColumnHeader] = useState<TableHeaderFormat>({
    latest_timestamp: { columnHeader: 'Time', color: theme.palette.grey[300] },
    symbol: { columnHeader: 'Instrument', color: theme.palette.grey[300] },
    executed_price: { columnHeader: 'Price', color: theme.palette.grey[300] },
    quantity: { columnHeader: 'Volume', color: theme.palette.grey[300] },
    side: { columnHeader: 'Aggressor', color: theme.palette.grey[300] },
    username: { columnHeader: 'User', color: theme.palette.grey[300] },
    matched_username: { columnHeader: 'Matched User', color: theme.palette.grey[300] },
  });

  const transformFetchedTrades = (data: FetchedTrades): any => {
    return data.map((item) => ({
      latest_timestamp: item.latest_timestamp,
      symbol: item.symbol,
      executed_price: item.executed_price,
      quantity: item.quantity,
      side: item.side,
      username: item.userid,
      matched_username: item.matched_userid,
    }));
  };

  useEffect(() => {
    setTradesFetched(transformFetchedTrades(MOCK_TRADES_DATA));
    console.log(transformFetchedTrades(MOCK_TRADES_DATA));
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
        <Typography>Trade Ticker</Typography>
        <TableVis headerFormat={columnHeader} data={tradesFetched} isTradeTicker={true} />
      </LayoutBoxVis>
    </Box>
  );
};

export default VisTradeTicker;
