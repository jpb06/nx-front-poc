import {
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

interface SelectProps<T> extends UseControllerProps<T> {
  label: string;
  helpText?: string;
  items: Array<SelectItem>;
}

export function Select<T>(props: SelectProps<T>) {
  const { field } = useController(props);

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id={`${props.name}-select`}>{props.label}</InputLabel>
      <MuiSelect
        labelId={`${props.name}-select`}
        id={`${props.name}-select-helper`}
        label={props.label}
        size="small"
        {...field}
      >
        {props.items.map(({ key, text }) => (
          <MenuItem key={key} value={key}>
            {text}
          </MenuItem>
        ))}
      </MuiSelect>
      {props.helpText && <FormHelperText>{props.helpText}</FormHelperText>}
    </FormControl>
  );
}
