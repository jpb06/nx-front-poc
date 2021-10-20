import { useMutation } from 'react-query';

import { delay } from '@logic/delay';

export const useSignupMutation = () =>
  useMutation(() => delay(2000).then(() => true));
