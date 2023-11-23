import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, NumberInput, Switch, TextInput, Textarea } from '@mantine/core';
import { UserProduct } from '@store';
import { resolver, defaultValues, ProductEditorParams, isEditMode } from './ProductEditor.helpers';

type ProductEditorProps = {
  mode: 'edit' | 'create';
  defaultValues?: UserProduct;
  onSubmit: SubmitHandler<ProductEditorParams>;
};

const ProductEditor: React.FC<ProductEditorProps> = props => {
  const { mode, defaultValues: productDefaultValues, onSubmit } = props;
  const editMode = isEditMode(mode);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    control,
  } = useForm<ProductEditorParams>({
    resolver,
    mode: 'onTouched',
    defaultValues: editMode ? productDefaultValues : defaultValues,
  });

  React.useLayoutEffect(() => {
    if (!editMode && isSubmitSuccessful) reset();
  }, [editMode, isSubmitSuccessful, reset]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="py-4 px-6 border rounded">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <TextInput //
            label="Name"
            placeholder="Name"
            {...register('title')}
            error={errors.title?.message}
            disabled={isSubmitting}
          />

          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <NumberInput //
                label="Price"
                placeholder="Price"
                allowNegative={false}
                {...field}
                error={errors.price?.message}
                disabled={isSubmitting}
              />
            )}
          />

          <Textarea //
            label="Description"
            placeholder="Description"
            {...register('description')}
            error={errors.description?.message}
            disabled={isSubmitting}
          />

          <Controller
            control={control}
            name="published"
            render={({ field: { value, ...field } }) => (
              <Switch //
                label="Published?"
                {...field}
                checked={value}
                error={errors.published?.message}
                disabled={isSubmitting}
              />
            )}
          />

          <div className="mt-5 text-center">
            <Button type="submit" loading={isSubmitting}>
              {editMode ? 'Edit product' : 'Create product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditor;
