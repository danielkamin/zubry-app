import Link from 'next/link';

import DesktopDropDownWithLinks from './desktopDropDownWithLinks';
const DesktopMenuLinks = ({
  dynamicLinks
}: {
  dynamicLinks: Array<{
    url: string;
    text: string;
  }> | null;
}) => {
  return (
    <ul className="justify-around flex-grow md:flex hidden">
      <li className="transition-opacity hover:opacity-50 flex items-center">
        <Link href="/aktualnosci">Aktualności</Link>
      </li>
      <li className="transition-opacity hover:opacity-50 flex items-center">
        <Link href="/druzyna_2lm">Skład</Link>
      </li>
      <li className="transition-opacity hover:opacity-50 flex items-center">
        <Link href="/sponsorzy">Współpraca</Link>
      </li>
      <li className="transition-opacity hover:opacity-50 flex items-center">
        <Link href="/terminarz_2lm">Terminarz</Link>
      </li>
      <li>
        <DesktopDropDownWithLinks items={dynamicLinks} title="Klub" titleColor={'gray-900'} />
      </li>
      <li className="transition-opacity hover:opacity-50 flex items-center">
        <Link href="/sklep/">Sklep</Link>
      </li>
    </ul>
  );
};

export default DesktopMenuLinks;
