import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid } from '@mui/material';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Story, ComponentMeta } from '@storybook/react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';

import { SnackbarContext, WithSnackbar } from '@components/organisms';

import { Select, SelectProps } from './Select';

export default {
  component: Select,
  title: 'Shared/molecules/Select',
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone5',
    },
  },
  argTypes: {
    control: {
      table: {
        disable: true,
      },
    },
    defaultValue: {
      table: {
        disable: true,
      },
    },
    label: {
      table: {
        disable: true,
      },
    },
    loading: {
      table: {
        disable: true,
      },
    },
    name: {
      table: {
        disable: true,
      },
    },
    rules: {
      table: {
        disable: true,
      },
    },
    shouldUnregister: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Select>;

const schema = zod.object({
  idRole: zod.number().gte(0, 'You need to select a role'),
});
type FormModel = zod.infer<typeof schema>;

const Form = () => {
  const showSnackbar = useContext(SnackbarContext);
  const { control, handleSubmit } = useForm<FormModel>({
    defaultValues: { idRole: -1 },
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
          <Select
            control={control}
            name="idRole"
            label="Role"
            data={[
              { key: -1, text: '' },
              { key: 1, text: 'Developer' },
              { key: 2, text: 'Devops' },
            ]}
          />
        </Grid>
        <Grid
          item
          sx={{
            marginTop: 1,
            textAlign: 'center',
          }}
        >
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const Template: Story<SelectProps<FormModel>> = (_) => (
  <WithSnackbar>
    <Form />
  </WithSnackbar>
);

export const Primary = Template.bind({});
Primary.args = {};
