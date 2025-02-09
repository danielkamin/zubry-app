import { useState } from 'react';
import Link from 'next/link';
import { MenuOutlined } from '@ant-design/icons';
import MobileDropDownWithLinks from './mobileDropDownWithLinks';

const MobileMenuLinks = ({
  dynamicLinks
}: {
  dynamicLinks: Array<{
    url: string;
    text: string;
  }>;
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="w-1/5 flex justify-center md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`text-gray-800 flex text-3xl focus:outline-none leading-none focus:ring-2 focus:ring-primary-6 focus:border-transparent rounded p-1`}
        >
          <MenuOutlined />
        </button>
      </div>
      <div
        className={` bg-white absolute top-20 left-0 h-auto w-screen justify-center items-center z-40 border-b-2 shadow-sm ${
          mobileMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="block text-center text-lg font-semibold">
          <li className="text-gray-800 my-4">
            <Link href="/aktualnosci" onClick={() => setMobileMenuOpen(false)} className="py-4 hover:bg-gray-200 block">
              Aktualności
            </Link>
          </li>
          <li className="text-gray-800 my-4">
            <Link href="/druzyna_2lm" onClick={() => setMobileMenuOpen(false)} className="py-4 hover:bg-gray-200 block">
              Skład
            </Link>
          </li>
          <li className="text-gray-800 my-4">
            <Link href="/sponsorzy" onClick={() => setMobileMenuOpen(false)} className="py-4 hover:bg-gray-200 block">
              Współpraca
            </Link>
          </li>
          <li className="text-gray-800 my-4">
            <Link
              href="/terminarz_2lm"
              onClick={() => setMobileMenuOpen(false)}
              className="py-4 hover:bg-gray-200 block"
            >
              Terminarz
            </Link>
          </li>
          <li className="text-gray-800 my-4">
            <MobileDropDownWithLinks items={dynamicLinks} title="Klub" onClick={() => setMobileMenuOpen(false)} />
          </li>
          <li className="text-gray-800 my-4">
            <Link href="/sklep" onClick={() => setMobileMenuOpen(false)} className="py-4 hover:bg-gray-200 block">
              Sklep
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MobileMenuLinks;
