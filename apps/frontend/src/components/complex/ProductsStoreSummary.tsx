import Image from "next/legacy/image";
import { DeleteOutlined } from '@ant-design/icons';

import { useAlertContext, useCartStore } from '@/store';

interface IProductsFromStoreListProps {
  readOnly: boolean;
}

const ProductsStoreSummary: React.FC<IProductsFromStoreListProps> = ({ readOnly = true }) => {
  const { products, removeProductFromCart } = useCartStore();
  const alertContext = useAlertContext();

  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr className="font-semibold">
          <th
            scope="col"
            className="px-6 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase "
          >
            Produkt
          </th>
          <th
            scope="col"
            className="px-6 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase "
          >
            Cena
          </th>
          <th
            scope="col"
            className="px-6 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase "
          >
            Ilość
          </th>
          <th
            scope="col"
            className="px-6 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase "
          >
            Rozmiar
          </th>
          {!readOnly && (
            <th
              scope="col"
              className="px-6 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase "
            ></th>
          )}
        </tr>
      </thead>
      <tbody className="text-center">
        {products.map((product) => (
          <tr key={product.storeId}>
            <td className="px-6 py-5 border-b border-gray-200 bg-white text-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-24 h-24 relative radiu">
                  <Image layout="fill" objectFit="cover" src={product.imageUrl} alt={product.name} />
                </div>
                <div className="ml-3">
                  <p className="text-gray-900 whitespace-no-wrap">{product.name}</p>
                </div>
              </div>
            </td>
            <td className="px-6 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 whitespace-no-wrap">{product.price}</p>
            </td>
            <td className="px-6 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 whitespace-no-wrap">{product.quantity}</p>
            </td>
            <td className="px-6 py-5 border-b border-gray-200 bg-white text-sm">
              <p className="text-gray-900 whitespace-no-wrap">{product.size.size}</p>
            </td>
            {!readOnly && (
              <td className="px-6 py-5 border-b border-gray-200 bg-white">
                <span
                  className="text-red-500 text-base flex p-2 cursor-pointer transition-colors hover:text-purple-600"
                  onClick={() => {
                    alertContext.openAlert('info', 'Usunięto produkt z koszyka.');
                    removeProductFromCart(product.storeId);
                  }}
                >
                  <DeleteOutlined />
                </span>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ProductsStoreSummary;
