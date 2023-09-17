import { getSession } from 'next-auth/react';

import ShopLayout from 'src/components/layout/Shop/index';
import AccountSection from 'src/components/page/Account/AccountSection';
import { TStrapiContentItem, TStrapiOrder } from '@/types';
import AccountOrderTable from 'src/components/page/Account/AccountOrderTable';
import { ShopService } from '@/api';
import { TSession } from '@/types';

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
