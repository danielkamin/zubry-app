import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { useAlertContext } from '@/store';
import { ShopService } from '@/api';
import ShopLayout from 'src/components/layout/Shop/index';
import { TSession } from '@/types';
import AccountOrderInfo from 'src/components/page/Account/AccountOrderInfo';
import NewButton from 'src/components/simple/NewButton';
import { TStrapiContentItem, TStrapiOrder } from '@/types';
import HorizontalCardSkeleton from 'src/components/simple/HorizontalCardSkeleton';

const Order = ({ order }: { order: TStrapiContentItem<TStrapiOrder> }) => {
  const router = useRouter();
  const alertContext = useAlertContext();

  const { data } = useSession();

  const createReturn = async () => {
    const { status } = await ShopService.returnOrder(order.id, order.attributes.Order_Number, data as TSession);
    if (status) {
      alertContext.openAlert('success', 'Poprawnie stworzono zwrot. Proszę czekać na informacje drogą mailową.');
    } else alertContext.openAlert('error', 'Coś poszło nie tak. Proszę skontaktować się z administratorem.');
    router.push('/sklep/konto/zwroty');
  };
  return (
    <div className="flex justify-center">
      {router.isFallback || !order ? (
        <HorizontalCardSkeleton />
      ) : (
        <div className="flex flex-col gap-4">
          <AccountOrderInfo order={order} />
          <NewButton onClick={createReturn} disabled={order.attributes.Is_Returned} fullWidth={false}>
            ZWRÓĆ
          </NewButton>
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const { params } = ctx;
  const { result } = await ShopService.getOrder(params.slug, session as TSession);
  return {
    props: {
      order: result.data
    }
  };
}

export default Order;
Order.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};
