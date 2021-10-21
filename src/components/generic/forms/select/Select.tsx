import {
  Alert,
  CircularProgress,
  FormControl,
  FormHelperText,
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
  helpText?: string;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  data?: SelectItem[];
}

export function Select<T>({
  label,
  helpText,
  isLoading,
  isError,
  error,
  data,
  ...controllerProps
}: SelectProps<T>) {
  const { field, fieldState } = useController(controllerProps);
  const { name } = controllerProps;
  const MenuItems = [];

  if (isLoading) {
    MenuItems.push(
      <MenuItem key="loading" value="loading" disabled>
        <CircularProgress />
      </MenuItem>
    );
  } else if (isError) {
    MenuItems.push(
      <MenuItem key="error" value="error" disabled>
        <Alert severity="error">
          {error ?? 'An error occurred while retrieving the roles'}
        </Alert>
      </MenuItem>
    );
  } else if (!data || data.length === 0) {
    MenuItems.push(
      <MenuItem key="no-data" value="no-data" disabled>
        <Alert severity="info">No data</Alert>
      </MenuItem>
    );
  } else {
    MenuItems.push(
      data.map(({ key, text }) => (
        <MenuItem key={key} value={key}>
          {text}
        </MenuItem>
      ))
    );
  }

  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`${name}-select`}>{label}</InputLabel>
      <MuiSelect
        labelId={`${name}-select`}
        id={`${name}-select-helper`}
        label={label}
        size="small"
        {...field}
        error={!!fieldState.error}
      >
        {MenuItems}
      </MuiSelect>
      {helpText && <FormHelperText>{helpText}</FormHelperText>}
    </FormControl>
  );
}
