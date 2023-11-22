import React from 'react';
import { Image } from '@mantine/core';

type PhotoCardProps = {
  onClick?: () => void;
  title: string;
  image: string;
  price: number;
};

const ProductCard: React.FC<PhotoCardProps> = ({ onClick, title, image, price }) => (
  <div onClick={onClick} className="p-4 cursor-pointer border rounded hover:border-gray-400" tabIndex={0}>
    <Image src={image} alt={title} radius="sm" fit="contain" className="h-48" />
    <h4 className="text-center mt-3 mb-0.5 font-bold">{title}</h4>
    <div className="text-center">Price: ${price}</div>
  </div>
);

export default ProductCard;
