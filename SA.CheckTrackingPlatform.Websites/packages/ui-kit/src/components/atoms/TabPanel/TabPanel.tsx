import { memo } from 'react';

interface Props {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanelComponent: React.FC<Props> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div hidden={value !== index} id={`tabpanel-${index}`} {...other}>
      {value === index && children}
    </div>
  );
};

export default memo(TabPanelComponent);
