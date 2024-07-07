import LayoutBoxVis from '@/components/layouts/LayoutBoxVis';
import useOverviewSettings from '@/stores/useOverviewSetting';
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FC, useEffect, useState } from 'react';

interface IVisEntityListProps {
  teamColors: { [key: string]: string };
}

const VisTeamList: FC<IVisEntityListProps> = ({ teamColors }): JSX.Element => {
  const theme = useTheme();
  const { overviewSetting } = useOverviewSettings();
  const [sortedTeams, setSortedTeams] = useState<string[]>([]);

  const columns: GridColDef[] = [
    {
      field: 'teamName',
      headerName: 'Team Name',
      flex: 1,
      renderCell: (params) => <span style={{ color: teamColors[params.value] }}>{params.value}</span>,
    },
  ];

  const rows = sortedTeams.map((teamName, index) => ({
    id: index + 1,
    teamName,
  }));

  useEffect(() => {
    if (overviewSetting.teamsSelected) {
      const teams = [...overviewSetting.teamsSelected].sort();
      setSortedTeams(teams);
    }
  }, [overviewSetting.teamsSelected]);

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
          hideFooter
        />
      </LayoutBoxVis>
    </Box>
  );
};

export default VisTeamList;
