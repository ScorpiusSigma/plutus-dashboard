'use client';
import React from 'react';
import ContainerMainContent from '@/components/containers/ContainerMainContent';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import DividerResizable from '@/components/dividers/DividerResizable';
import VisPLPlot from './VisPLPlot';
import VisLeaderboard from './VisLeaderboard';
import VisInstrOverview from './VisInstrOverview';
import VisTradeTicker from './VisTradeTicker';

const OverviewContentLayout = (): JSX.Element => {
  return (
    <ContainerMainContent>
      <PanelGroup direction="vertical">
        <Panel>
          <PanelGroup direction="horizontal">
            <Panel>
              <VisPLPlot />
            </Panel>
            <DividerResizable direction="vertical" />
            <Panel>
              <PanelGroup direction="vertical">
                <Panel>
                  <VisLeaderboard />
                </Panel>
                <DividerResizable direction="horizontal" />
                <Panel>
                  <VisInstrOverview />
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </Panel>
        <DividerResizable direction="horizontal" />
        <Panel>
          <VisTradeTicker />
        </Panel>
      </PanelGroup>
    </ContainerMainContent>
  );
};

export default OverviewContentLayout;
