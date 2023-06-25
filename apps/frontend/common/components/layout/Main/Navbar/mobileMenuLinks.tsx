import { useState } from 'react';
import Link from 'next/link';
import { MenuOutlined } from '@ant-design/icons';
//import { useRouter } from 'next/router';

import { terminarzDropDownItems, klubDropDownItems, druzynaDropDownItems } from './helpers';
import MobileDropDownWithLinks from './mobileDropDownWithLinks';

const MobileMenuLinks = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="w-1/5 flex justify-center md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`text-gray-800 flex text-3xl focus:outline-none leading-none focus:ring-2 focus:ring-primary focus:border-transparent rounded p-1`}
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
            <Link href="/aktualnosci">
              <a onClick={() => setMobileMenuOpen(false)} className="py-4 hover:bg-gray-200 block">
                Aktualności
              </a>
            </Link>
          </li>
          <li className="text-gray-800 my-4">
            <MobileDropDownWithLinks
              items={druzynaDropDownItems}
              title="Drużyna"
              onClick={() => setMobileMenuOpen(false)}
            />
          </li>
          <li className="text-gray-800 my-4">
            <Link href="/sponsorzy">
              <a onClick={() => setMobileMenuOpen(false)} className="py-4 hover:bg-gray-200 block">
                Współpraca
              </a>
            </Link>
          </li>
          <li className="text-gray-800 my-4">
            <MobileDropDownWithLinks
              items={terminarzDropDownItems}
              title="Terminarz"
              onClick={() => setMobileMenuOpen(false)}
            />
          </li>
          <li className="text-gray-800 my-4">
            <MobileDropDownWithLinks items={klubDropDownItems} title="Klub" onClick={() => setMobileMenuOpen(false)} />
          </li>
          <li className="text-gray-800 my-4">
            <Link href="/sklep">
              <a onClick={() => setMobileMenuOpen(false)} className="py-4 hover:bg-gray-200 block">
                Sklep
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MobileMenuLinks;
