import * as z from 'zod';

export const schema = z.object({
  userName: z.string().nonempty('This field is required'),
  firstName: z.string().nonempty('This field is required'),
  lastName: z.string().nonempty('This field is required'),
  password: z.string().nonempty('This field is required'),
  idRole: z.number().gte(0, 'You need to select a role'),
  idSkills: z.number().array().min(2, 'You need to select at least two skills'),
}).refine(async (val) => {
  await new Promise((r) => setTimeout(r, 1000));
  return val.userName !== "potato";
}, {
  message: "username is already taken :(",
  path: ["userName"]
});

export type FormModel = z.infer<typeof schema>;
