import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { PDFViewer, CardContainer } from '@reinsurance/ui-kit';
import { HelpFilePaths } from '@reinsurance/helpers/lib/helpers/ConstantsHelper';

const HelpPage = () => {
  const intl = useIntl();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CardContainer px={8} pt={8} pb={15.5}>
      <PDFViewer
        file={HelpFilePaths.generalSpecific}
        fileName={intl.formatMessage({ id: 'help.title' })}
      />
    </CardContainer>
  );
};

export default HelpPage;
