import { ChangeEvent, SyntheticEvent, forwardRef, useContext } from 'react';

import { TextFieldProps } from '../TextField';
import { useForwardedRef, useToggle } from '../hooks';
import { DateMask } from '../utils/date';
import { CloseEventReason } from '../types';
import { ClickAwayListener } from '../ClickAwayListener';

import { DatePickerInput } from './DatePickerInput';
import { DatePickerPopper } from './DatePickerPopper';
import {
  MinMaxDateContext,
  MinMaxDateContextProvider,
} from './MinMaxDateContext';
import { MinMaxDate } from './types';
import { YearMonthDayPicker } from './YearMonthDayPicker';
import {
  useBaseDateInRange,
  useMaskedValue,
  useSelectedBaseDate,
} from './hooks';
import { MondayFirst } from './DayPicker';

export type DatePickerProps = MondayFirst &
  Partial<MinMaxDate> & {
    /**
     * @description Маска для инпута даты
     * @default 'DD.MM.YYYY'
     * */
    mask?: DateMask;
    /**
     * @description Обработчик изменения состояния. Передает только Date object, если дата невалидна, то будет Invalid date
     * */
    onChange?: (date?: Date) => void;
    onBlur?: () => void;
    onOpen?: () => void;
    onClose?: (
      event?: SyntheticEvent<Element, Event> | Event,
      reason?: CloseEventReason,
    ) => void;
    inputProps?: Omit<TextFieldProps, 'ref' | 'value' | 'onChange'>;
    disabled?: boolean;
    /**
     * @description Принимает только Date object, включая невалидную дату Invalid date
     * */
    value?: Date;
    className?: string;
  };

const DatePickerInner = forwardRef<
  HTMLInputElement,
  Omit<DatePickerProps, 'minDate' | 'maxDate'>
>(
  (
    {
      onChange,
      onOpen,
      onBlur,
      onClose,
      mask = 'DD.MM.YYYY',
      isMondayFirst,
      inputProps,
      disabled,
      value,
      className,
    },
    forwardedRef,
  ) => {
    const { maxDate, minDate } = useContext(MinMaxDateContext);
    const ref = useForwardedRef(forwardedRef);
    const [isOpenPopper, openPopper, closePopper] = useToggle({
      onActive: onOpen,
      onInactive: onClose,
    });

    const handleClosePopper = () => {
      // для данного компонента onBlur должен срабатывать после закрытия popover, а не во время выбора даты
      onBlur?.();
      closePopper(undefined, 'selectOption');
    };

    const { maskedValue, onChangeMaskedValue, onChangeMaskedDate } =
      useMaskedValue({
        currentValue: value,
        mask,
        onChangeValue: onChange,
      });

    const baseDate = useBaseDateInRange({ minDate, maxDate });
    const selectedBaseDate = useSelectedBaseDate(value);

    const handleDayPick = (date: Date) => {
      onChangeMaskedDate(date);
      handleClosePopper();
    };

    const handleChangeMaskInput = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeMaskedValue(e.target.value);
    };

    return (
      <ClickAwayListener
        isActive={isOpenPopper}
        onClickAway={handleClosePopper}
      >
        <div className={className}>
          <DatePickerInput
            {...inputProps}
            mask={mask}
            onNativeChange={handleChangeMaskInput}
            disabled={disabled}
            value={maskedValue}
            ref={ref}
            onFocus={openPopper}
          />
          <DatePickerPopper
            open={isOpenPopper}
            onClose={handleClosePopper}
            anchorEl={ref?.current}
          >
            <YearMonthDayPicker
              isMondayFirst={isMondayFirst}
              selectedDate={selectedBaseDate}
              onChange={handleDayPick}
              date={selectedBaseDate || baseDate}
            />
          </DatePickerPopper>
        </div>
      </ClickAwayListener>
    );
  },
);

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ minDate, maxDate, ...props }, forwardedRef) => (
    <MinMaxDateContextProvider minDate={minDate} maxDate={maxDate}>
      <DatePickerInner {...props} ref={forwardedRef} />
    </MinMaxDateContextProvider>
  ),
);
