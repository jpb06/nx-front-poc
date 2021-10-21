import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Box, Grid } from '@mui/material';
import React from 'react';

import { Input, PasswordInput } from '@components/generic/forms';
import { FullpageBox } from '@components/generic/fullpage-box/FullpageBox';

import { Roles, Skills } from './components';
import { useSignupForm } from './hooks/useSignupForm';

export const Signup: React.FC = () => {
  const { onSubmit, control, isLoading, isError, error } = useSignupForm();

  return (
    <FullpageBox>
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
            <Roles control={control} />
          </Grid>
          <Grid item>
            <PasswordInput control={control} name="password" label="Password" />
          </Grid>
          <Grid item>
            <Skills control={control} />
          </Grid>
          <Grid
            item
            sx={{
              marginTop: 3,
              textAlign: 'center',
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
            >
              Signup
            </LoadingButton>
            {/**
             * There is one issue with this pattern :
             * - Error is handled outside react-hook-form
             * - If you edit one field, error won't disapear
             * - Error will disapear on next submit
             * In some cases, this is a good solution, in some others, not.
             *
             * A quick solution is to display API error in a Toast to make it automatically disapear after some time
             * If error sent by the API concern one particualr field, you can setError('field_name',error) in onError callback and let react-hook-form handle it for you (But frontend validation error should cover it for you in most of the cases)
             */}
            {isError && (
              <Alert severity="error">
                {error?.message ?? 'An error occurred while saving your data'}
              </Alert>
            )}
          </Grid>
        </Grid>
      </Box>
    </FullpageBox>
  );
};
