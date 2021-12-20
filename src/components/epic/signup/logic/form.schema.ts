import * as z from 'zod';

export const schema = z.object({
  userName: z.string().nonempty('This field is required').refine(async (val) => {
    await new Promise((r) => setTimeout(r, 1000));
    return val !== "potato";
  }, {
    message: "username is already taken :(",
  }),
  firstName: z.string().nonempty('This field is required'),
  lastName: z.string().nonempty('This field is required'),
  password: z.string().nonempty('This field is required'),
  idRole: z.number().gte(0, 'You need to select a role'),
  idSkills: z.number().array().min(2, 'You need to select at least two skills'),
})

export type FormModel = z.infer<typeof schema>;
