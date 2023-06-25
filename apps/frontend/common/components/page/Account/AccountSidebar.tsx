import { isCurrentPath } from '@/utils/helpers';
import Link from 'next/link';
import { useRouter } from 'next/router';
const AccountSidebar = () => {
  const router = useRouter();

  const getLinkTextColor = (path) => {
    return isCurrentPath(path, router) ? 'text-purple-600' : 'text-gray-900';
  };
  return (
    <div className="text-black">
      <div className="flex gap-2 ml-2 md:flex-col text-xl">
        {/* <Link href="/sklep/konto">
          <a
            className={`${getLinkTextColor('/sklep/konto')} flex hover:text-gray-400  px-3 py-2 rounded-md font-medium`}
          >
            Konto
          </a>
        </Link> */}
        <Link href="/sklep/konto/zamowienia">
          <a
            className={`${getLinkTextColor(
              '/sklep/konto/zamowienia'
            )} flex hover:text-gray-400  px-3 py-2 rounded-md font-medium`}
          >
            Zamowienia
          </a>
        </Link>
        <Link href="/sklep/konto/zwroty">
          <a
            className={`${getLinkTextColor(
              '/sklep/konto/zwroty'
            )} flex hover:text-gray-400  px-3 py-2 rounded-md font-medium`}
          >
            Zwroty
          </a>
        </Link>
        <span className={`flex text-gray-400 cursor-not-allowed px-3 py-2 rounded-md font-medium `}>Reklamacje</span>
        <span className={`flex text-gray-400 cursor-not-allowed px-3 py-2 rounded-md font-medium `}>Zmiana hasła.</span>
      </div>
    </div>
  );
};

export default AccountSidebar;
