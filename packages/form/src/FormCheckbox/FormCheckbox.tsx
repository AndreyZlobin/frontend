import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@self-kit/ui';
import { useController } from 'react-hook-form';

import { useFieldErrorProps } from '../hooks';
import { WithFormFieldProps } from '../types';

/**
 * @description Тип значения, которое сетится в state формы
 */
export type FormCheckboxValue = boolean;

export type FormCheckboxProps<FieldValues extends object> = WithFormFieldProps<
  CheckboxProps,
  FieldValues
> & {
  success?: boolean;
};

/**
 * @description Адаптер для Checkbox
 */
export function FormCheckbox<FieldValues extends object>({
  success,
  ...props
}: FormCheckboxProps<FieldValues>) {
  const { field, fieldState } = useController(props);
  const errorProps = useFieldErrorProps(fieldState);

  return (
    <FormControl>
      <FormControlLabel
        control={<Checkbox {...field} {...props} />}
        label={props.title}
      />
      <FormHelperText error={errorProps.error} success={success}>
        {errorProps.helperText}
      </FormHelperText>
    </FormControl>
  );
}
