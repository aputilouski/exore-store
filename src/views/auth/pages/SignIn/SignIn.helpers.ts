import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  username: z.string().min(1, 'Please enter username'),
  password: z.string().min(1, 'Please enter password'),
});

export type SignInParams = z.infer<typeof schema>;

export const resolver = zodResolver(schema);
