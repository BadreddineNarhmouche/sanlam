import { GeneralHelper } from '@reinsurance/helpers';

const styles = {
  container: (isError: any) => ({
    border: `1px solid ${
      GeneralHelper.isStringNullOrEmpty(isError) || !isError
        ? '#E6F1FA'
        : '#d32f2f'
    }`,
    borderRadius: '8px',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  fileIcon: {
    backgroundColor: '#E6F1FA',
    borderRadius: '2px',
    padding: '4px',
    width: '32px',
    height: '32px',
  },
  deleteIcon: { textAlign: 'right' },
  fileNameText: {
    fontWeight: '500',
    color: 'base.greyDark',
  },
  fileSizeText: {
    fontWeight: '400',
    color: 'base.greyMain',
  },
  errorText: {
    fontWeight: '400',
    color: '#d32f2f',
  },
  inputFile: { display: 'none' },
};

export default styles;
