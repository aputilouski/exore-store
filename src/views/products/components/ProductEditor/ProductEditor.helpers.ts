import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(2),
  price: z.coerce.number().min(0.1),
  description: z.string(),
  published: z.boolean(),
});

export type ProductEditorParams = z.infer<typeof schema>;

export const defaultValues: ProductEditorParams = {
  title: '',
  description: '',
  price: 0,
  published: false,
};

export const resolver = zodResolver(schema);

export const isEditMode = (mode: string) => mode === 'edit';
