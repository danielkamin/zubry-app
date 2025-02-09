import { TStrapiProduct } from '@/types';

const ShoppingCard = ({ product }: { product: TStrapiProduct }) => {
  return (
    <>
      <div className="aspect-w-1 aspect-h-1 w-full h-56 overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <img
          src={product.Image.data.attributes.url}
          alt={product.Name}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-base text-gray-800 ">{product.Name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{product.Price} zł</p>
    </>
  );
};

export default ShoppingCard;
