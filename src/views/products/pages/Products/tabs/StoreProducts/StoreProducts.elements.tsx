import { Button, Skeleton } from '@mantine/core';

export const ProductsLoadingPreview: React.FC = () =>
  [1, 2, 3, 4, 5, 6, 7, 8].map(i => <Skeleton key={i} height={312} />);

export const LimitButtons: React.FC<{ setLimit: (limit: number) => void }> = ({ setLimit }) => (
  <div className="mt-12 mb-10 flex justify-center gap-6">
    <Button onClick={() => setLimit(8)}>Load 8</Button>
    <Button onClick={() => setLimit(16)}>Load 16</Button>
    <Button onClick={() => setLimit(20)}>Load All</Button>
  </div>
);
