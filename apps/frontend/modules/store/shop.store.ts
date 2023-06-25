import create from 'zustand';
import { persist } from 'zustand/middleware';

import { TCartProduct } from '@/types/common.types';
import { TStrapiContentItem, TStrapiProduct } from '@/types/strapi.types';

type TCartProductDetails = {
  quantity: string;
  size: { id: number; size: string };
};
type TCartState = {
  products: TCartProduct[];
  addProductToCart: (product: TStrapiContentItem<TStrapiProduct>, productDetails: TCartProductDetails) => void;
  removeProductFromCart: (storeId: string) => void;
  clearCart: () => void;
  getProductsFullValue: () => string | -1;
};
const useCartStore = create<TCartState>(
  persist(
    (set, get) => ({
      products: [],
      addProductToCart: (product, productDetails) => {
        set((state) => ({
          products: [
            ...state.products,
            {
              storeId: `${product.id}-${new Date().getTime()}`,
              id: product.id,
              price: product.attributes.Price,
              size: productDetails.size,
              quantity: +productDetails.quantity,
              name: product.attributes.Name,
              imageUrl: `/strapi${product.attributes.Image.data.attributes.url}`
            }
          ]
        }));
      },
      removeProductFromCart: (storeId) => {
        set((state) => ({
          products: state.products.filter((product) => product.storeId !== storeId)
        }));
      },
      clearCart: () => {
        set(() => ({
          products: []
        }));
      },
      getProductsFullValue: () => {
        try {
          let finalValue = 0;
          get().products.forEach((product) => {
            finalValue += product.price * product.quantity;
          });
          return finalValue.toFixed(2);
        } catch (err) {
          console.error(err);
          return -1;
        }
      }
    }),
    {
      name: 'cart-storage', // unique name
      getStorage: () => sessionStorage // (optional) by default, 'localStorage' is used
    }
  )
);

export default useCartStore;
