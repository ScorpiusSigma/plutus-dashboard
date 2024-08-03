'use client';
import { useCallback, useEffect, useState } from 'react';
import ButtonAction from '@/components/buttons/ButtonAction';
import InputSelectDropdown from '@/components/inputs/InputSelectDropdown';
import InputText from '@/components/inputs/InputText';
import LayoutBoxVis from '@/components/layouts/LayoutBoxVis';
import { DATA_POLLING_RATES } from '@/constants/constantsFilter';
import useOverviewSettings from '@/stores/useOverviewSetting';
import { Box, Grid, Typography } from '@mui/material';

const FilterBar = (): JSX.Element => {
  const { overviewSetting, setOverviewSetting } = useOverviewSettings();
  const [dataPollingRate, setDataPollingRate] = useState<number>(1);

  const handlePollRateChange = useCallback((): void => {
    setOverviewSetting({ ...overviewSetting, dataPollingRate: dataPollingRate });
  }, [dataPollingRate]);

  useEffect(() => {
    handlePollRateChange();
  }, [dataPollingRate]);

  return (
    <Box sx={{ width: 'fit', pt: 1, pb: 2, mx: 4 }}>
      <LayoutBoxVis margin={0}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Grid container spacing={4} alignItems="center">
              <Grid item>
                <Typography>Filter:</Typography>
              </Grid>
              <Grid item>
                <InputText placeholder="Input Instrument" />
              </Grid>
              <Grid item>
                <ButtonAction>Apply Filter</ButtonAction>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={4} alignItems="center">
              <Grid item>
                <Typography>Setting:</Typography>
              </Grid>
              <Grid item>
                <InputSelectDropdown
                  options={DATA_POLLING_RATES}
                  setValue={setDataPollingRate}
                  label="Data Polling Rate"
                  valuePrefix=" / s"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </LayoutBoxVis>
    </Box>
  );
};

export default FilterBar;
