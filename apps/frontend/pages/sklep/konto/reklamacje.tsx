import ShopLayout from '@/components/layout/Shop/index';
import AccountDrawer from '@/components/page/Account/AccountSidebar';
import { getSession } from 'next-auth/react';
import ShopService from '@/modules/services/shop.service';
import { TStrapiComplaint, TStrapiContentItem } from '@/types/strapi.types';
import { TSession } from '@/types/common.types';

const MyComplaints = ({ complaints }: { complaints: TStrapiContentItem<TStrapiComplaint>[] }) => {
  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-gray-500 font-medium my-12">Moje reklamacje.</h1>
      <div className="flex">
        {complaints.length ? (
          <pre>{JSON.stringify(complaints, null, 2)}</pre>
        ) : (
          <h1 className="text-gray-700">Brak informacji do wyświetlenia...</h1>
        )}
      </div>
    </div>
  );
};

export default MyComplaints;

export async function getServerSideProps(ctx) {
  const session = (await getSession(ctx)) as TSession;
  const { result } = await ShopService.getUserComplaints(session.id as number, session.jwt as string);
  return {
    props: {
      complaints: result.data
    }
  };
}

MyComplaints.getLayout = function getLayout(page) {
  return (
    <ShopLayout>
      <AccountDrawer />
      {page}
    </ShopLayout>
  );
};
