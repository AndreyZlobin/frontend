import { Button, ButtonProps } from '@self-kit/components';

import { useFormContext } from '../hooks';

export type FormSubmitButtonProps = Omit<ButtonProps, 'type'>;

/**
 * @description Используется для форм, отображает состояние загрузки, когда форма isSubmitting
 */
export const FormSubmitButton = ({
  children,
  loading,
}: FormSubmitButtonProps) => {
  const { formState } = useFormContext();

  return (
    <Button type="submit" loading={loading || formState.isSubmitting}>
      {children}
    </Button>
  );
};
