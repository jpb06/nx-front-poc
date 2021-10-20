import { Box, Button, Grid } from '@mui/material';
import React from 'react';
import * as yup from 'yup';

import { Role, RoleItem, rolesTypes } from '@api/useRolesQuery';
import {
  CheckBoxGroup,
  CheckboxItem,
} from '@components/generic/forms/checkboxes/CheckBoxGroup';
import { Input } from '@components/generic/forms/input/Input';
import { PasswordInput } from '@components/generic/forms/password-input/PasswordInput';
import { Select } from '@components/generic/forms/select/Select';

import { useSignupForm } from '../hooks/useSignupForm';

export interface FormModel {
  firstName: string;
  lastName: string;
  role: Role;
  password: string;
  skills: Array<number>;
}

type SignupFormProps = {
  roles: Array<RoleItem>;
  skills: Array<CheckboxItem>;
};

export const SignupForm: React.FC<SignupFormProps> = ({ roles, skills }) => {
  const schema: yup.SchemaOf<FormModel> = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().required(),
    role: yup.string().oneOf(rolesTypes).required(),
    skills: yup.array(yup.number().required()),
  });

  const { onSubmit, control } = useSignupForm<FormModel>({
    schema,
    defaultValues: {
      lastName: '',
      firstName: '',
      role: 'Dev',
      password: '',
      skills: [],
    },
  });

  return (
    <Box
      sx={{
        width: '100%',
        padding: {
          md: 4,
          xs: 1,
        },
      }}
      component="form"
      onSubmit={onSubmit}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item>
          <Input control={control} name="firstName" label="Firstname" />
        </Grid>
        <Grid item>
          <Input control={control} name="lastName" label="Lastname" />
        </Grid>
        <Grid item>
          <Select control={control} name="role" label="Role" items={roles} />
        </Grid>
        <Grid item>
          <PasswordInput control={control} name="password" label="Password" />
        </Grid>
        <Grid item>
          <CheckBoxGroup
            control={control}
            name="skills"
            label="Skills"
            items={skills}
          />
        </Grid>
        <Grid
          item
          sx={{
            marginTop: 3,
            textAlign: 'center',
          }}
        >
          <Button type="submit" variant="contained">
            Signup
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
