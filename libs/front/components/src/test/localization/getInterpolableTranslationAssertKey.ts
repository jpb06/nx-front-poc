export const getInterpolableTranslationAssertKey = (
  key: string,
  interpolations: Array<Record<string, unknown>>
) =>
  `${key}__${interpolations
    .flatMap((o) => Object.keys(o).map((key) => `${key}=${o[key]}`))
    .join('|')}`;
