import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  FormHelperText,
} from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';

export type SelectItem = {
  key: number;
  text: string;
};

export interface SelectProps<T> extends UseControllerProps<T> {
  label: string;
  data?: SelectItem[];
}

export function Select<T>({
  label,
  data,
  ...controllerProps
}: SelectProps<T>): JSX.Element | null {
  const { field, fieldState } = useController(controllerProps);
  const { name } = controllerProps;

  if (!data) {
    return null;
  }

  return (
    <FormControl fullWidth size="small" error={!!fieldState.error}>
      <InputLabel id={`${name}-select`}>{label}</InputLabel>
      <MuiSelect
        labelId={`${name}-select`}
        id={`${name}-select-helper`}
        size="small"
        {...field}
        label={label}
      >
        {data.map(({ key, text }) => (
          <MenuItem key={key} value={key}>
            {text}
          </MenuItem>
        ))}
      </MuiSelect>
      <FormHelperText>{fieldState.error?.message ?? ' '}</FormHelperText>
    </FormControl>
  );
}
