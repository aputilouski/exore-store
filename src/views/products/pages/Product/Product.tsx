import { useParams } from 'react-router-dom';
import { Image, Skeleton } from '@mantine/core';
import { ErrorAlert } from '@shared/components';
import { useGetProductQuery } from '@store';

const Product: React.FC = () => {
  const params = useParams<{ id: string }>();

  const { data: product, isLoading, isError, error } = useGetProductQuery(params.id);

  return (
    <>
      {isError && <ErrorAlert error={error} />}

      <div className="max-w-2xl mx-auto">
        {isLoading && <Skeleton height={600} />}

        {product && (
          <div className="border rounded py-4 px-6 text-center relative">
            <div className="mb-2 absolute top-4 left-6">
              <span className="py-1 px-2 rounded-xl bg-red-500 text-white font-bold">{product.category}</span>
            </div>

            <Image radius="sm" src={product.image} className="h-96 mb-5" fit="contain" />

            <h2 className="text-2xl font-bold mb-1.5">{product.title}</h2>

            <p className="mb-2">{product.description}</p>

            <div className="font-bold text-xl">Price: ${product.price}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Product;
