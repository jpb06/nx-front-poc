# 🔥 mui-rhf-sandbox 🔥

[![Front deployment](https://img.shields.io/github/deployments/jpb06/mui-rhf-sandbox/production?label=front%20deploy&logo=vercel&logoColor=white)](https://mui-rhf-sandbox.vercel.app/)
[![Back deployment](https://img.shields.io/github/deployments/jpb06/mui-rhf-sandbox/rhf-mui-nx-sandbox-back?label=back%20deploy&logo=heroku&logoColor=dodgerblue)](https://rhf-mui-nx-sandbox-back.herokuapp.com/)
![Github workflow](https://img.shields.io/github/workflow/status/jpb06/mui-rhf-sandbox/tests%20and%20sonarcloud%20scan?label=last%20workflow&logo=github-actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jpb06_mui-rhf-sandbox&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jpb06_mui-rhf-sandbox)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_mui-rhf-sandbox&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jpb06_mui-rhf-sandbox)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_mui-rhf-sandbox&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jpb06_mui-rhf-sandbox)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_mui-rhf-sandbox&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=jpb06_mui-rhf-sandbox)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=jpb06_mui-rhf-sandbox&metric=coverage)](https://sonarcloud.io/summary/new_code?id=jpb06_mui-rhf-sandbox)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=jpb06_mui-rhf-sandbox&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=jpb06_mui-rhf-sandbox)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jpb06_mui-rhf-sandbox&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=jpb06_mui-rhf-sandbox)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=jpb06_mui-rhf-sandbox&metric=bugs)](https://sonarcloud.io/summary/new_code?id=jpb06_mui-rhf-sandbox)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jpb06_mui-rhf-sandbox&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jpb06_mui-rhf-sandbox)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=jpb06_mui-rhf-sandbox&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=jpb06_mui-rhf-sandbox)
![Last commit](https://img.shields.io/github/last-commit/jpb06/mui-rhf-sandbox?logo=git)

Here is a little POC to help our team move forward on the stack.

## ⚡ Getting started

```bash
# using fnm to set node version - https://github.com/Schniz/fnm
fnm use

# Installing dependencies
yarn

# starting backend and frontend in parallel
yarn dev front,back

# run all tests
yarn test:all
```

## ⚡ Subjects

### 🔶 Forms handling

We are using two libraries to manages forms in our app: [react-hook-form](https://github.com/react-hook-form/react-hook-form) and [zod](https://github.com/colinhacks/zod). The former is a library dedicated to form handling while the latter one is a schema declaration and validation library.

Our objective here is to separate the definition and the validation of our data model from the form compositon in the DOM. 

#### 🌀 Data model schema

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

#### 🌀 react

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

### 🔶 Testing

We may do three kind of tests:

#### 🧪 Unit tests

These tests validate the behavior of a component in isolation. They are great for generic components and are done using [testing library](https://github.com/testing-library/react-testing-library).

#### 🧪 Integration tests

These tests validate an entire feature and thus ensure several components/hooks/logic work well together and produce the expected outcome. Our point in integration tests is to not mock anything, because any piece of our program being mocked will not be tested, therefore lowering the confidence we can have in our test. Any interaction with a backend will be intercepted using [msw](https://github.com/mswjs/msw).

#### 🧪 End to end tests

Integration tests are often not enough. We may need end to end testing to validate several features working together. End to end testing is also great to check UI details. We will use [cypress](https://github.com/cypress-io/cypress) to do our e2e. 

### 🔶 Managing multiple apps and their shared code

We will be using [Nx](https://nx.dev) to make sure we can use several frontend apps, and to share code between them. Nx also has a cloud service that does pretty cool stuffs. Four libraries were created from code contained in the frontend app: api types, generic components and test related code.

## ⚡ Projects

|                 Project                           |           Description                                                     |
| ------------------------------------------------ | --------------------------------------------------------------------- |
| 🚀 [`front`](./apps/front/README.md) app  | Our frontend app, containing a signup form |
| 🚀 [`front-e2e`](./apps/front-e2e/README.md) app  | Our end to end testing code using cypress |
| 🚀 [`back`](./apps/back/README.md) app  | Our backend app, relying on an in-memory dataset|
| 🧩 [`front-api`](./libs/front/api/README.md) lib  |Our api types, extracted from the backend swagger|
| 🧩 [`front-components`](./libs/front/components/README.md) lib  |Our generic components and the MUI theme shared by all our frontend apps|
| 🧩 [`front-tests`](./libs/front/tests/README.md) lib  |Tests utils for both the front app and the generic components lib|

## ⚡ CLI

### 🔶 nx CLI

nx comes with [its own CLI](https://nx.dev/l/n/getting-started/nx-cli). Here is a short list of commands that may be handy:

| Description                                           | Command                                                               |
| ------------------------------------------------ | --------------------------------------------------------------------- |
| 🆘 Get help!!!| `yarn nx help` |
| 🚀 Run backend and frontend locally                  | `yarn dev "front,back"` or `nx run-many --target=serve --projects="front,back" --parallel`                                              |
| ▶️ Run an action on one project                             | `yarn nx run <project>:<action>`           |
| ▶️ Run an action on all projects                             | `yarn nx run-many --target=<action> --all`           |
| ▶️ Run an action on a set of projects                         | `yarn nx run-many --target=<action> --projects=<project1>,<project2>`              |
| ▶️ Run an action only on projects containing changes | `yarn nx affected:<action>`                                              |
| ✅ Run tests for a project (watch)         | `yarn test-changes <project>` or `yarn nx test --project=<project> --watch`                                        |
| ✅ Run all tests for a project (watchAll)     | `yarn test-dev <project>` or `yarn nx test --project=<project> --watchAll`                                                |
| ✅ Run all tests                                  | `yarn test-all` or `nx run-many --target=test --parallel --all`                                                       |
| 🗃️ Create a new front app or lib                           | `nx g @nrwl/react:app <appname>` or  `nx g @nrwl/react:lib <appname>`                                                  |
| 🗃️ Create a new backend app or lib                            | `nx g @nrwl/nest:app <appname>` or `nx g @nrwl/nest:lib <appname>`                                                   |
| 🗃️ Create a vanilla node lib                            | `nx g @nrwl/node:lib <libname>`                                                   |
| 📊 Dependencies graph                             | `yarn nx dep-graph`                                                   |

### 🔶 Actions

Actions are defined by project in `project.json` files. Here are a few standard actions:

| Action                                           | Description                                                               |
| ------------------------------------------------ | --------------------------------------------------------------------- |
| 🛠️ build  | Builds the app/lib. Use `--prod` flag for a production build |
| 🚀 serve  | Runs the app  |
| ⚠️ lint  | Run the linter against project files  |
| ✔️ type-check  | Uses `tsc --noEmit` to validate types against project files |
| ✅ test  | Runs tests |

### 🔶 Useful flags

| flag                                           | Description                                                               |
| ------------------------------------------------ | --------------------------------------------------------------------- |
| ⬛  `--target=x`  | specifies which action to run |
| ⬛  `--skip-nx-cache`  | disables nx caching; the command will be ran fully |
| ⬛  `--verbose`  | prints additional error stack trace on failure
| ⬛  `--projects=x,x`  | `run-many`: specifies which projects to run the action against |
| ⬛  `--parallel=x`  | `run-many`: allows x tasks to be ran in parallel |

