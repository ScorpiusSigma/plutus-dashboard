import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FC } from 'react';

interface ITableVisProps {
  headerFormat: { [columnHeader: string]: string };
  data: any[];
}

const TableVis: FC<ITableVisProps> = ({ headerFormat, data }): JSX.Element => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(headerFormat).map((header: string, index: number) => {
              return <TableCell key={index}>{header}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((rowData: any, rowIndex: number) => {
            return (
              <TableRow key={rowIndex}>
                {Object.keys(headerFormat).map((header: string, colIndex: number) => (
                  <TableCell key={colIndex} color={headerFormat[header]}>
                    {rowData[header]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableVis;
