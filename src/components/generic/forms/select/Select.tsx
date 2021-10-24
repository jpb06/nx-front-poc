import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@mui/material';
import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

export type SelectItem = {
  key: string;
  text: string;
};

export interface SelectProps<T> extends UseControllerProps<T> {
  label: string;
  data: SelectItem[];
}

export function Select<T>({ label, data, ...controllerProps }: SelectProps<T>) {
  const { field, fieldState } = useController(controllerProps);
  const { name } = controllerProps;

  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`${name}-select`}>{label}</InputLabel>
      <MuiSelect
        labelId={`${name}-select`}
        id={`${name}-select-helper`}
        size="small"
        {...field}
        label={label}
        error={!!fieldState.error}
      >
        {data.map(({ key, text }) => (
          <MenuItem key={key} value={key}>
            {text}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
