export const queryReplacer: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (variables: any) => [RegExp, string] | undefined
> = {
  me: () => undefined,
};
