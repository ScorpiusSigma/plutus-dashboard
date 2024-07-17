import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import { FC } from 'react';
import { TableHeaderFormat, TableUserColors } from '@/types/TableVisTypes';

interface ITableVisProps {
  headerFormat: TableHeaderFormat;
  userColors?: TableUserColors;
  data: any[];
}

const TableVis: FC<ITableVisProps> = ({ headerFormat, data, userColors }): JSX.Element => {
  const theme = useTheme();

  return (
    <TableContainer
      component={Paper}
      className={`${theme.palette.mode === 'dark' ? 'dark-scrollbar' : 'light-scrollbar'}`}
      sx={{
        height: '100%',
        my: 1,
        '& .MuiDataGrid-scrollbarFiller': {
          bgcolor: `${theme.palette.mode === 'dark' ? theme.palette.grey[900] : 'none'}`,
        },
        '& .MuiTableCell-root': {
          py: '5px',
        },
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(headerFormat).map((header: string, index: number) => {
              return <TableCell key={index}>{headerFormat[header].columnHeader}</TableCell>;
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
                        color:
                          header === 'username'
                            ? userColors?.[header]
                            : header === 'auto'
                            ? ''
                            : headerFormat[header].color,
                      }}
                    >
                      {rowData[header]}
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
