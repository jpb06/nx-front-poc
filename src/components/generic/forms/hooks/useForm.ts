import { 
  useForm as useReactHookForm,
  FieldValues, 
  UseFormProps, 
  UseFormReturn 
} from 'react-hook-form';

type EnhancedUseFormReturn<TF, TC extends object> = UseFormReturn<TF, TC> & {
  triggerOnBlur: 
}

export const useForm = <
  TFieldValues extends FieldValues = FieldValues, 
  TContext extends object = object
>(
  props?: UseFormProps<TFieldValues, TContext>
) : UseFormReturn<TFieldValues, TContext> => {
  


  return useReactHookForm<TFieldValues, TContext>(props);
}


//  props?: UseFormProps<TFieldValues, TContext>
//): UseFormReturn<TFieldValues, TContext> = () => {
//  
//  return useReactHookForm<TFieldValues, TContext>({
//    defaultValues: formDefaultValues,
//    mode: "onSubmit",
//    resolver: zodResolver(schema, undefined, { mode: async ? "async" : "sync" }),
//  });
//}