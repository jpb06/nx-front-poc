import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { GlobalIndicator, GlobalIndicatorProps } from '@components/molecules';
import { FullpageBox } from '@components/organisms';

type FullpageError = Pick<GlobalIndicatorProps, 'title'>;

export const FullpageError: React.FC<FullpageError> = ({ title, children }) => (
  <FullpageBox>
    <GlobalIndicator Icon={ErrorOutlineIcon} title={title} hasTopMargin={false}>
      {children}
    </GlobalIndicator>
  </FullpageBox>
);
