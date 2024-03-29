import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from '@mui/material';
import React, { ReactNode } from 'react';
import { ChevronDOutlineMd } from '@self-kit/icons';

import { Tag } from '../Tag';
import { FormHelperText } from '../FormHelperText';
import { CircularProgress } from '../CircularProgress';
import { MenuItem } from '../MenuItem';
import { WithoutEmotionSpecific } from '../types';

import {
  SelectPlaceholder,
  SelectProgressWrapper,
  SelectTagsWrapper,
} from './styles';

export type SelectProps<Value> = WithoutEmotionSpecific<
  MuiSelectProps<Value>
> & {
  loading?: boolean;
  placeholder?: string;
  getOptionLabel?: (value: string | number) => string | number;
  helperText?: ReactNode;
  success?: boolean;
  error?: boolean;
  label?: string;
};

export const Select = <Value,>({
  required,
  getOptionLabel = (value) => value,
  placeholder,
  helperText,
  loading,
  success,
  children,
  error,
  label,
  ...props
}: SelectProps<Value>) => {
  const renderValue = (selectedOptions: Value): ReactNode => {
    if (Array.isArray(selectedOptions) && selectedOptions.length) {
      return (
        <SelectTagsWrapper>
          {selectedOptions.map((option) => {
            const optionLabel = getOptionLabel(option);

            return <Tag key={option} color="grey" label={optionLabel} />;
          })}
        </SelectTagsWrapper>
      );
    }

    if (
      (Array.isArray(selectedOptions) || typeof selectedOptions === 'string') &&
      !selectedOptions.length
    ) {
      return placeholder;
    }

    return getOptionLabel(selectedOptions as string | number);
  };

  const isNoData = !Boolean(React.Children.count(children));

  return (
    <FormControl error={error}>
      {label && (
        <InputLabel htmlFor="grouped-select" required={required}>
          {label}
        </InputLabel>
      )}
      <MuiSelect
        {...props}
        renderValue={renderValue}
        IconComponent={ChevronDOutlineMd}
        displayEmpty
      >
        <SelectPlaceholder value="">{placeholder}</SelectPlaceholder>
        {loading && (
          <SelectProgressWrapper>
            <CircularProgress color="primary" />
          </SelectProgressWrapper>
        )}
        {!loading && children}
        {!loading && isNoData && <MenuItem disabled>Нет данных</MenuItem>}
      </MuiSelect>
      <FormHelperText error={error} success={success}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};
