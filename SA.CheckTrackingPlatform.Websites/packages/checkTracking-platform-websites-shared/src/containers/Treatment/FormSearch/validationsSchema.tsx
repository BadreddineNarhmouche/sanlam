import * as yup from 'yup';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: any) => {
  return yup.object().shape(
    {
      reference: yup.string(),
    },
    [],
  );
};
