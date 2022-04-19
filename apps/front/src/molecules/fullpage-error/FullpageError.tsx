import { PropsWithChildren } from 'react';

import {
  GlobalIndicator,
  GlobalIndicatorProps,
  FullpageBox,
} from '@components/molecules';

export type FullpageErrorProps = Pick<GlobalIndicatorProps, 'title' | 'Icon'>;

export const FullpageError = ({
  Icon,
  title,
  children,
}: PropsWithChildren<FullpageErrorProps>) => (
  <FullpageBox>
    <GlobalIndicator Icon={Icon} title={title} hasTopMargin={false}>
      {children}
    </GlobalIndicator>
  </FullpageBox>
);
