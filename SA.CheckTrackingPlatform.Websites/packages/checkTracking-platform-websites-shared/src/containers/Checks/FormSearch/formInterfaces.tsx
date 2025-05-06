import { FilterCriteriaService } from '@checkTracking/helpers';
import { IntlShape } from 'react-intl';

interface FieldOption {
  label: string;
  value: string | number;
}

interface Field {
  fieldId: string;
  type: string;
  label: string | any;
  options?: FieldOption[];
  gridOccupancy: number;
}

export interface FormProps {
  intl: IntlShape;
  initialValues: Object;
  handleSubmit: (values: any) => any;
  handleResetFilter: () => any;
  resetedValues?: FilterCriteriaService;
  URLquittanceStatusDescriptionID?: number;
  fieldsToDisplay?: Field[];
  isLoading: boolean;
}

export interface FormValues {
  [key: string]: any;
}
