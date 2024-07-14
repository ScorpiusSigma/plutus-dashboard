'use client';
import LayoutBoxVis from '@/components/layouts/LayoutBoxVis';
import { FetchedPLData, PLPlotDataPoint } from '@/types/visDataTypes';
import { Box, Typography, useTheme } from '@mui/material';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { schemeCategory10, schemeSet2 } from 'd3-scale-chromatic';
import { scaleOrdinal } from 'd3-scale';
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import VisTeamList from './VisTeamList';
import { Panel, PanelGroup } from 'react-resizable-panels';
import DividerResizable from '@/components/dividers/DividerResizable';
import { MOCK_PL_DATA } from '@/constants/placeholderData';
import useOverviewSettings from '@/stores/useOverviewSetting';
import moment from 'moment';

// USING MOCK_PL_DATA //

interface IVisPLPlotProps {
  userColors: { [key: string]: string };
  setUserColors: Dispatch<SetStateAction<{ [key: string]: string }>>;
}

const VisPLPlot: FC<IVisPLPlotProps> = ({ userColors, setUserColors }): JSX.Element => {
  const theme = useTheme();
  const { overviewSetting, setOverviewSetting } = useOverviewSettings();
  const [pLDataFetched, setPLDataFetched] = useState<FetchedPLData[]>([]);
  const [PLPlotdata, setPLPlotData] = useState<PLPlotDataPoint[]>([]);

  const renderPlotLines = useCallback(
    (PLPlotdata: PLPlotDataPoint[], teamsSelected: Record<string, boolean>): JSX.Element[] | void => {
      if (PLPlotdata.length !== 0) {
        const keys = Object.keys(PLPlotdata[0]).filter((key: string) => key !== 'dateTimeStamp' && teamsSelected[key]);
        return keys.map((key: string) => (
          <Line key={key} type="linear" dataKey={key} stroke={userColors[key]} dot={false} />
        ));
      }
    },
    [PLPlotdata, overviewSetting.teamsSelected],
  );

  const transformDataToPlotPoints = useCallback(
    (data: FetchedPLData[], teamNames: string[]): PLPlotDataPoint[] => {
      const plotData: PLPlotDataPoint[] = [];
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
      console.log(plotData);
      return plotData;
    },
    [overviewSetting.teamsSelected],
  );

  // ----- Mock data is fetched here ----- //
  useEffect(() => {
    setPLDataFetched(MOCK_PL_DATA);
    setPLPlotData(
      transformDataToPlotPoints(
        MOCK_PL_DATA,
        MOCK_PL_DATA.map((team) => team.user.username),
      ),
    );
    setOverviewSetting({
      ...overviewSetting,
      teamsSelected: MOCK_PL_DATA.reduce((acc, userData) => {
        acc[userData.user.username] = true;
        return acc;
      }, {} as Record<string, boolean>),
    });
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
        <Typography sx={{ ml: 2 }}>P&L Plot</Typography>
        <PanelGroup direction="horizontal">
          <Panel>
            <ResponsiveContainer>
              <VisTeamList teamColors={userColors} />
            </ResponsiveContainer>
          </Panel>
          <DividerResizable direction="vertical" />
          <Panel>
            <ResponsiveContainer>
              <LineChart
                data={PLPlotdata}
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
                {renderPlotLines(PLPlotdata, overviewSetting.teamsSelected || [])}
              </LineChart>
            </ResponsiveContainer>
          </Panel>
        </PanelGroup>
      </LayoutBoxVis>
    </Box>
  );
};

export default VisPLPlot;
