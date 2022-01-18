## ⚡ Forms handling

We are using two libraries to manages forms in our app: [react-hook-form](https://github.com/react-hook-form/react-hook-form) and [zod](https://github.com/colinhacks/zod). The former is a library dedicated to form handling while the latter one is a schema declaration and validation library.

Our objective here is to separate the definition and the validation of our data model from the form compositon in the DOM. 

### 🔶 Data model schema

A schema definition typically looks like this:
```typescript
import * as zod from 'zod';

const schema = zod.object({
  firstName: zod.string().nonempty('A first name is required'),
  // ...
});
```

The cool thing about it is we can easily infer the type of our form data model like so:

```typescript
type FormModel = zod.infer<typeof schema>;
```

Then, plugging this schema is easy enough, using a resolver: 

```typescript
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const { control, handleSubmit } = useForm<FormModel>({
  defaultValues: formDefaultValues,
  resolver: zodResolver(schema),
});
```

### 🔶 react

What does it mean for our components then? We will use genericity and `useController` hook to simplify the definition and usage of our generic components. Here is an example:

```typescript
interface InputProps<T> extends UseControllerProps<T> {
  label: string;
  loading?: boolean;
}

function Input<T>(props: InputProps<T>) {
  const {
    field: { ref, ...otherFieldProps },
    fieldState,
  } = useController(props);

  return (
    <TextField
      label={props.label}
      variant="outlined"
      size="small"
      fullWidth
      error={fieldState.invalid}
      helperText={fieldState.error?.message ?? ' '}
      {...otherFieldProps}
      inputRef={ref}
    />
  );
}
```

Now, using this component is pretty trivial:

```typescript
const MyComponent = () => {
  const { onSubmit, control, isLoading } = useSignupForm();

  return (
    <Box
        component="form"
        onSubmit={onSubmit}
      >
      <Input control={control} name="firstName" label="Firstname" />
    </Box>
  )
}
```