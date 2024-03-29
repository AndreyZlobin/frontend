import { forwardRef } from 'react';
import { ArrowROutlineLg } from '@self-kit/icons';

import { Typography } from '../Typography';
import { Grid } from '../Grid';
import { ButtonProps } from '../Button';

import { FlowButtonWrapper, TargetTextWrapper } from './styles';

export type FlowButtonProps = Omit<
  ButtonProps,
  'loading' | 'loadingIndicator' | 'loadingPosition' | 'size' | 'variant'
> & {
  /**
   * @targetText Текст на кнопке, указаывающий направление по флоу
   * */
  targetText: string;
};

export const FlowButton = forwardRef<HTMLButtonElement, FlowButtonProps>(
  (props, ref) => {
    const { children, targetText, ...restProps } = props;

    return (
      <FlowButtonWrapper
        ref={ref}
        {...restProps}
        endIcon={<ArrowROutlineLg width={32} height={32} />}
      >
        <Grid container justifyItems="start">
          <TargetTextWrapper variant="h7">{targetText}</TargetTextWrapper>
          <Typography variant="h6">{children}</Typography>
        </Grid>
      </FlowButtonWrapper>
    );
  },
);

export default FlowButton;
