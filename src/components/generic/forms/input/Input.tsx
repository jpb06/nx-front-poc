import { CircularProgress, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

export interface InputProps<T> extends UseControllerProps<T> {
  label: string;
  loading?: boolean;
  onBlur?: () => void;
}

export function Input<T>(props: InputProps<T>) {
  const {
    field: { ref, ...otherFieldProps },
    fieldState,
  } = useController(props);

  return (
    <TextField
      label={props.label}
      variant="outlined"
      size="small"
      fullWidth
      error={fieldState.invalid}
      helperText={fieldState.error?.message ?? ' '}
      inputProps={{ 'aria-label': props.label }}
      InputProps={{
        endAdornment: props.loading && (
          <InputAdornment position='end'>
            <CircularProgress  size={18} />
          </InputAdornment>
        ),
      }}
      {...otherFieldProps}
      onBlur={props.onBlur}
      inputRef={ref}
    />
  );
}
