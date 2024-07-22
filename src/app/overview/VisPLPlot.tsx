'use client';
import LayoutBoxVis from '@/components/layouts/LayoutBoxVis';
import { FetchedPLData, PLPlotDataPoint } from '@/types/visDataTypes';
import { Box, Typography, useTheme } from '@mui/material';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import VisTeamList from './VisTeamList';
import { Panel, PanelGroup } from 'react-resizable-panels';
import DividerResizable from '@/components/dividers/DividerResizable';
import { MOCK_PL_DATA } from '@/constants/placeholderData';
import useOverviewSettings from '@/stores/useOverviewSetting';
import moment from 'moment';

// USING MOCK_PL_DATA //

interface IVisPLPlotProps {}

const VisPLPlot: FC<IVisPLPlotProps> = (): JSX.Element => {
  const theme = useTheme();
  const [fetchedPLData, setFetchedPLData] = useState<FetchedPLData[]>();
  const { overviewSetting, setOverviewSetting } = useOverviewSettings();
  const [PLPlotData, setPLPlotData] = useState<PLPlotDataPoint[]>([]);

  const renderPlotLines = useCallback(
    (PLPlotdata: PLPlotDataPoint[], usersSelected: Record<string, boolean>): JSX.Element[] | void => {
      if (PLPlotdata.length !== 0) {
        const useridList = Object.keys(PLPlotdata[0]).filter(
          (key: string) => key !== 'dateTimeStamp' && usersSelected[key],
        );
        return useridList.map((userid: string) => (
          <Line
            key={userid}
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
    (data: FetchedPLData[], teamNames: string[]): PLPlotDataPoint[] => {
      const plotData: PLPlotDataPoint[] = [];
      const usersSelected: any = overviewSetting.usersSelected;
      const selectedUsers: string[] = Object.keys(usersSelected).filter((userid: string) => {
        usersSelected[Number(userid)] === true;
      });
      data.forEach((userEntry) => {
        if (teamNames.includes(userEntry.user.username)) {
          userEntry.pnl_history.forEach((entry, index) => {
            if (!plotData[index]) {
              plotData[index] = { dateTimeStamp: moment(entry.timestamp).format('DD-MM-YY') };
            }
            plotData[index][userEntry.user.username] = entry.pnl;
          });
        }
      });
      return plotData;
    },
    [overviewSetting.usersSelected],
  );

  // ----- Mock data is fetched here ----- //
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
      console.log(updatedPLPlotData);
      setPLPlotData(updatedPLPlotData);
    }
  }, [overviewSetting.usersSelected]);

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
        <Typography sx={{ ml: 2 }}>P&L Plot</Typography>
        <PanelGroup direction="horizontal">
          <Panel>
            <ResponsiveContainer>
              <VisTeamList />
            </ResponsiveContainer>
          </Panel>
          <DividerResizable direction="vertical" />
          <Panel>
            <ResponsiveContainer>
              <LineChart
                data={PLPlotData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 20,
                  bottom: 15,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dateTimeStamp" />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: theme.palette.grey[800], fontSize: '15px' }} />
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
