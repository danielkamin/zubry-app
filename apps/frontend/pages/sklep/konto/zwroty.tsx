import { getSession } from 'next-auth/react';

import ShopLayout from '@/components/layout/Shop/index';
import AccountSection from '@/components/page/Account/AccountSection';
import AccountReturnsTable from '@/components/page/Account/AccountReturnsTable';
import ShopService from 'common/services/shop.service';
import { TStrapiContentItem, TStrapiReturn } from '@/types/strapi.types';
import { TSession } from '@/types/common.types';

const MyReturns = ({ returns }: { returns: TStrapiContentItem<TStrapiReturn>[] }) => {
  return (
    <AccountSection title="Moje zwroty.">
      <div className="flex items-center flex-col">
        {returns && returns.length > 0 ? (
          <AccountReturnsTable returns={returns} />
        ) : (
          <h1 className="text-gray-700">Brak informacji do wyświetlenia...</h1>
        )}
      </div>
    </AccountSection>
  );
};

export default MyReturns;

export async function getServerSideProps(ctx) {
  const session = (await getSession(ctx)) as TSession;
  const { result } = await ShopService.getUserReturns(session.id as number, session.jwt as string);
  return {
    props: {
      returns: result.data
    }
  };
}

MyReturns.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};
