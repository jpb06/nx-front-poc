import { PropsWithChildren } from 'react';

import { GlobalIndicator, GlobalIndicatorProps } from '@components/molecules';
import { FullpageBox } from '@components/organisms';

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
