import { FC } from 'react';

import AccountDrawer from '@/components/page/Account/AccountSidebar';

interface IAccountSectionProps {
  title: string;
}

const AccountSection: FC<IAccountSectionProps> = ({ children, title }) => {
  return (
    <section className="container flex justify-center flex-col items-center">
      <h1 className="text-gray-600 font-medium my-12 text-2xl">{title}</h1>
      <div className="flex md:flex-row flex-col justify-center md:gap-16">
        <AccountDrawer />
        {children}
      </div>
    </section>
  );
};

export default AccountSection;
