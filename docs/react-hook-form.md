## ⚡ Forms handling

We are using two libraries to manage forms in our app: [react-hook-form](https://github.com/react-hook-form/react-hook-form) and [zod](https://github.com/colinhacks/zod). The former is a library dedicated to form handling while the latter is a schema declaration and parsing library.

Our objective here is to separate the definition and the validation of our data model from the definition of our form in the DOM.

### 🔶 Data model schema

A schema definition typically looks like this:

```typescript
import * as zod from 'zod';

type FormModel = {
  name: string;
  age: number;
  idHobbies: number[];
};

const schema: zod.ZodSchema<FormModel> = zod.object({
  // Defining a field expecting a string that must not be empty, passing a custom error message via the `min` function
  name: zod.string().min(1, "This field is required!"),
  // Defining a field expecting a number that must be greater than 18
  // since we are not passing a message to the `gte` function, we will get the default error message defined by zod
  age: zod.number().gte(18),
  // Defining a field expecting an array of numbers that must not contain more than 3 elements
  idHobbies: zod
    .preprocess((v) => parseInt(zod.string().parse(v), 10), zod.number())
    .array()
    .max(3),
});
```

As you can see, we can combine functions to define constraints on each field. More details [here](https://github.com/colinhacks/zod#defining-schemas).

It is also important to define explictely the type of our model using `zod.ZodSchema<T>` instead of inferring its type using `type FormModel = zod.infer<typeof schema>`. This can save us some headache down the line.

### 🔶 Using our model

Using our schema is easy enough, using a resolver:

```typescript
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const formDefaultValues : Partial<FormModel> = {
  name: '',
  age: 0, // I am a bit concerned about this as Im not sure its a good idea to default form values to invalid values.
  idHobbies: [],
};

const { control, handleSubmit } = useForm<FormModel>({
  defaultValues: formDefaultValues,
  resolver: zodResolver(schema),
});
```

Note the presence of `defaultValues`. Defining default values in `useForm` should be done only for mandatory fields.

We also want to use optional fields, this means with the following model, we may have two valid payloads sent to the server:

```typescript
type Form = {
  name: string;
  age?: number;
};

// payload could be :
{
  name: 'Yolo Bro',
  age: 21
}

// or 
{
  name: 'Yolanda McCool'
}
```

In order to do that, we will have to override the `onChange` prop in our generic components; if the value is an empty string, we will set that value as undefined in the form state. Do note the fallback to empty string in the `value` prop as well, allowing us to dodge the controlled/uncontrolled error messages.

```typescript
export function Input<T>(props: InputProps<T>): JSX.Element {
  const {
    field: { value, onChange },
  } = useController(props);

  return (
    <TextField
      // ...
      onChange={(e) => {
        onChange(e.target.value === '' ? undefined : e.target.value);
      }}
      value={value || ''}
    />
  );
}
```

### 🔶 react

What does it mean for our components then? We will use genericity and `useController` hook to simplify the definition and usage of our generic components. Here is an example:

```typescript
interface InputProps<T> extends UseControllerProps<T> {
  label: string;
}

function Input<T>(props: InputProps<T>) {
  const {
    field: { ref, ...otherFieldProps },
    fieldState,
  } = useController(props);

  return (
    <TextField
      label={props.label}
      error={fieldState.invalid}
      onChange={(e) => {
        onChange(e.target.value === '' ? undefined : e.target.value);
      }}
      {...otherFieldProps}
      inputRef={ref}
    />
  );
}
```

Now, using this component is pretty trivial:

```typescript
type FormModel = {
  name: string
}

const MyComponent = () => {
  const schema: zod.ZodSchema<FormModel> = zod.object({
    name: zod.string().min(1, requiredKey), 
  });

  const { control, handleSubmit } = useForm<FormModel>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.info(data)
  });

  return (
    <Box
        component="form"
        onSubmit={onSubmit}
      >
      <Input control={control} name="name" label="Name" />
      <Button type="submit">Submit</Button>
    </Box>
  )
}
```

### 🔶 Using custom error messages

Since our app is localized, we will have to override the default error messages provided by zod. We can do this easily by providing parameters to zod functions in our schema.

```typescript
// Our translations, defined as a nested object
const langEn = {
  required: "This field is required..."
};

// Let's infer its keys
export const translationsKeys = Object.keys(langEn);
export type TranslationsKey = keyof typeof langEn;
```

We can then pass translations keys to the zod validation chain functions:

```typescript
type FormModel = {
  name: string;
};

const requiredKey: TranslationsKey = "required";

const schema: zod.ZodSchema<FormModel> = zod.object({
  name: zod.string().min(1, requiredKey), 
});
```

Then, all we have to do is to call the `translate` function of our translations lib in our generic components:

```typescript
export function Input<T>(props: InputProps<T>): JSX.Element {
  // ...

  const t = useTranslations();

  return (
    <TextField
      // ...
      helperText={t(fieldState.error?.message)}
    />
  );
}
```

### 🔶 Overriding zod default error messages

While defining messages in the schema gives us fine grained control over the messages we want to display, it may be useful to make sure we always send translated default messages. We can do by passing a function to the errorMap option in `zodResolver` function:

```typescript
const { control, handleSubmit } = useForm<FormModel>({
  resolver: zodResolver(schema, {
    errorMap: customErrorMap,
  }),
});
```

`customErrorMap` could look like this:

```typescript
export const customErrorMap = (
  issue: ZodIssueOptionalMessage,
  ctx: ErrorMapCtx
): ErrorMapResult => {
  // if we have a custom error defined in the schema, let's use it!
  if (issue.message && translationsKeys.includes(issue.message)) {
    return {
      message: issue.message,
    };
  }

  // Otherwise, let's use the default translation for this error code
  if (translationsKeys.includes(ctx.defaultError)) {
    return {
      message: ctx.defaultError,
    };
  }

  // Otherwise, let's use the raw code (untranslated) or a generic translation key instead 
  return { message: issue.code || 'genericError' };
};
```

### 🔶 Complex validation

Sometimes, we may have to do complex validation based on several fields. For example, we may have a password field using two inputs to ensure user has made no typo.

We have two functions we can use in our schema definion to do this: `refine` and `superRefine`, which basically do the same thing but with small variations.

#### 🌀 `refine`

Refine is great for simple use cases:

```typescript
const passwordForm = zod
  .object({
    password: zod.string(),
    confirmPassword: zod.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    // Our custom error message
    message: "Passwords do not match!",
    // The impacted field; in this example, the error message will be displayed for the `confirmPassword` input
    path: ["confirmPassword"],
  });
```

Do note you can also use `refine` on single fields:

```typescript
const schema = zod.string().refine((val) => val.length <= 255, {
  message: "String can't be more than 255 characters",
});
```

#### 🌀 `superRefine`

This function allows us to do more complex stuff; we can also chain superRefine functions:

```typescript
const schema = zod.array(zod.string()).superRefine((val, ctx) => {
  if (val.length > 3) {
    ctx.addIssue({
      code: zod.ZodIssueCode.too_big,
      maximum: 3,
      type: "array",
      inclusive: true,
      message: "Too many items 😡",
    });
  }

  if (val.length !== new Set(val).size) {
    ctx.addIssue({
      code: zod.ZodIssueCode.custom,
      message: `No duplicated allowed.`,
    });
  }
});
```

We can use asynchrony within `superRefine`. [Here](./../apps/front/src/components/signup/hooks/useSignupFormSchema.ts) is an example. We have a role dropdown and a skills selector. Skills availability depend on the role selected. So, we will do a XHR to check the skills available for that role.
