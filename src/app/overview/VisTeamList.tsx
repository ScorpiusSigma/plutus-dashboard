import LayoutBoxVis from '@/components/layouts/LayoutBoxVis';
import useOverviewSettings from '@/stores/useOverviewSetting';
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FC, useCallback, useEffect, useState } from 'react';

interface IVisEntityListProps {
  teamColors: { [key: string]: string };
}

const VisTeamList: FC<IVisEntityListProps> = ({ teamColors }): JSX.Element => {
  const theme = useTheme();
  const { overviewSetting, setOverviewSetting } = useOverviewSettings();
  const [sortedTeams, setSortedTeams] = useState<string[]>([]);
  const [datagridSelection, setDatagridSelection] = useState<any[]>([]);

  const handleTeamSelection = useCallback(
    (datagridSelection: number[]): void => {
      const teamsSelected: string[] = datagridSelection.map((index: number) => sortedTeams[index - 1]);
      const updatedTeamsSelected = Object.keys(overviewSetting.teamsSelected).reduce((acc, teamName) => {
        acc[teamName] = teamsSelected.includes(teamName);
        return acc;
      }, {} as Record<string, boolean>);
      setOverviewSetting({ ...overviewSetting, teamsSelected: updatedTeamsSelected });
    },
    [datagridSelection],
  );

  const columns: GridColDef[] = [
    {
      field: 'teamName',
      headerName: 'Team Name',
      flex: 1,
      renderCell: (params) => <Box sx={{ color: teamColors[params.value] }}>{params.value}</Box>,
    },
  ];

  const rows = sortedTeams.map((teamName, index) => ({
    id: index + 1,
    teamName,
  }));

  useEffect(() => {
    if (overviewSetting.teamsSelected) {
      const teams = [...Object.keys(overviewSetting.teamsSelected)].sort();
      const initialSelection = teams.reduce((acc: number[], teamName, index) => {
        if (overviewSetting.teamsSelected[teamName]) {
          acc.push(index + 1);
        }
        return acc;
      }, []);

      setSortedTeams(teams);
      setDatagridSelection(initialSelection);
    }
  }, []);

  useEffect(() => {
    handleTeamSelection(datagridSelection);
  }, [datagridSelection]);

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
          rowSelectionModel={datagridSelection}
          onRowSelectionModelChange={(rowsSelected) => {
            setDatagridSelection(rowsSelected);
          }}
          hideFooter
        />
      </LayoutBoxVis>
    </Box>
  );
};

export default VisTeamList;
