import * as z from 'zod';

export const schema = z.object({
  firstName: z.string().nonempty('This field is required'),
  lastName: z.string().nonempty('This field is required'),
  password: z.string().nonempty('This field is required'),
  idRole: z.number().gte(0, 'You need to select a role'),
  idSkills: z
    .preprocess((v) => parseInt(z.string().parse(v), 10), z.number())
    .array()
    .max(3, 'You need to select at most three skills'),
});

export type FormModel = z.infer<typeof schema>;
