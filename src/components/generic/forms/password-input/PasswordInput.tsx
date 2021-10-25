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
import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

interface PasswordInputProps<T> extends UseControllerProps<T> {
  label: string;
}

export function PasswordInput<T>(props: PasswordInputProps<T>) {
  const {
    field: { ref, ...otherFieldProps },
    fieldState,
  } = useController(props);

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <FormControl
      variant="outlined"
      fullWidth
      size="small"
      error={fieldState.invalid}
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
        label="Password"
        {...otherFieldProps}
        inputRef={ref}
      />
      <FormHelperText>{fieldState.error?.message ?? ' '}</FormHelperText>
    </FormControl>
  );
}
