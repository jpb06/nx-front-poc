import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as zod from 'zod';

import { mockedSkills } from '@tests/mocked-data';
import { TranslationsKey } from '@translations';

import { render } from '../../../test';
import { FormTestingComponent } from '../../../test/forms/FormTestingComponents';
import { CheckBoxList } from './CheckBoxList';

type Form = { technos: number[] };

describe('CheckBoxList component', () => {
  const handleSubmit = jest.fn();
  const defaultValues = { technos: [] };
  const schema = zod.object({
    technos: zod
      .preprocess((v) => parseInt(zod.string().parse(v), 10), zod.number())
      .array(),
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display nothing when no items were passed', () => {
    render(
      <FormTestingComponent<Form>
        onSubmit={handleSubmit}
        schema={schema}
        defaultValues={defaultValues}
      >
        <CheckBoxList<Form>
          name="technos"
          label="technos"
          isLoading={false}
          items={[]}
        />
      </FormTestingComponent>
    );

    expect(
      screen.queryByRole('navigation', { name: /skills/i })
    ).not.toBeInTheDocument();

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('should display nothing when no items were provided', () => {
    render(
      <FormTestingComponent<Form>
        onSubmit={handleSubmit}
        schema={schema}
        defaultValues={defaultValues}
      >
        <CheckBoxList<Form> name="technos" label="technos" isLoading={false} />
      </FormTestingComponent>
    );

    expect(
      screen.queryByRole('navigation', { name: /skills/i })
    ).not.toBeInTheDocument();

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('should display three categories', () => {
    render(
      <FormTestingComponent<Form>
        onSubmit={handleSubmit}
        schema={schema}
        defaultValues={defaultValues}
      >
        <CheckBoxList<Form>
          name="technos"
          label="technos"
          isLoading={false}
          items={mockedSkills}
        />
      </FormTestingComponent>
    );

    expect(
      screen.getByRole('navigation', { name: /technos/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /soft skills/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /management/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /tech/i })).toBeInTheDocument();
  });

  it('should display the checkboxes of the first category', () => {
    render(
      <FormTestingComponent<Form>
        onSubmit={handleSubmit}
        schema={schema}
        defaultValues={defaultValues}
      >
        <CheckBoxList<Form>
          name="technos"
          label="technos"
          isLoading={false}
          items={mockedSkills}
        />
      </FormTestingComponent>
    );

    expect(
      screen.getByRole('button', { name: /soft skills/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('checkbox', { name: /communication/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: /information sharing/i })
    ).toBeInTheDocument();
  });

  it('should switch of category', async () => {
    render(
      <FormTestingComponent<Form>
        onSubmit={handleSubmit}
        schema={schema}
        defaultValues={defaultValues}
      >
        <CheckBoxList<Form>
          name="technos"
          label="technos"
          isLoading={false}
          items={mockedSkills}
        />
      </FormTestingComponent>
    );

    const managementCategory = screen.getByRole('button', {
      name: /management/i,
    });
    userEvent.click(managementCategory);

    await waitForElementToBeRemoved(
      screen.queryByRole('checkbox', { name: /communication/i })
    );
    expect(
      screen.queryByRole('checkbox', { name: /information sharing/i })
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole('checkbox', { name: /project drive/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: /reporting/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: /roadmap definition/i })
    ).toBeInTheDocument();
  });

  it('should keep selection when switching between categories', async () => {
    render(
      <FormTestingComponent<Form>
        onSubmit={handleSubmit}
        schema={schema}
        defaultValues={defaultValues}
      >
        <CheckBoxList<Form>
          name="technos"
          label="technos"
          isLoading={false}
          items={mockedSkills}
        />
      </FormTestingComponent>
    );

    userEvent.click(screen.getByRole('checkbox', { name: /communication/i }));

    const managementCategory = screen.getByRole('button', {
      name: /management/i,
    });
    userEvent.click(managementCategory);
    await waitForElementToBeRemoved(
      screen.queryByRole('checkbox', { name: /communication/i })
    );

    userEvent.click(screen.getByRole('checkbox', { name: /reporting/i }));

    const softSkillsCategory = screen.getByRole('button', {
      name: /soft skills/i,
    });
    userEvent.click(softSkillsCategory);
    await waitForElementToBeRemoved(
      screen.queryByRole('checkbox', { name: /reporting/i })
    );

    expect(
      screen.getByRole('checkbox', { name: /communication/i })
    ).toBeChecked();

    userEvent.click(managementCategory);
    await waitForElementToBeRemoved(
      screen.queryByRole('checkbox', { name: /communication/i })
    );
    expect(screen.getByRole('checkbox', { name: /reporting/i })).toBeChecked();

    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ technos: [6, 9] })
      )
    );
  });

  it('should display an error message when mockedSkills are invalid', async () => {
    const refinedSchema = zod
      .object({
        technos: zod
          .preprocess((v) => parseInt(zod.string().parse(v), 10), zod.number())
          .array(),
      })
      .superRefine(({ technos }, ctx) => {
        const invalidTechnos = [6, 8];

        const selectedInvalidTechnos = technos.filter((t) =>
          invalidTechnos.includes(t)
        );
        if (selectedInvalidTechnos.length > 0) {
          ctx.addIssue({
            code: zod.ZodIssueCode.custom,
            message: selectedInvalidTechnos.join(','),
            path: ['technos'],
            fatal: true,
          });
        }
      });
    render(
      <FormTestingComponent<Form>
        onSubmit={handleSubmit}
        schema={refinedSchema}
        defaultValues={defaultValues}
      >
        <CheckBoxList<Form>
          name="technos"
          label="technos"
          isLoading={false}
          items={mockedSkills}
        />
      </FormTestingComponent>
    );

    userEvent.click(screen.getByRole('checkbox', { name: /communication/i }));

    const managementCategory = screen.getByRole('button', {
      name: /management/i,
    });
    userEvent.click(managementCategory);
    await waitForElementToBeRemoved(
      screen.queryByRole('checkbox', { name: /communication/i })
    );

    userEvent.click(screen.getByRole('checkbox', { name: /reporting/i }));

    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await screen.findByText(/invalid skills for this role!/i);
    expect(handleSubmit).toHaveBeenCalledTimes(0);
  });

  it('should display a custom error message', async () => {
    const atMostThreeSkills: TranslationsKey = 'atMostThreeSkills';

    const refinedSchema = zod
      .object({
        technos: zod
          .preprocess((v) => parseInt(zod.string().parse(v), 10), zod.number())
          .array(),
      })
      .superRefine(({ technos }, ctx) => {
        if (technos.length > 3) {
          ctx.addIssue({
            code: zod.ZodIssueCode.too_big,
            message: atMostThreeSkills,
            path: ['technos'],
            fatal: true,
            maximum: 3,
            type: 'array',
            inclusive: true,
          });
        }
      });
    render(
      <FormTestingComponent<Form>
        onSubmit={handleSubmit}
        schema={refinedSchema}
        defaultValues={defaultValues}
      >
        <CheckBoxList<Form>
          name="technos"
          label="technos"
          isLoading={false}
          items={mockedSkills}
        />
      </FormTestingComponent>
    );

    const techCategory = screen.getByRole('button', {
      name: /tech/i,
    });
    userEvent.click(techCategory);
    await waitForElementToBeRemoved(
      screen.queryByRole('checkbox', { name: /communication/i })
    );

    userEvent.click(screen.getByRole('checkbox', { name: /jest/i }));
    userEvent.click(screen.getByRole('checkbox', { name: /react/i }));
    userEvent.click(screen.getByRole('checkbox', { name: /typescript/i }));
    userEvent.click(screen.getByRole('checkbox', { name: /github actions/i }));

    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await screen.findByText(/you need to select at most three skills/i);
    expect(handleSubmit).toHaveBeenCalledTimes(0);
  });

  it('should be able to check and uncheck items', async () => {
    const refinedSchema = zod.object({
      technos: zod
        .preprocess((v) => parseInt(zod.string().parse(v), 10), zod.number())
        .array(),
    });

    render(
      <FormTestingComponent<Form>
        onSubmit={handleSubmit}
        schema={refinedSchema}
        defaultValues={defaultValues}
      >
        <CheckBoxList<Form>
          name="technos"
          label="technos"
          isLoading={false}
          items={mockedSkills}
        />
      </FormTestingComponent>
    );

    userEvent.click(screen.getByRole('checkbox', { name: /communication/i }));
    userEvent.click(
      screen.getByRole('checkbox', { name: /information sharing/i })
    );

    expect(
      screen.getByRole('checkbox', { name: /communication/i })
    ).toBeChecked();

    userEvent.click(screen.getByRole('checkbox', { name: /communication/i }));

    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ technos: [8] })
      )
    );

    userEvent.click(screen.getByRole('checkbox', { name: /communication/i }));

    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({ technos: [8, 6] })
      )
    );
  });

  it('should display a loading indicator when checking', async () => {
    render(
      <FormTestingComponent<Form>
        onSubmit={handleSubmit}
        schema={schema}
        defaultValues={defaultValues}
      >
        <CheckBoxList<Form>
          name="technos"
          label="technos"
          isLoading
          items={mockedSkills}
        />
      </FormTestingComponent>
    );

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();

    expect(screen.getAllByTestId('CachedIcon')).toHaveLength(2);
  });
});
