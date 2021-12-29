import { ClassConstructor, plainToClass } from 'class-transformer';

export const transformTo = <T>(
  dto: ClassConstructor<T>,
  input: unknown | Array<unknown>
) =>
  plainToClass(dto, {
    result: input,
  });
