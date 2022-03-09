export type UnWrapResult<Wrapper> = Wrapper extends { result: infer Result }
  ? Result
  : never;
