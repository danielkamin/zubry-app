import Link from 'next/link';
import Image from 'next/image';
//import { useRouter } from 'next/router';

import ZubryLogo from 'public/logo.png';
import MobileMenuLinks from './mobileMenuLinks';
import DesktopMenuLinks from './desktopMenuLinks';

const Navbar = () => {
  return (
    <nav
      className={`text-sm font-semibold text flex items-center justify-between md:justify-center h-20 shadow font-sans z-10 text-gray-900 bg-white`}
    >
      <div className="flex justify-center ml-8 md:mx-20 h-full items-center z-50">
        <Link href="/">
          <a>
            <div className="cursor-pointer transition-opacity hover:opacity-75 h-50 w-14 relative">
              <Image src={ZubryLogo} layout="responsive" alt="Żubry Białystok" />
            </div>
          </a>
        </Link>
      </div>
      <DesktopMenuLinks />
      <MobileMenuLinks />
    </nav>
  );
};

export default Navbar;
