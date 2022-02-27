# ⚡ Testing

Let's talk a bit about the various types of tests we can do and what problems they do solve.

What we aim to do is trophy testing, basing ourself on [Typescript](https://www.typescriptlang.org), [jest](https://jestjs.io), [testing library](https://testing-library.com), [msw](https://mswjs.io) and [cypress](https://www.cypress.io).

![Diagram](./assets/testing-trophy.jpg)

## 🔶 Unit tests

They focus on testing a module - could be a component or a function - in isolation. That means any outside context this module may rely upon will be mocked. This are pretty straightforward tests, which are typically really fast.

You can find unit tests in the [molecules folder](./src/molecules). Here is a simple example:

```typescript
describe('TopAlert component', () => {
  const error = 'Oh no!';
  const children = 'My child';

  it('should display a banner and a brand', () => {
    render(
      <TopAlert severity="error" errorText={error}>
        {children}
      </TopAlert>
    );

    expect(screen.getByText(children)).toBeInTheDocument();
    expect(screen.getByText(error)).toBeInTheDocument();
  });
});
```

## 🔶 Visual regression tests

These tests check that the small bricks of our app didn't drastically change visually. This is pretty useful when we defined our own system design relying on a whole set of generic components.

## 🔶 Snapshots

Snapshots are useful to make sure we didn't visually break another part of the application by touching a generic component for example.

You can find snapshot tests in the templates folder:

- [User profile](./src/templates/github-user/organisms/user-profile/UserProfile.spec.tsx).
- [User skills](./src/templates/github-user/organisms/user-skills//UserSkills.spec.tsx).

```typescript
it('should match snapshot', async () => {
  githubProfileQueryHandler(githubProfileQueryMockData, 200, true);

  const { baseElement } = render(<UserProfile />);

  // We make sure to reach the render we want to assert with our snapshot
  await screen.findByRole('img');

  expect(baseElement).toMatchSnapshot();
});
```

## 🔶 Integration tests

Integration tests have the highest return on investment because they are not as hard to write and maintain as e2e tests while giving us good confidence about a part of our system.

You can find integration tests in the templates folder:

- [User profile](./src/templates/github-user/organisms/user-profile/UserProfile.spec.tsx).
- [User skills](./src/templates/github-user/organisms/user-skills//UserSkills.spec.tsx).

```typescript
it('should display skills', async () => {
  githubProfileQueryHandler(githubProfileQueryMockData, 200, true);

  render(<UserProfile />);

  await screen.findByText(githubProfileQueryMockData.info.name);
  screen.getByText(githubProfileQueryMockData.info.email);
  screen.getByText(githubProfileQueryMockData.extra.raw_info.followers);
  screen.getByText(githubProfileQueryMockData.extra.raw_info.public_repos);
});
```

## 🔶 End to end testing

The tests giving us the most confidence. They also cost a lot. So it's generally wiser to only write e2e for key features of our application; the ones that represent a critical risk for the product.
