import React, { PropsWithChildren } from 'react';

type Wrapper = ({ children }: PropsWithChildren<unknown>) => JSX.Element;

export type ReactWrapperComponent = React.JSXElementConstructor<{
  children: React.ReactElement;
}>;
/**
 * Create a wrapper component applying all given wrappers
 * @param wrappers The wrappers to apply.
 * The first wrapper in the list will be the one applied at the root and so on
 */
export const wrappersToWrapper = (wrappers: Wrapper[]): Wrapper =>
  wrappers
    .slice()
    .reverse()
    .reduce(
      (Acc, Wrapper) =>
        ({ children }: PropsWithChildren<unknown>) =>
          (
            <Wrapper>
              <Acc>{children}</Acc>
            </Wrapper>
          ),
      ({ children }) => <>{children}</>
    );
