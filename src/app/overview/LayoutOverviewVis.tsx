'use client';
import React, { FC, useEffect, useState } from 'react';
import ContainerMainContent from '@/components/containers/ContainerMainContent';
import { Panel, PanelGroup } from 'react-resizable-panels';
import DividerResizable from '@/components/dividers/DividerResizable';
import VisPLPlot from './VisPLPlot';
import VisLeaderboard from './VisLeaderboard';
import VisInstrOverview from './VisInstrOverview';
import VisTradeTicker from './VisTradeTicker';
import { MOCK_USERS } from '@/constants/placeholderData';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10, schemeSet2 } from 'd3-scale-chromatic';
import { FetchedUserData } from '@/types/visDataTypes';
import { TableUserColors } from '@/types/TableVisTypes';
import useOverviewSettings from '@/stores/useOverviewSetting';
import { IOverviewSetting } from '@/types/useOverviewSettingTypes';

// USING MOCK_USERS

const OverviewContentLayout: FC = (): JSX.Element => {
  const { overviewSetting, setOverviewSetting } = useOverviewSettings();
  const [userColors, setUserColors] = useState<{ [userid: string]: string }>({});
  const [users, setUsers] = useState<FetchedUserData>(MOCK_USERS);
  const colorScale = scaleOrdinal(schemeSet2.concat(schemeCategory10));

  useEffect(() => {
    const loadedUserDict = MOCK_USERS.reduce((acc: any, user: { username: string; userid: number }) => {
      acc[user.userid] = {
        username: user.username,
        color: colorScale(user.username),
      };
      return acc;
    }, {});

    const loadedUsersSelected = Object.keys(loadedUserDict).reduce((acc: Record<number, boolean>, userid: string) => {
      acc[Number(userid)] = true;
      return acc;
    }, {} as Record<number, boolean>);

    setOverviewSetting({
      ...overviewSetting,
      userDict: loadedUserDict,
      usersSelected: loadedUsersSelected,
    });
  }, []);

  return (
    <ContainerMainContent>
      <PanelGroup direction="vertical">
        <Panel>
          <PanelGroup direction="horizontal">
            <Panel minSize={20}>
              <VisPLPlot />
            </Panel>
            <DividerResizable direction="vertical" />
            <Panel minSize={20}>
              <PanelGroup direction="vertical">
                <Panel minSize={20}>
                  <VisLeaderboard users={users} userColors={userColors} />
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
