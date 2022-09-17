import { TextField } from '@mui/material';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

export interface InputProps<T extends FieldValues>
  extends UseControllerProps<T> {
  label: string;
  loading?: boolean;
}

export function Input<T extends FieldValues>(
  props: InputProps<T>
): JSX.Element {
  const {
    field: { ref, value, onChange, ...otherFieldProps },
    fieldState,
  } = useController(props);

  return (
    <TextField
      label={props.label}
      variant="outlined"
      size="small"
      fullWidth
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      onChange={(e) => {
        onChange(e.target.value === '' ? undefined : e.target.value);
      }}
      value={value || ''}
      {...otherFieldProps}
      inputRef={ref}
    />
  );
}
