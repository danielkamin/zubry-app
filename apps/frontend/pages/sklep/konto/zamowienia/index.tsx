import { getSession } from 'next-auth/react';

import ShopLayout from '@/components/layout/Shop/index';
import AccountSection from '@/components/page/Account/AccountSection';
import { TStrapiContentItem, TStrapiOrder } from '@/types/strapi.types';
import AccountOrderTable from '@/components/page/Account/AccountOrderTable';
import ShopService from '@/modules/services/shop.service';
import { TSession } from '@/types/common.types';

const MyOrders = ({ orders }: { orders: TStrapiContentItem<TStrapiOrder>[] }) => {
  return (
    <AccountSection title={'Moje zamówienia.'}>
      <div className="flex items-center flex-col">
        {orders && orders.length > 0 ? (
          <AccountOrderTable orders={orders} />
        ) : (
          <h1 className="text-gray-700">Brak informacji do wyświetlenia...</h1>
        )}
      </div>
    </AccountSection>
  );
};

export default MyOrders;

export async function getServerSideProps(ctx) {
  const session = (await getSession(ctx)) as TSession;
  const { result } = await ShopService.getUserOrders(session.id as number, session.jwt as string);

  return {
    props: {
      orders: result.data
    }
  };
}

MyOrders.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};
