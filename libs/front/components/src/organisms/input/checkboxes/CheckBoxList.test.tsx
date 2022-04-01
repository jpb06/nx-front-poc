import { screen, waitFor } from '@testing-library/react';
import * as zod from 'zod';

import { SkillCategoryDto } from '@api/types';
import { mockedSkills } from '@tests/mocked-data';

import { FormTestingComponent } from '../../../test/forms/FormTestingComponents';
import { appRender } from '../../../test/renders/appRender';
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

  const render = (
    schema: unknown,
    items: SkillCategoryDto[] | undefined,
    isLoading: boolean
  ) =>
    appRender(
      <FormTestingComponent<Form>
        onSubmit={handleSubmit}
        schema={schema}
        defaultValues={defaultValues}
      >
        <CheckBoxList<Form>
          name="technos"
          label="technos"
          isLoading={isLoading}
          items={items}
        />
      </FormTestingComponent>,
      { providers: ['form'] }
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display nothing when no items were passed', () => {
    render(schema, [], false);

    expect(
      screen.queryByRole('navigation', { name: /skills/i })
    ).not.toBeInTheDocument();

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('should display nothing when no items were provided', () => {
    render(schema, undefined, false);

    expect(
      screen.queryByRole('navigation', { name: /skills/i })
    ).not.toBeInTheDocument();

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('should display three categories', () => {
    render(schema, mockedSkills, false);

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
    render(schema, mockedSkills, false);

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
    const { user } = render(schema, mockedSkills, false);

    screen.getByRole('checkbox', { name: /communication/i });
    screen.getByRole('checkbox', { name: /information sharing/i });

    expect(
      screen.queryByRole('checkbox', { name: /project drive/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('checkbox', { name: /reporting/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('checkbox', { name: /roadmap definition/i })
    ).not.toBeInTheDocument();

    const managementCategory = screen.getByRole('button', {
      name: /management/i,
    });
    await user.click(managementCategory);

    expect(
      screen.queryByRole('checkbox', { name: /communication/i })
    ).not.toBeInTheDocument();
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
    const { user } = render(schema, mockedSkills, false);

    await user.click(screen.getByRole('checkbox', { name: /communication/i }));

    const managementCategory = screen.getByRole('button', {
      name: /management/i,
    });
    await user.click(managementCategory);
    await user.click(screen.getByRole('checkbox', { name: /reporting/i }));

    const softSkillsCategory = screen.getByRole('button', {
      name: /soft skills/i,
    });
    await user.click(softSkillsCategory);

    expect(
      screen.getByRole('checkbox', { name: /communication/i })
    ).toBeChecked();

    await user.click(managementCategory);

    expect(screen.getByRole('checkbox', { name: /reporting/i })).toBeChecked();

    await user.click(screen.getByRole('button', { name: /submit/i }));

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

    const { user } = render(refinedSchema, mockedSkills, false);

    await user.click(screen.getByRole('checkbox', { name: /communication/i }));

    const managementCategory = screen.getByRole('button', {
      name: /management/i,
    });
    await user.click(managementCategory);
    await user.click(screen.getByRole('checkbox', { name: /reporting/i }));
    await user.click(screen.getByRole('button', { name: /submit/i }));

    await screen.findByText(/forms:roleAndSkillsMismatchError/i);
    expect(handleSubmit).toHaveBeenCalledTimes(0);
  });

  it('should display a custom error message', async () => {
    const atMostThreeSkills = 'atMostThreeSkills';

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
    const { user } = render(refinedSchema, mockedSkills, false);

    expect(
      screen.queryByRole('checkbox', { name: /communication/i })
    ).toBeInTheDocument();

    const techCategory = screen.getByRole('button', {
      name: /tech/i,
    });
    await user.click(techCategory);

    await user.click(screen.getByRole('checkbox', { name: /jest/i }));
    await user.click(screen.getByRole('checkbox', { name: /react/i }));
    await user.click(screen.getByRole('checkbox', { name: /typescript/i }));
    await user.click(screen.getByRole('checkbox', { name: /github actions/i }));

    await user.click(screen.getByRole('button', { name: /submit/i }));

    await screen.findByText(/forms:atMostThreeSkills/i);
    expect(handleSubmit).toHaveBeenCalledTimes(0);
  });

  it('should be able to check and uncheck items', async () => {
    const refinedSchema = zod.object({
      technos: zod
        .preprocess((v) => parseInt(zod.string().parse(v), 10), zod.number())
        .array(),
    });

    const { user } = render(refinedSchema, mockedSkills, false);

    await user.click(screen.getByRole('checkbox', { name: /communication/i }));
    await user.click(
      screen.getByRole('checkbox', { name: /information sharing/i })
    );

    expect(
      screen.getByRole('checkbox', { name: /communication/i })
    ).toBeChecked();

    await user.click(screen.getByRole('checkbox', { name: /communication/i }));

    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ technos: [8] })
      )
    );

    await user.click(screen.getByRole('checkbox', { name: /communication/i }));

    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({ technos: [8, 6] })
      )
    );
  });

  it('should display a loading indicator when checking', async () => {
    render(schema, mockedSkills, true);

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();

    expect(screen.getAllByTestId('CachedIcon')).toHaveLength(2);
  });
});
