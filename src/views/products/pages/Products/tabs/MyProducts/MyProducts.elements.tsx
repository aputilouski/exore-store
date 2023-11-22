import { Skeleton } from '@mantine/core';

export const MyProductsLoadingPreview: React.FC = () => (
  <div className="flex flex-col gap-1">
    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
      <Skeleton key={i} height={42} />
    ))}
  </div>
);
