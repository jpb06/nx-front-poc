import React from 'react';

export type ReactWrapperComponent = React.JSXElementConstructor<{
  children: React.ReactElement;
}>;
/**
 * Create a wrapper component applying all given wrappers
 * @param wrappers The wrappers to apply.
 * The first wrapper in the list will be the one applied at the root and so on
 */
export const wrappersToWrapper = (
  wrappers: ReactWrapperComponent[]
): React.ComponentType =>
  wrappers
    .slice()
    .reverse()
    .reduce<React.ComponentType>(
      (Acc, Wrapper) =>
        ({ children }) =>
          (
            <Wrapper>
              <Acc>{children}</Acc>
            </Wrapper>
          ),
      ({ children }) => <>{children}</>
    );
