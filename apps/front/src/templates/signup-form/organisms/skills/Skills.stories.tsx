import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid } from '@mui/material';
import { Story, ComponentMeta } from '@storybook/react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';

import { msw } from '@front/api/msw';
import { SnackbarContext } from '@front/contexts';
import { reactQueryDecorator } from '@front/storybook';
import { mockedSkills } from '@front/tests/mocked-data';

import { FormModel } from '../../hooks/useSignupFormSchema';
import { Skills } from './Skills';

export default {
  component: Skills,
  title: 'Front app/User stories/Signup/Organisms/Skills',
  decorators: reactQueryDecorator,
} as ComponentMeta<typeof Skills>;

const schema = zod.object({
  idSkills: zod
    .preprocess((v) => parseInt(zod.string().parse(v), 10), zod.number())
    .array(),
});

type FormProps = { displayButton: boolean };

const Form = ({ displayButton }: FormProps) => {
  const showSnackbar = useContext(SnackbarContext);
  const { control, handleSubmit } = useForm<FormModel>({
    defaultValues: { idSkills: [] },
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    showSnackbar(
      `Form submitted with ${
        data.idSkills.length === 0 ? 'Nothing' : data.idSkills
      }`,
      'success'
    );
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
          <Skills control={control} />
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
      skills: msw.skillsQuery(200, mockedSkills, false),
      areSkillsAvailableForRoleMutation: msw.areSkillsAvailableForRoleMutation(
        200,
        { result: [] },
        false
      ),
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
      skills: msw.skillsQuery(500, undefined, false),
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
