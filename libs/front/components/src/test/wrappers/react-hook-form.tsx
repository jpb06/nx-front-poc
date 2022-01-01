import React from 'react';
import { FieldValues, UseFormProps, Control, useForm } from 'react-hook-form';

export function RHFWrapper<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
>({
  children,
  ...props
}: React.PropsWithChildren<UseFormProps<TFieldValues, TContext>>): JSX.Element {
  const { control, handleSubmit } = useForm({ ...props });

  return (
    <>
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement<{
            control: Control<TFieldValues, TContext>;
          }>(child)
        ) {
          return React.cloneElement(child, {
            control,
          });
        }
        return child;
      })}
    </>
  );
}
