import Link from 'next/link';

import ShopLayout from '@/components/layout/Shop/index';
import useCartStore from '@/modules/store/shop.store';
import NewButton from '@/components/simple/NewButton';
import ProductsStoreSummary from '@/components/complex/ProductsStoreSummary';

function DisplayMakeOrderButton({ productsCount }: { productsCount: number }) {
  if (productsCount === 0) return <NewButton disabled={true}>Złóż zamówienie</NewButton>;
  else
    return (
      <Link href="/sklep/nowe_zamowienie">
        <a>
          <NewButton disabled={false}>Złóż zamówienie</NewButton>
        </a>
      </Link>
    );
}

const ShoppingCart = () => {
  const { products, getProductsFullValue } = useCartStore();

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col">
        <div className="pt-8 pb-4">
          <ProductsStoreSummary readOnly={false} />
          <p className="text-right mt-4">
            Cena za produkty:<span className="font-semibold"> {getProductsFullValue()} zł</span>
          </p>
        </div>
        <DisplayMakeOrderButton productsCount={products.length} />
      </div>
    </div>
  );
};

export default ShoppingCart;

ShoppingCart.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};
