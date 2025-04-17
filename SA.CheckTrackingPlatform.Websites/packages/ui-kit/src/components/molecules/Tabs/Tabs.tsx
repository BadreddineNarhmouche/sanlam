import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import { GeneralHelper } from '@reinsurance/helpers';
import { Icons, Tab } from '../../atoms';
import styles from './styles';

interface Links {
  label: any;
  delete?: boolean;
  to?: string;
  isHidden?: boolean;
}

interface Props {
  tabs: Links[];
  onChange?: any;
  value?: number | string;
  handleDeleteItem?: (productOrder: number) => void;
  scrollable?: boolean;
  isCentered?: boolean;
  tabStyle?: any;
}

const TabsComponent: React.FC<Props> = ({
  tabs,
  onChange,
  value,
  handleDeleteItem,
  scrollable,
  isCentered,
  tabStyle,
}) => {
  return (
    <Tabs
      value={GeneralHelper.isObjectNull(value) ? false : value}
      onChange={onChange}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
      {...(GeneralHelper.isObjectNotNull(isCentered)
        ? { centered: isCentered }
        : { centered: true })}
      {...(scrollable ? { variant: 'scrollable' } : { variant: 'standard' })}
      sx={styles}
    >
      {tabs?.map(
        (tab: any, index: number) =>
          (
            <Tab
              key={index}
              label={
                tab.delete && handleDeleteItem ? (
                  <span style={styles.spanContainer}>
                    <span>{tab.label}</span>
                    <span
                      style={styles.deleteIcon}
                      // You can only delete the selected tab
                      onClick={() => value === index && handleDeleteItem(index)}
                    >
                      <Icons.Delete />
                    </span>
                  </span>
                ) : (
                  tab.label
                )
              }
              {...(tab.icon && { icon: tab.icon })}
              {...(tab.to
                ? { to: tab.to, component: Link, value: tab.to }
                : {
                  value: index,
                })}
              {...(tab.isHidden? { style:styles.hiddenTab } : tabStyle && { style: tabStyle })}
            />
          ) as any,
      )}
    </Tabs>
  );
};

export default memo(TabsComponent);
