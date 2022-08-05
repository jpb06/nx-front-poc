import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { Children, cloneElement, isValidElement } from 'react';
import { Control, DeepPartial, useForm } from 'react-hook-form';

type FormTestingComponentProps<TForm> = {
  onSubmit: (d: unknown) => void;
  defaultValues?: DeepPartial<TForm> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any;
  children: JSX.Element;
};

export function FormTestingComponent<TForm>({
  onSubmit,
  defaultValues,
  schema,
  children,
}: FormTestingComponentProps<TForm>) {
  const { control, handleSubmit } = useForm<TForm>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = handleSubmit((data) => onSubmit(data));

  return (
    <Box component="form" onSubmit={handleFormSubmit}>
      {Children.map(children, (child) => {
        if (
          isValidElement<{
            control: Control<TForm>;
          }>(child)
        ) {
          return cloneElement(child, {
            control,
          });
        }

        return child;
      })}
      <Button type="submit">Submit</Button>
    </Box>
  );
}
