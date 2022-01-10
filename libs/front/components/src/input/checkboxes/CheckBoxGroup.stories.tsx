import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid } from '@mui/material';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Story, ComponentMeta } from '@storybook/react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';

import { SnackbarContext, WithSnackbar } from '../..';
import { CheckBoxGroup, CheckBoxGroupProps } from './CheckBoxGroup';

export default {
  component: CheckBoxGroup,
  title: 'input/CheckBoxGroup',
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
} as ComponentMeta<typeof CheckBoxGroup>;

const schema = zod.object({
  idSkills: zod
    .preprocess((v) => parseInt(zod.string().parse(v), 10), zod.number())
    .array()
    .min(1, 'You need to select at least one skill'),
});
type FormModel = zod.infer<typeof schema>;

const Form = () => {
  const showSnackbar = useContext(SnackbarContext);
  const { control, handleSubmit } = useForm<FormModel>({
    defaultValues: { idSkills: [] },
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    showSnackbar(`Form submitted with ${data.idSkills}`, 'success');
  });

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        width: '100%',
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item>
          <CheckBoxGroup
            control={control}
            name="idSkills"
            label="Skills"
            items={[
              {
                id: 1,
                label: 'jest',
              },
              {
                id: 2,
                label: 'react',
              },
              {
                id: 2,
                label: 'Typescript',
              },
              {
                id: 2,
                label: 'nest',
              },
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

const Template: Story<CheckBoxGroupProps<FormModel>> = (_) => (
  <WithSnackbar>
    <Form />
  </WithSnackbar>
);

export const Primary = Template.bind({});
Primary.args = {};
