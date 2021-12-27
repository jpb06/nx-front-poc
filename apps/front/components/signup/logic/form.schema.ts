import * as z from 'zod';

export const schema = z.object({
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
  firstName: z.string().nonempty('A firstName is required'),
  lastName: z.string().nonempty('A lastName is required'),
  password: z.string().nonempty('A Password is required'),
  idRole: z.number().gte(0, 'You need to select a role'),
  idSkills: z
    .preprocess((v) => parseInt(z.string().parse(v), 10), z.number())
    .array()
    .max(3, 'You need to select at most three skills'),
});

export type FormModel = z.infer<typeof schema>;
