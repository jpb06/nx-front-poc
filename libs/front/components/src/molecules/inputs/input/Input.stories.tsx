import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid } from '@mui/material';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Story, ComponentMeta } from '@storybook/react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';

import { SnackbarContext, WithSnackbar } from '../../../organisms';
import { Input, InputProps } from './Input';

export default {
  component: Input,
  title: 'Shared/Molecules/Inputs/Input',
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
} as ComponentMeta<typeof Input>;

const schema = zod.object({
  lastName: zod.string().nonempty('A last name is required'),
});
type FormModel = zod.infer<typeof schema>;

const Form = () => {
  const showSnackbar = useContext(SnackbarContext);
  const { control, handleSubmit } = useForm<FormModel>({
    defaultValues: { lastName: '' },
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    showSnackbar(`Form submitted with ${data.lastName}`, 'success');
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
          <Input control={control} name="lastName" label="Lastname" />
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

const Template: Story<InputProps<FormModel>> = (_) => (
  <WithSnackbar>
    <Form />
  </WithSnackbar>
);

export const Primary = Template.bind({});
Primary.args = {};
