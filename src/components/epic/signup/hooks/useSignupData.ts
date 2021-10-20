import { useEffect, useState } from 'react';

import { RoleItem, useRolesQuery } from '@api/useRolesQuery';
import { useSkillsQuery } from '@api/useSkillsQuery';
import { CheckboxItem } from '@components/generic/forms/checkboxes/CheckBoxGroup';

type QueriesStatus = 'success' | 'loading' | 'error';

type SignupDataHook = {
  status: QueriesStatus;
  roles?: Array<RoleItem>;
  skills?: Array<CheckboxItem>;
};

export const useSignupData = (): SignupDataHook => {
  const [status, setStatus] = useState<QueriesStatus>('loading');

  const { data: roles, status: rolesStatus } = useRolesQuery();
  const { data: skills, status: skillsStatus } = useSkillsQuery();

  useEffect(() => {
    if (rolesStatus === 'success' && skillsStatus === 'success') {
      setStatus('success');
    }

    if (rolesStatus === 'error' || skillsStatus === 'error') {
      setStatus('error');
    }
  }, [rolesStatus, skillsStatus]);

  return { status, roles, skills };
};
