import { getSession } from 'next-auth/react';

import ShopLayout from '@/components/layout/Shop/index';
import ShopService from '@/modules/services/shop.service';
import AccountOrderInfo from '@/components/page/Account/AccountOrderInfo';
import Link from 'next/link';
import { TSession } from '@/types/common.types';
import { TStrapiContentItem, TStrapiOrder } from '@/types/strapi.types';

const OrderSummary = ({ order }: { order: TStrapiContentItem<TStrapiOrder> }) => {
  return (
    <div className="flex flex-col items-center gap-9 md:mx-28 xl:mx-48 mx-4">
      <h1 className="text-3xl font-medium mb-4">Podsumowanie zamówienia:</h1>
      <div className="container">
        <p>
          Bardzo dziękujemy za złożenie zamówienia. Podsumowanie zostało przesłane na maila wraz z informacją na jakie
          konto należy dokonać wpłaty. Wszelkie informacje dotyczące zamówienia można uzyskać drogą mailową lub
          telefoniczną, które to dane kontaktowe można znaleźć{' '}
          <Link href="/kontakt">
            <a className="text-purple-600 underline font-medium">TUTAJ</a>
          </Link>
        </p>
      </div>

      <div>
        <AccountOrderInfo order={order} />
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const { query } = ctx;
  const { result } = await ShopService.getOrder(query.order, session as TSession);
  return {
    props: {
      order: result.data
    }
  };
}

export default OrderSummary;
OrderSummary.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};
