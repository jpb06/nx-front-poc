import { FormModel } from '@components/epic/signup/types/form-model.type';
import { delay } from '@logic/delay';

export const signup = (data: FormModel) =>
  delay(2000).then(() => {
    return data;
  });
