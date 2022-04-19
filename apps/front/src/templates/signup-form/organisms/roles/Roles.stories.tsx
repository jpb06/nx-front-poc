import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid } from '@mui/material';
import { Story, ComponentMeta } from '@storybook/react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';

import { msw } from '@api/msw';
import { SnackbarContext } from '@components/organisms';
import { reactQueryDecorator } from '@storybook';
import { mockedRoles } from '@tests/mocked-data';

import { FormModel } from '../../hooks/useSignupFormSchema';
import { Roles } from './Roles';

export default {
  component: Roles,
  title: 'Front app/User stories/Signup/Organisms/Roles',
  decorators: reactQueryDecorator,
} as ComponentMeta<typeof Roles>;

const roleRequired = 'roleRequired';
const schema = zod.object({
  idRole: zod
    .number({
      required_error: roleRequired,
    })
    .gte(0, roleRequired),
});

type FormProps = { displayButton: boolean };

const Form = ({ displayButton }: FormProps) => {
  const showSnackbar = useContext(SnackbarContext);
  const { control, handleSubmit } = useForm<FormModel>({
    defaultValues: { lastName: '' },
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    showSnackbar(`Form submitted with ${data.idRole}`, 'success');
  });

  return (
    <Box component="form" onSubmit={onSubmit}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item>
          <Roles control={control} />
        </Grid>
        <Grid
          item
          sx={{
            marginTop: 1,
            textAlign: 'center',
          }}
        >
          {displayButton && (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

const Template: Story<FormProps> = (args) => {
  return <Form {...args} />;
};

export const NominalCase = Template.bind({});
NominalCase.parameters = {
  msw: {
    handlers: {
      roles: msw.rolesQuery(200, mockedRoles, false),
    },
  },
};
NominalCase.args = {
  displayButton: true,
};
NominalCase.argTypes = {
  displayButton: {
    table: {
      disable: true,
    },
  },
};

export const LoadingErrorCase = Template.bind({});
LoadingErrorCase.parameters = {
  msw: {
    handlers: {
      roles: msw.rolesQuery(500, undefined, false),
    },
  },
};
LoadingErrorCase.args = {
  displayButton: false,
};
LoadingErrorCase.argTypes = {
  displayButton: {
    table: {
      disable: true,
    },
  },
};
