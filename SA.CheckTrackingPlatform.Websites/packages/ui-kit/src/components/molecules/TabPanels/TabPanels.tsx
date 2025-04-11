import React, { memo } from 'react';
import { Box, TabPanel } from '../../atoms';

interface Panels {
  component: React.ReactNode;
}

interface Props {
  panels: Panels[];
  value: number;
}

const TabPanelsComponent: React.FC<Props> = ({ panels, value }) => {
  return (
    <>
      {panels?.map(
        (panel: any, index: number) =>
          (
            <Box key={index}>
              <TabPanel index={index} value={value}>
                {panel.component}
              </TabPanel>
            </Box>
          ) as any,
      )}
    </>
  );
};

export default memo(TabPanelsComponent);
