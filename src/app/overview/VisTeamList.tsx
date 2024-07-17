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
        <DataGrid
          className={`${theme.palette.mode === 'dark' ? 'dark-scrollbar' : 'light-scrollbar'}`}
          sx={{
            border: 0,
            '& .MuiDataGrid-columnHeader': {
              bgcolor: `${theme.palette.mode === 'dark' ? theme.palette.grey[900] : 'none'}`,
            },
            '& .MuiDataGrid-scrollbarFiller': {
              bgcolor: `${theme.palette.mode === 'dark' ? theme.palette.grey[900] : 'none'}`,
            },

            '& .MuiSvgIcon-root': {
              bgcolor: `${theme.palette.mode === 'dark' ? 'theme.palette.grey[900]' : 'none'}`,
              ':focus': {
                bgcolor: '#5b3fa0',
              },
            },
            height: 'calc(100% - 15px)',
          }}
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
