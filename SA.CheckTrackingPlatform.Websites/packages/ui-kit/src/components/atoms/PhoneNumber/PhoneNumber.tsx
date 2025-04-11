import { GeneralHelper, translate } from '@reinsurance/helpers';
import { useField } from 'formik';
import { useState } from 'react';
import { injectIntl } from 'react-intl';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import fr from 'react-phone-number-input/locale/fr.json';
import 'react-phone-number-input/style.css';
import InputComponent from './InputComponent';
import styles from './styles';

const PhoneNumber = (props: any) => {
  const [, meta] = useField(props);
  const [value, setValue] = useState(props.value ?? '');

  return (
    <>
      <PhoneInput
        international
        defaultCountry="MA"
        value={value}
        error={props.error}
        inputComponent={InputComponent}
        onChange={
          /* istanbul ignore next */ (e: any) => {
            setValue(e);
            if (typeof e !== 'undefined') {
              props.setFieldValue(props.name, e);
            } else {
              props.setFieldValue(props.name, '');
            }
          }
        }
        labels={fr}
        label={props.label}
      />

      {props.error ||
      (!GeneralHelper.isStringNullOrWhiteSpace(value) &&
        !isValidPhoneNumber(value)) ? (
        <p style={styles.errorMessage}>
          {value === ''
            ? meta.error
            : translate('input.error.invalid', props.intl)}
        </p>
      ) : null}
    </>
  );
};

export default injectIntl(PhoneNumber);
