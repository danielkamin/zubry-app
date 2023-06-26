import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';

import ShopLayout from '@/components/layout/Shop/index';
import AccountSection from '@/components/page/Account/AccountSection';
import UserService from 'common/services/user.service';
import { TStrapiUser } from '@/types/strapi.types';
import { TSession } from '@/types/common.types';

const Account = ({ accountInfo }: { accountInfo: TStrapiUser }) => {
  return (
    <AccountSection title="Moje konto.">
      <pre>{JSON.stringify(accountInfo, null, 2)}</pre>
    </AccountSection>
  );
};

export default Account;

export async function getServerSideProps(ctx: NextPageContext) {
  const session = (await getSession(ctx)) as TSession;
  const { result } = await UserService.getUserData(session.id as number, session.jwt as string);
  return {
    props: {
      accountInfo: result
    }
  };
}
Account.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};
