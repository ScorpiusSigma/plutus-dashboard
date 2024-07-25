'use client';
import LayoutBoxVis from '@/components/layouts/LayoutBoxVis';
import { FetchedPLData, PLPlotDataPoint } from '@/types/visDataTypes';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FC, useCallback, useEffect, useState } from 'react';
import VisTeamList from './VisTeamList';
import { Panel, PanelGroup } from 'react-resizable-panels';
import DividerResizable from '@/components/dividers/DividerResizable';
import { MOCK_PL_DATA } from '@/constants/placeholderData';
import useOverviewSettings from '@/stores/useOverviewSetting';
import moment from 'moment';

interface IVisPLPlotProps {}

const VisPLPlot: FC<IVisPLPlotProps> = (): JSX.Element => {
  const theme = useTheme();
  const [fetchedPLData, setFetchedPLData] = useState<FetchedPLData[]>();
  const { overviewSetting, setOverviewSetting } = useOverviewSettings();
  const [PLPlotData, setPLPlotData] = useState<PLPlotDataPoint[]>([]);

  const chartStyles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      height: '100%',
      width: '100%',
    },
    title: {
      ml: 2,
    },
    divider: {
      mx: 2,
      my: 1,
      borderBottomWidth: 2,
      borderRadius: '5px',
      bgcolor: theme.palette.grey[theme.palette.mode === 'dark' ? 900 : 100],
    },
    gridStroke: theme.palette.grey[theme.palette.mode === 'dark' ? 700 : 400],
    xAxisTick: {
      fill: theme.palette.grey[theme.palette.mode === 'dark' ? 500 : 600],
      fontSize: 14,
    },
    yAxisTick: {
      fill: theme.palette.grey[theme.palette.mode === 'dark' ? 500 : 600],
      fontSize: 14,
    },
    tooltip: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'dark' ? 800 : 200],
      fontSize: '15px',
    },
    dividerResizable: {
      height: 'calc(100% - 38px)',
    },
  };

  const renderPlotLines = useCallback(
    (PLPlotdata: PLPlotDataPoint[], usersSelected: Record<string, boolean>): JSX.Element[] | void => {
      if (PLPlotdata.length !== 0) {
        const useridList = Object.keys(PLPlotdata[0]).filter(
          (key: string) => key !== 'dateTimeStamp' && usersSelected[key],
        );
        return useridList.map((userid: string) => (
          <Line
            key={userid}
            name={overviewSetting.userDict[Number(userid)].username || ''}
            type="linear"
            dataKey={userid}
            stroke={overviewSetting.userDict[Number(userid)].color}
            dot={false}
          />
        ));
      }
    },
    [PLPlotData, overviewSetting.usersSelected],
  );

  const transformDataToPlotPoints = useCallback(
    (fetchedPLData: FetchedPLData[], teamNames: string[]): PLPlotDataPoint[] => {
      const plotData: PLPlotDataPoint[] = [];
      const usersSelected: any = overviewSetting.usersSelected;
      const selectedUsers: number[] = Object.keys(usersSelected)
        .filter((userid: string) => {
          return usersSelected[Number(userid)] === true;
        })
        .map((userid: string) => Number(userid));
      fetchedPLData.forEach((userEntry) => {
        if (selectedUsers.includes(userEntry.user.userid)) {
          userEntry.pnl_history.forEach((entry, index) => {
            if (!plotData[index]) {
              plotData[index] = { dateTimeStamp: moment(entry.timestamp).format('DD-MM-YY') };
            }
            plotData[index][userEntry.user.userid] = entry.pnl;
          });
        }
      });
      return plotData;
    },
    [overviewSetting.usersSelected],
  );

  useEffect(() => {
    setFetchedPLData(MOCK_PL_DATA);
    if (fetchedPLData) {
      setPLPlotData(
        transformDataToPlotPoints(
          fetchedPLData,
          fetchedPLData.map((team) => team.user.username),
        ),
      );
      setOverviewSetting({
        ...overviewSetting,
        usersSelected: fetchedPLData.reduce((acc, userData) => {
          acc[userData.user.username] = true;
          return acc;
        }, {} as Record<string, boolean>),
      });
    }
  }, []);

  useEffect(() => {
    if (fetchedPLData) {
      const updatedPLPlotData = transformDataToPlotPoints(
        fetchedPLData,
        fetchedPLData.map((team) => team.user.username),
      );
      setPLPlotData(updatedPLPlotData);
    }
  }, [overviewSetting.usersSelected]);

  return (
    <Box sx={chartStyles.container}>
      <LayoutBoxVis margin="0">
        <Typography sx={chartStyles.title}>P&L Plot</Typography>
        <Divider orientation="horizontal" flexItem sx={chartStyles.divider} />
        <PanelGroup direction="horizontal">
          <Panel>
            <ResponsiveContainer>
              <VisTeamList />
            </ResponsiveContainer>
          </Panel>
          <DividerResizable direction="vertical" sx={chartStyles.dividerResizable} />
          <Panel>
            <ResponsiveContainer>
              <LineChart
                data={PLPlotData}
                margin={{
                  top: 20,
                  right: 20,
                  left: 0,
                  bottom: 35,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={chartStyles.gridStroke} />
                <XAxis dataKey="dateTimeStamp" tick={chartStyles.xAxisTick} />
                <YAxis tick={chartStyles.yAxisTick} />
                <Tooltip contentStyle={chartStyles.tooltip} />
                {renderPlotLines(PLPlotData, overviewSetting.usersSelected || [])}
              </LineChart>
            </ResponsiveContainer>
          </Panel>
        </PanelGroup>
      </LayoutBoxVis>
    </Box>
  );
};

export default VisPLPlot;
