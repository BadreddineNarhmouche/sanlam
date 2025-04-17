import React, { memo } from 'react';
import Accordion from '../../atoms/Accordion/Accordion';

interface Panels {
  component: React.ReactNode;
}

interface Props {
  accordions: Panels[];
}

const AccordionsComponent: React.FC<Props> = ({ accordions }) => {
  return (
    <>
      {accordions?.map(
        (accordion: any, index: number) =>
          (
            <Accordion
              key={index}
              title={accordion.title}
              expandedValue={index}
            >
              {accordion.component}
            </Accordion>
          ) as any,
      )}
    </>
  );
};

export default memo(AccordionsComponent);
