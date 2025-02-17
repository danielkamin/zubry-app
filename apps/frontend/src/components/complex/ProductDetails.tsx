import Zoom from 'react-medium-image-zoom';

import { useAlertContext, useCartStore } from '@/store';
import AddProductForm from '../forms/AddProductForm';
import { TStrapiContentItem, TStrapiProduct } from '@/types';

const ProductDetails = ({ product }: { product: TStrapiContentItem<TStrapiProduct> }) => {
  const alertContext = useAlertContext();
  const { addProductToCart } = useCartStore();

  const addToCart = (formData) => {
    alertContext.openAlert('info', 'Dodano produkt do koszyka.');
    const sizeValues = formData.size.split(',');
    formData.size = {
      id: +sizeValues[0],
      size: sizeValues[1]
    };
    addProductToCart(product, formData);
  };

  return (
    <div className="flex flex-col items-center px-2">
      <div className="flex md:flex-row flex-col md:items-start items-center">
        <Zoom>
          <div className="product-image-wrapper flex justify-center md:mb-0 mb-8 md:mr-8">
            <img
              src={product.attributes.Image.data.attributes.url}
              className="product-image rounded-xl shadow"
              alt=""
            />
          </div>
        </Zoom>
        <div className="w-80 flex flex-col justify-between">
          <div className="mb-8">
            <h2 className="text-3xl mb-2">{product.attributes.Name}</h2>
            <span className="text-purple-600 font-medium text-xl">{product.attributes.Price} zł</span>
          </div>
          {product.attributes.Sizes?.data?.length > 0 ? (
            <AddProductForm sizes={product.attributes.Sizes.data} submitForm={addToCart} />
          ) : null}
        </div>
      </div>
      {product.attributes.Description ? (
        <p className="text-md text-gray-700 mt-6 md:w-3/5 xl:w-1/2 w-full">{product.attributes.Description}</p>
      ) : null}
    </div>
  );
};

export default ProductDetails;
