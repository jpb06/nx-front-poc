import { GlobalIndicator, GlobalIndicatorProps } from '@components/molecules';
import { FullpageBox } from '@components/organisms';

export type FullpageErrorProps = Pick<GlobalIndicatorProps, 'title' | 'Icon'>;

export const FullpageError: React.FC<FullpageErrorProps> = ({
  Icon,
  title,
  children,
}) => (
  <FullpageBox>
    <GlobalIndicator Icon={Icon} title={title} hasTopMargin={false}>
      {children}
    </GlobalIndicator>
  </FullpageBox>
);
