import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import { FC } from 'react';
import { TableHeaderFormat, TableUserColors } from '@/types/TableVisTypes';
import useOverviewSettings from '@/stores/useOverviewSetting';
import moment from 'moment';

interface ITableVisProps {
  headerFormat: TableHeaderFormat;
  data: any[];
  isTradeTicker?: boolean;
}

const TableVis: FC<ITableVisProps> = ({ headerFormat, data, isTradeTicker }): JSX.Element => {
  const theme = useTheme();
  const { overviewSetting } = useOverviewSettings();

  const tableStyles: any = {
    darkScrollbar: {
      '::-webkit-scrollbar': {
        width: '6px',
      },
      '::-webkit-scrollbar-track': {
        borderRadius: '10px',
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.grey[800],
        borderRadius: '8px',
        '&:hover': {
          backgroundColor: theme.palette.grey[700],
        },
      },
    },
    lightScrollbar: {
      '::-webkit-scrollbar': {
        width: '6px',
      },
      '::-webkit-scrollbar-track': {
        borderRadius: '10px',
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.grey[400],
        borderRadius: '8px',
        '&:hover': {
          backgroundColor: theme.palette.grey[500],
        },
      },
    },
  };

  const formatNumber = (value: number): string | number => {
    if (Number.isInteger(value)) {
      return value;
    }
    return value.toFixed(2);
  };

  const getUsernameById = (userid: number): string => {
    const users = overviewSetting.userDict;
    return users[userid].username || '';
  };

  const getFormatTimestamp = (isoString: string): string => {
    return moment(isoString).utc().format('HH:mm:ss DD/MM/YYYY');
  };

  const getTableStyle = (): any => {
    return theme.palette.mode === 'dark' ? tableStyles.darkScrollbar : tableStyles.lightScrollbar;
  };

  const getFormattedValue = (header: string, rowData: any, isTradeTicker: boolean | undefined): string | number => {
    if (header.includes('username')) {
      return getUsernameById(rowData[header]);
    }
    if (isTradeTicker && header === 'side') {
      return rowData.side === 'BUY' ? 'Buyer' : 'Seller';
    }
    if (typeof rowData[header] === 'number') {
      return formatNumber(rowData[header]);
    }
    if (header === 'latest_timestamp') {
      return getFormatTimestamp(rowData[header]);
    }
    return rowData[header];
  };

  const getTableCellTextColor = (
    header: string,
    rowData: any,
    isTradeTicker: boolean | undefined,
    theme: any,
    overviewSetting: any,
    headerFormat: any,
  ): string => {
    if (header.includes('username')) {
      return overviewSetting.userDict[rowData[header]].color;
    } else if (isTradeTicker) {
      return rowData.side === 'BUY' ? '#81c1bd' : '#cf6f6f';
    } else if (header === 'auto') {
      return theme.palette.mode === 'dark' ? theme.palette.grey[300] : '';
    } else {
      return headerFormat[header].color;
    }
  };

  return (
    <TableContainer
      className={`${theme.palette.mode === 'dark' ? 'dark-scrollbar' : 'light-scrollbar'}`}
      sx={{
        height: '100%',
        pb: '20px',
        my: 1,
        '& .MuiTableCell-root': {
          py: '5px',
        },
        ...getTableStyle(),
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(headerFormat).map((header: string, index: number) => {
              return (
                <TableCell
                  key={index}
                  sx={{
                    whiteSpace: 'nowrap',
                    position: 'sticky',
                    top: 0,
                    bgcolor: `${theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#ffffff'}`,
                  }}
                >
                  {headerFormat[header].columnHeader}{' '}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((rowData: any, rowIndex: number) => {
            return (
              <TableRow key={rowIndex}>
                {Object.keys(headerFormat).map((header: string, colIndex: number) => {
                  return (
                    <TableCell
                      key={colIndex}
                      sx={{
                        color: getTableCellTextColor(
                          header,
                          rowData,
                          isTradeTicker,
                          theme,
                          overviewSetting,
                          headerFormat,
                        ),
                      }}
                    >
                      {getFormattedValue(header, rowData, isTradeTicker)}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableVis;
