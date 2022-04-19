import { writable } from "svelte/store";
import type { FormState } from '../../utils/types';
import { ValidationError, SchemaOf } from 'yup';

export function createForm<T>(initialValues: T, validationSchema: SchemaOf<T>, onSubmit: Function) {

  const form = writable(initialValues);
  const errors = writable({});
  const formState = writable<FormState>({
    loading: false,
    submitting: false,
    submitted: false,
    error: false
  });

  async function setErrors(validationErrors: ValidationError) {
    if (validationErrors instanceof ValidationError) {
      const oldErrors = await new Promise<T>((resolve) => {
        errors.subscribe(resolve)();
      });
      const newErrors = { ...oldErrors };
      for (const error of Object.keys(newErrors)) {
        newErrors[error] = '';
      }
      validationErrors.inner.map((e: ValidationError) => {
        newErrors[e.path] = e.message;  
      });
      errors.set(newErrors);
    }
  }

  async function resetFormAndSubmit(values: T) {
    const oldForm = await new Promise<T>((resolve) => {
      form.subscribe(resolve)();
    });
    const newForm = { ...oldForm };
    for (const prop of Object.keys(newForm)) {
      newForm[prop] = '';
    }
    form.set({ ...newForm });
    errors.set({ ...newForm });
console.log(form, errors);
    await onSubmit(values);
  }

  async function handleSubmit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    formState.update(state => state = { ...state, loading: true });
    const values = await new Promise<T>((resolve) => {
      form.subscribe(resolve)();
    });

    return (
      await validationSchema
        .validate(values, { abortEarly: false })
        .then(async () => {
          await resetFormAndSubmit(values);
        })
        .catch(async (error: Error) => {
          if (error instanceof ValidationError && error.inner) {
            setErrors(error);
          }
        }) 
        .finally(() => {
          formState.update(state => state = { ...state, loading: false });
        })
    );
  }

  return { 
    form,
    errors,
    formState,
    handleSubmit
  }
}
