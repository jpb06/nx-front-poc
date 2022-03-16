import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid } from '@mui/material';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Story, ComponentMeta } from '@storybook/react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';

import { SnackbarContext, WithSnackbar } from '@components/organisms';

import { CheckBoxList, CheckBoxListProps } from './CheckBoxList';

export default {
  component: CheckBoxList,
  title: 'Shared/organisms/CheckBoxList',
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
    items: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof CheckBoxList>;

const schema = zod
  .object({
    idSkills: zod
      .preprocess((v) => parseInt(zod.string().parse(v), 10), zod.number())
      .array()
      .min(1, 'forms:atLeastOneSkill'),
  })
  .superRefine(({ idSkills }, ctx) => {
    const invalidSkills = [6, 8];

    const selectedInvalidSkills = idSkills.filter((id) =>
      invalidSkills.includes(id)
    );
    if (selectedInvalidSkills.length > 0) {
      ctx.addIssue({
        code: zod.ZodIssueCode.custom,
        message: selectedInvalidSkills.join(','),
        path: ['idSkills'],
        fatal: true,
      });
    }
  });
type FormModel = zod.infer<typeof schema>;

const Form: React.FC<CheckBoxListProps<FormModel>> = ({ isLoading, label }) => {
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
          <CheckBoxList
            control={control}
            name="idSkills"
            label={label}
            isLoading={isLoading}
            items={[
              {
                id: 1,
                name: 'Soft skills',
                skills: [
                  { id: 6, name: 'Communication' },
                  { id: 8, name: 'Information sharing' },
                ],
              },
              {
                id: 2,
                name: 'Management',
                skills: [
                  {
                    id: 7,
                    name: 'Project drive',
                  },
                  { id: 9, name: 'Reporting' },
                  { id: 11, name: 'Roadmap definition' },
                ],
              },
              {
                id: 3,
                name: 'Tech',
                skills: [
                  { id: 1, name: 'jest' },
                  { id: 4, name: 'react' },
                  { id: 5, name: 'Typescript' },
                  { id: 10, name: 'Github actions' },
                ],
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

const Template: Story<CheckBoxListProps<FormModel>> = (args) => (
  <WithSnackbar>
    <Form {...args} />
  </WithSnackbar>
);

export const Primary = Template.bind({});
Primary.args = {
  isLoading: false,
  label: 'Skills',
};
