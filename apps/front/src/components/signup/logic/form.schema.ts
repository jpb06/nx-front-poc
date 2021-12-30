import * as zod from 'zod';

export const schema = zod.object({
  // userName: z
  //   .string()
  //   .nonempty('A username required')
  //   .refine(
  //     async (val) => {
  //       await new Promise((r) => setTimeout(r, 1000));
  //       return val !== 'potato';
  //     },
  //     {
  //       message: 'username is already taken :(',
  //     }
  //   ),
  firstName: zod.string().nonempty('A first name is required'),
  lastName: zod.string().nonempty('A last name is required'),
  password: zod.string().nonempty('A password is required'),
  idRole: zod.number().gte(0, 'You need to select a role'),
  idSkills: zod
    .preprocess((v) => parseInt(zod.string().parse(v), 10), zod.number())
    .array()
    .max(3, 'You need to select at most three skills'),
});

export type FormModel = zod.infer<typeof schema>;
