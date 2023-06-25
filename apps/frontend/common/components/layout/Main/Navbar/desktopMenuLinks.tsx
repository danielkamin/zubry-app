import Link from 'next/link';
//import { useRouter } from 'next/router';

import DesktopDropDownWithLinks from './desktopDropDownWithLinks';
import { terminarzDropDownItems, klubDropDownItems, druzynaDropDownItems } from './helpers';

const DesktopMenuLinks = () => {
  return (
    <ul className="justify-around flex-grow md:flex hidden">
      <li className="transition-opacity hover:opacity-50 flex items-center">
        <Link href="/aktualnosci">
          <a>Aktualności</a>
        </Link>
      </li>
      <li>
        <DesktopDropDownWithLinks items={druzynaDropDownItems} title="Drużyna" titleColor={'gray-900'} />
      </li>
      <li className="transition-opacity hover:opacity-50 flex items-center">
        <Link href="/sponsorzy">
          <a>Współpraca</a>
        </Link>
      </li>
      <li>
        <DesktopDropDownWithLinks items={terminarzDropDownItems} title="Terminarz" titleColor={'gray-900'} />
      </li>
      <li>
        <DesktopDropDownWithLinks items={klubDropDownItems} title="Klub" titleColor={'gray-900'} />
      </li>
      <li className="transition-opacity hover:opacity-50 flex items-center">
        <Link href="/sklep/">
          <a>Sklep</a>
        </Link>
      </li>
    </ul>
  );
};

export default DesktopMenuLinks;
