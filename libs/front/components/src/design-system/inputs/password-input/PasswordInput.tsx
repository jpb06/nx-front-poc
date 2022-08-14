import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';
import { useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

export interface PasswordInputProps<T> extends UseControllerProps<T> {
  label: string;
}

export function PasswordInput<T>(props: PasswordInputProps<T>): JSX.Element {
  const {
    field: { ref, value, onChange, ...otherFieldProps },
    fieldState,
  } = useController(props);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FormControl
      variant="outlined"
      fullWidth
      size="small"
      error={!!fieldState.error}
    >
      <InputLabel htmlFor={`outlined-adornment-${props.name}`}>
        {props.label}
      </InputLabel>
      <OutlinedInput
        id={`outlined-adornment-${props.name}`}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              onMouseDown={(event) => {
                event.preventDefault();
              }}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={props.label}
        onChange={(e) => {
          onChange(e.target.value === '' ? undefined : e.target.value);
        }}
        value={value || ''}
        {...otherFieldProps}
        inputRef={ref}
      />
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
}
