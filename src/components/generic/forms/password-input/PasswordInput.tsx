import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

interface PasswordInputProps<T> extends UseControllerProps<T> {
  label: string;
}

export function PasswordInput<T>(props: PasswordInputProps<T>) {
  const { field, fieldState } = useController(props);

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword((curr) => !curr);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined" sx={{ width: '100%' }}>
      <InputLabel
        htmlFor={`outlined-adornment-${props.name}`}
        sx={{
          top: -9,
          color: fieldState.invalid ? 'red' : 'grey',
        }}
      >
        {props.label}
      </InputLabel>
      <OutlinedInput
        size="small"
        id={`outlined-adornment-${props.name}`}
        type={showPassword ? 'text' : 'password'}
        error={fieldState.invalid}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
        {...field}
      />
    </FormControl>
  );
}
