import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import ShopLayout from '@/components/layout/Shop/index';
import useCartStore from 'common/store/shop.store';
import NewOrderForm from '@/components/forms/NewOrderForm';
import ShopService from 'common/services/shop.service';
import { useAlertContext } from 'common/store/alert.context';
import ProductsStoreSummary from '@/components/complex/ProductsStoreSummary';
import { TSession } from '@/types/common.types';

const NewOrder = () => {
  const { products, clearCart } = useCartStore();
  const router = useRouter();
  const alertContext = useAlertContext();

  const createOrder = async (orderData) => {
    const { status, result } = await ShopService.createOrder(products, orderData, data as TSession);
    ShopService.sendOrderConfirmationEmail(products, orderData, data as TSession).catch((err) => console.error(err));
    if (status) {
      clearCart();
      router.push(`/sklep/podsumowanie_zamowienia?order=${result.data.id}`);
    } else {
      alertContext.openAlert('error', 'Coś poszło nie tak. Proszę skontaktować się z administratorem.');
      router.push('/sklep/konto/zamowienia');
    }
  };

  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      setTimeout(() => router.push('/sklep/login'), 800);
    }
  });
  if (status === 'loading') {
    return (
      <h1 className="text-gray-600 flex justify-center font-medium my-12">
        Nastąpi przekierowanie do strony logowania.
      </h1>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-gray-800 text-2xl font-medium my-12">Podsumowanie zamówienia</h1>
      <div className="flex md:flex-row flex-col justify-center md:gap-16">
        <div className="flex flex-col">
          <ProductsStoreSummary readOnly />
        </div>
        <div className="w-96">
          <NewOrderForm formHandler={createOrder} />
          <div className="mt-4">
            <span className="custom-required-field"></span> - pole wymagane do zamówienia
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;

NewOrder.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};
