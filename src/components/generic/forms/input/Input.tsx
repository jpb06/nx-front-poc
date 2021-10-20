import { TextField } from '@mui/material';
import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

interface InputProps<T> extends UseControllerProps<T> {
  label: string;
}

export function Input<T>(props: InputProps<T>) {
  const { field, fieldState } = useController(props);

  return (
    <TextField
      label={props.label}
      variant="outlined"
      size="small"
      fullWidth
      error={fieldState.invalid}
      {...field}
    />
  );
}
