## ⚡ Testing

We may do three kind of tests:

### 🧪 Unit tests

These tests validate the behavior of a component in isolation. They are great for generic components and are done using [testing library](https://github.com/testing-library/react-testing-library).

### 🧪 Integration tests

These tests validate an entire feature and thus ensure several components/hooks/logic work well together and produce the expected outcome. Our point in integration tests is to not mock anything, because any piece of our program being mocked will not be tested, therefore lowering the confidence we can have in our test. Any interaction with a backend will be intercepted using [msw](https://github.com/mswjs/msw).

### 🧪 End to end tests

Integration tests are often not enough. We may need end to end testing to validate several features working together. End to end testing is also great to check UI details. We will use [cypress](https://github.com/cypress-io/cypress) to do our e2e. 