import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
} from '@mui/material';
import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

export type CheckboxItem = {
  id: number;
  label: string;
};

export interface CheckBoxGroupProps<T> extends UseControllerProps<T> {
  label: string;
  items?: Array<CheckboxItem>;
}

export function CheckBoxGroup<T>(props: CheckBoxGroupProps<T>) {
  const { field, fieldState } = useController(props);

  if (!props.items) {
    return null;
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    if (checked) {
      field.onChange([...field.value, Number(event.target.value)]);
    } else {
      field.onChange(
        (field.value as Array<number>).filter(
          (el) => `${el}` !== event.target.value
        )
      );
    }
  };

  return (
    <FormControl
      component="fieldset"
      variant="standard"
      error={fieldState.invalid}
    >
      <FormLabel component="legend">Skills</FormLabel>
      <FormHelperText>{fieldState.error?.message ?? ' '}</FormHelperText>
      <FormGroup>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {props.items.map(({ id, label }) => (
            <Grid item xs={4} key={id}>
              <FormControlLabel
                control={<Checkbox value={id} onChange={handleChange} />}
                label={label}
              />
            </Grid>
          ))}
        </Grid>
      </FormGroup>
    </FormControl>
  );
}
