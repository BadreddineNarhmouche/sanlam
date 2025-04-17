import { createContext, useContext, useState } from 'react';

const FormContext = createContext<any>([]);

export const useFormContext = () => {
  return useContext(FormContext);
};

export const FormContextProvider = ({ children }: any) => {
  const [formData, setFormData] = useState<any>([]);

  const updateFormData = (formKey: any, values: any) => {
    setFormData((prevFormData: any) => {
      const existingIndex = prevFormData.findIndex(
        (data: any) => data.formKey === formKey,
      );
      if (existingIndex !== -1) {
        // If the formKey exists, update the formValues property
        const updatedFormData = [...prevFormData];
        updatedFormData[existingIndex] = {
          formKey,
          formValues: values,
        };
        return updatedFormData;
      } else {
        // If the formKey doesn't exist, add a new object to formData
        return [...prevFormData, { formKey, formValues: values }];
      }
    });
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};
