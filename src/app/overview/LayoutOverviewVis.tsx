'use client';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import ContainerMainContent from '@/components/containers/ContainerMainContent';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import DividerResizable from '@/components/dividers/DividerResizable';
import VisPLPlot from './VisPLPlot';
import VisLeaderboard from './VisLeaderboard';
import VisInstrOverview from './VisInstrOverview';
import VisTradeTicker from './VisTradeTicker';
import { MOCK_USERS } from '@/constants/placeholderData';
import { UserData } from '@/types/visDataTypes';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10, schemeSet2 } from 'd3-scale-chromatic';

const OverviewContentLayout: FC = (): JSX.Element => {
  const [userColors, setUserColors] = useState<{ [key: string]: string }>({});
  const colorScale = scaleOrdinal(schemeSet2.concat(schemeCategory10));

  useEffect(
    () =>
      setUserColors(
        MOCK_USERS.reduce((acc, userData) => {
          acc[userData.username] = colorScale(userData.username);
          return acc;
        }, {} as { [key: string]: string }),
      ),
    [],
  );

  return (
    <ContainerMainContent>
      <PanelGroup direction="vertical">
        <Panel>
          <PanelGroup direction="horizontal">
            <Panel minSize={20}>
              <VisPLPlot userColors={userColors} setUserColors={setUserColors} />
            </Panel>
            <DividerResizable direction="vertical" />
            <Panel minSize={20}>
              <PanelGroup direction="vertical">
                <Panel minSize={20}>
                  <VisLeaderboard userColors={userColors} />
                </Panel>
                <DividerResizable direction="horizontal" />
                <Panel minSize={20}>
                  <VisInstrOverview />
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </Panel>
        <DividerResizable direction="horizontal" />
        <Panel minSize={20}>
          <VisTradeTicker />
        </Panel>
      </PanelGroup>
    </ContainerMainContent>
  );
};

export default OverviewContentLayout;
