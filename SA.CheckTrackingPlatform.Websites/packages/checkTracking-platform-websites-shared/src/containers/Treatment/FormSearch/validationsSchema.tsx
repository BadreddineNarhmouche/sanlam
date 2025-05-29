import * as yup from "yup";

export default (props: any) => {
  return yup.object().shape(
    {
      reference: yup.string(),
    },
    []
  );
};
