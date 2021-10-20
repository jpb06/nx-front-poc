import { SentimentDissatisfied } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import React from 'react';

import { RoleItem } from '@api/useRolesQuery';
import { CheckboxItem } from '@components/generic/forms/checkboxes/CheckBoxGroup';
import { FullpageBox } from '@components/generic/fullpage-box/FullpageBox';
import { GlobalIndicator } from '@components/generic/global-indicator/GlobalIndicator';

import { SignupForm } from './children/SignupForm';
import { useSignupData } from './hooks/useSignupData';

export const Signup: React.FC = () => {
  const { status, roles, skills } = useSignupData();

  return (
    <FullpageBox>
      {
        {
          loading: <CircularProgress color="warning" size={50} />,
          success: (
            <SignupForm
              roles={roles as RoleItem[]}
              skills={skills as CheckboxItem[]}
            />
          ),
          error: (
            <GlobalIndicator
              title="Oh no!"
              Icon={SentimentDissatisfied}
              hasTopMargin
            />
          ),
        }[status]
      }
    </FullpageBox>
  );
};
