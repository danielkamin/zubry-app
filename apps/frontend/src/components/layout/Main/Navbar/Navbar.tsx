import Link from 'next/link';
import Image from 'next/legacy/image';
import useSWR from 'swr';

import qs from 'qs';

import ZubryLogo from 'public/logo.png';
import MobileMenuLinks from './mobileMenuLinks';
import DesktopMenuLinks from './desktopMenuLinks';
import { publicAxiosInstance } from '@/utils';
import { TStrapiArrayResponse } from '@/types';

const Navbar = () => {
  const fetcher = async (url: string) => await publicAxiosInstance.get(url).then((res) => res.data);
  const { data } = useSWR(
    `/stronas?${qs.stringify(
      {
        sort: 'Order',
        populate: '*',
        publicationState: 'live',
        fields: ['Title', 'Page_Url'],
        filters: {
          Display_Menu: {
            $eq: true
          }
        }
      },
      {
        encodeValuesOnly: true
      }
    )}`,
    fetcher
  );
  const getDynamicLinks = (res: TStrapiArrayResponse<{ Title: string; Page_Url: string }>) => {
    if (!res?.data) return null;
    let links = [{ url: '/galeria', text: 'Galeria' }];
    links = [
      ...links,
      ...res.data.map((p) => ({
        url: `/klub${p.attributes.Page_Url}`,
        text: p.attributes.Title
      }))
    ];
    return links;
  };

  return (
    <nav
      className={`text-sm font-semibold text flex items-center justify-between md:justify-center h-20 shadow font-sans z-10 text-gray-900 bg-white`}
    >
      <div className="flex justify-center ml-8 md:mx-20 h-full items-center z-50">
        <Link href="/">
          <div className="cursor-pointer transition-opacity hover:opacity-75 h-50 w-14 relative">
            <Image src={ZubryLogo} layout="responsive" alt="Żubry Białystok" />
          </div>
        </Link>
      </div>
      <DesktopMenuLinks dynamicLinks={getDynamicLinks(data)} />
      <MobileMenuLinks dynamicLinks={getDynamicLinks(data)} />
    </nav>
  );
};

export default Navbar;
