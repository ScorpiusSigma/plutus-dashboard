'use client';
import LayoutBoxVis from '@/components/layouts/LayoutBoxVis';
import { PLFetchedData, PLPlotDataPoint } from '@/types/visDataTypes';
import { Box, Typography, useTheme } from '@mui/material';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { schemeCategory10, schemeSet2 } from 'd3-scale-chromatic';
import { scaleOrdinal } from 'd3-scale';
import { FC, useEffect, useState } from 'react';
import VisTeamList from './VisTeamList';
import { Panel, PanelGroup } from 'react-resizable-panels';
import DividerResizable from '@/components/dividers/DividerResizable';
import { MOCK_PL_DATA } from '@/constants/placeholderData';
import useOverviewSettings from '@/stores/useOverviewSetting';
import moment from 'moment';

const VisPLPlot: FC = (): JSX.Element => {
  const theme = useTheme();
  const { overviewSetting, setOverviewSetting } = useOverviewSettings();
  const [pLDataFetched, setPLDataFetched] = useState<PLFetchedData[]>([]);
  const [PLPlotdata, setPLPlotData] = useState<PLPlotDataPoint[]>([]);
  const colorScale = scaleOrdinal(schemeSet2.concat(schemeCategory10));
  const [teamColors, setTeamColors] = useState<{ [key: string]: string }>({});

  const renderPlotLines = (PLPlotdata: PLPlotDataPoint[]): JSX.Element[] | void => {
    if (PLPlotdata.length !== 0) {
      const keys = Object.keys(PLPlotdata[0]).filter((key) => key !== 'dateTimeStamp');
      return keys.map((key: string) => (
        <Line key={key} type="linear" dataKey={key} stroke={teamColors[key]} dot={false} />
      ));
    }
  };

  const transformDataToPlotPoints = (data: PLFetchedData[]): PLPlotDataPoint[] => {
    const plotData: PLPlotDataPoint[] = [];
    data.forEach((team) => {
      team.pnl_history.forEach((entry, index) => {
        if (!plotData[index]) {
          plotData[index] = { dateTimeStamp: moment(entry.timestamp).format('DD-MM-YY') };
        }
        plotData[index][team.name] = entry.pnl;
      });
    });
    return plotData;
  };

  // ----- Mock data is fetched here ----- //
  useEffect(() => {
    setPLDataFetched(MOCK_PL_DATA);
    setPLPlotData(transformDataToPlotPoints(MOCK_PL_DATA));

    setOverviewSetting({ ...overviewSetting, teamsSelected: MOCK_PL_DATA.map((item) => item.name) });

    const colors = MOCK_PL_DATA.reduce((acc, item, index) => {
      acc[item.name] = colorScale(item.name);
      return acc;
    }, {} as { [key: string]: string });
    setTeamColors(colors);
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
              <VisTeamList teamColors={teamColors} />
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
                {renderPlotLines(PLPlotdata)}
              </LineChart>
            </ResponsiveContainer>
          </Panel>
        </PanelGroup>
      </LayoutBoxVis>
    </Box>
  );
};

export default VisPLPlot;
