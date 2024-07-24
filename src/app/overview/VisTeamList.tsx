import LayoutBoxVis from '@/components/layouts/LayoutBoxVis';
import useOverviewSettings from '@/stores/useOverviewSetting';
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { FC, useCallback, useEffect, useState } from 'react';

interface IVisEntityListProps {}

interface ISortedUser {
  userid: number;
  username: string;
  color: string;
}

const VisTeamList: FC<IVisEntityListProps> = (): JSX.Element => {
  const theme = useTheme();
  const { overviewSetting, setOverviewSetting } = useOverviewSettings();
  const [sortedUsers, setSortedUsers] = useState<ISortedUser[]>([]);
  const [datagridSelection, setDatagridSelection] = useState<any[]>([]);

  const columns: GridColDef[] = [
    {
      field: 'username',
      headerName: 'User',
      flex: 1,
      renderCell: (params) => {
        const user = params.row.user;
        return <Box sx={{ color: overviewSetting.userDict[user.userid].color }}>{user.username}</Box>;
      },
      sortComparator: (v1, v2, cellParams1, cellParams2) => {
        const username1 = sortedUsers[Number(cellParams1.id) - 1].username;
        const username2 = sortedUsers[Number(cellParams2.id) - 1].username;
        return username2.localeCompare(username1);
      },
    },
  ];

  const rows = sortedUsers.map((user: ISortedUser, index) => ({
    id: index + 1,
    user,
  }));

  const handleUserSelection = useCallback(
    (datagridSelection: GridRowSelectionModel, sortedUsers: ISortedUser[]): void => {
      const usersSelected = sortedUsers.reduce((acc, user) => {
        acc[user.userid] = false;
        return acc;
      }, {} as Record<number, boolean>);

      datagridSelection.forEach((index) => {
        const userId = sortedUsers[Number(index) - 1].userid;
        usersSelected[userId] = true;
      });
      setOverviewSetting({ ...overviewSetting, usersSelected: usersSelected });
      setDatagridSelection(datagridSelection);
    },
    [datagridSelection],
  );

  useEffect(() => {
    const initUserDict = overviewSetting.userDict;
    const initSortedUsers: ISortedUser[] = Object.keys(initUserDict).map((userid: string) => ({
      userid: Number(userid),
      username: initUserDict[Number(userid)].username,
      color: initUserDict[Number(userid)].color,
    }));
    const initialSelection = initSortedUsers.reduce((acc: number[], user: ISortedUser, index: number) => {
      if (overviewSetting.usersSelected[user.userid]) {
        acc.push(index + 1);
      }
      return acc;
    }, []);
    setSortedUsers(initSortedUsers);
    setDatagridSelection(initialSelection);
  }, []);

  const dataGridStyles = {
    border: 0,
    '& .MuiDataGrid-columnHeader': {
      maxHeight: '50px !important',
      minHeight: '50px !important',
      height: '50px !important',
      bgcolor: `${theme.palette.mode === 'dark' ? theme.palette.grey[900] : 'none'}`,
    },
    '& .MuiDataGrid-scrollbarFiller': {
      bgcolor: `${theme.palette.mode === 'dark' ? theme.palette.grey[900] : 'none'}`,
      '&:hover': {
        bgcolor: `${theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200]}`,
      },
    },
    '& .MuiDataGrid-row': {
      maxHeight: '40px !important',
      minHeight: '40px !important',
      height: '40px !important',
      justifyItems: 'center',
      alignItems: 'center',
      '&.Mui-selected': {
        backgroundColor: `${theme.palette.mode === 'dark' ? '#2a2645' : '#e1deef'}`,
        '&:hover': {
          bgcolor: `${theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200]}`,
        },
      },
      '&:hover': {
        backgroundColor: 'lightpurple',
      },
    },
    '& .MuiBox-root': {
      display: 'flex',
      maxHeight: '40px !important',
      minHeight: '40px !important',
      height: '40px !important',
      alignItems: 'center',
      textAlign: 'center',
    },
    '& .MuiDataGrid-cell': {
      maxHeight: '40px !important',
      minHeight: '40px !important',
      height: '40px !important',
      justifyItems: 'center',
      alignItems: 'center',
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.grey[500],
    },
    height: '100%',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%',
        width: '100%',
        mb: '10px',
        pb: '15px',
      }}
    >
      <LayoutBoxVis margin="0" sx={{ border: 'none' }}>
        <DataGrid
          className={`${theme.palette.mode === 'dark' ? 'dark-scrollbar' : 'light-scrollbar'}`}
          sx={dataGridStyles}
          rows={rows}
          columns={columns}
          checkboxSelection
          rowSelectionModel={datagridSelection}
          onRowSelectionModelChange={(rowsSelected) => {
            handleUserSelection(rowsSelected, sortedUsers);
          }}
          hideFooter
        />
      </LayoutBoxVis>
    </Box>
  );
};

export default VisTeamList;
