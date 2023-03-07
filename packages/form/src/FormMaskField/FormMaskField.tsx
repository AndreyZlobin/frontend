import { MaskField, MaskFieldProps } from '@self-kit/components';

import { useFormFieldProps } from '../hooks';
import { WithFormFieldProps } from '../types';

export type FormMaskFieldProps<FieldValues extends object> = WithFormFieldProps<
  MaskFieldProps,
  FieldValues
>;

/**
 * @description Адаптер для MaskField
 */
export const FormMaskField = <FieldValues extends object>(
  props: FormMaskFieldProps<FieldValues>,
) => {
  const fieldProps = useFormFieldProps<
    FormMaskFieldProps<FieldValues>,
    FieldValues
  >(props);

  return <MaskField {...fieldProps} />;
};
