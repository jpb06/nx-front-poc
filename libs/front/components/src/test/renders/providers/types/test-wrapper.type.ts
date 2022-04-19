import { PropsWithChildren } from 'react';

export type TestWrapper = ({
  children,
}: PropsWithChildren<unknown>) => JSX.Element;
