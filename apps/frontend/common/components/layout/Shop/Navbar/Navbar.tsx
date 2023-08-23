import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserOutlined, ShoppingCartOutlined, PoweroffOutlined } from '@ant-design/icons';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { isCurrentPath } from '@/utils';
import useCartStore from 'common/store/shop.store';

const ShopNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { products } = useCartStore();
  const router = useRouter();
  const { status } = useSession();

  const getLinkTextColor = (path) => {
    return isCurrentPath(path, router) ? 'text-purple-600' : 'text-gray-900';
  };

  const handleLogOut = async () => {
    if (router.pathname.includes('konto')) await signOut({ callbackUrl: '/sklep' });
    else await signOut({ redirect: false });
  };
  return (
    <div className="md:mb-0 mb-6">
      <nav className="bg-white  shadow ">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className="w-full justify-between flex items-center">
              <div className="flex-shrink-0  flex items-center  ">
                <Link href="/">
                  <a className="h-12 hover:opacity-70 transition">
                    <img className="h-full w-auto" src="/logo.png" alt="Żubry Białystok" />
                  </a>
                </Link>
                <span className="mx-2 text-2xl relative -top-0.5 text-gray-900">|</span>
                <Link href="/sklep">
                  <a className="hover:text-purple-600 transition text-gray-900">
                    <span className={`font-medium text-lg  `}>Sklep</span>
                  </a>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/sklep/produkty">
                    <a
                      className={`${getLinkTextColor(
                        '/sklep/produkty'
                      )} hover:text-gray-400  px-3 py-2 rounded-md text-sm font-medium`}
                    >
                      Produkty
                    </a>
                  </Link>
                  <Link href="/sklep/koszyk">
                    <a
                      className={`${getLinkTextColor(
                        '/sklep/koszyk'
                      )} flex hover:text-gray-400  px-3 py-2 rounded-md text-2xl font-medium relative`}
                    >
                      <ShoppingCartOutlined />
                      {products.length > 0 && (
                        <span className="text-lg absolute right-0 bottom-0 text-purple-600">{products.length}</span>
                      )}
                    </a>
                  </Link>
                  {status === 'authenticated' ? (
                    <>
                      <Link href="/sklep/konto/zamowienia">
                        <a
                          className={`${getLinkTextColor(
                            '/sklep/konto/zamowienia'
                          )} flex hover:text-gray-400  px-3 py-2 rounded-md text-2xl font-medium`}
                        >
                          <UserOutlined />
                        </a>
                      </Link>
                      <span
                        onClick={handleLogOut}
                        className={`cursor-pointer text-gray-900 flex hover:text-gray-400  px-3 py-2 rounded-md text-xl font-medium`}
                      >
                        <PoweroffOutlined />
                      </span>
                    </>
                  ) : (
                    <Link href="/sklep/login">
                      <a
                        className={`${getLinkTextColor(
                          '/sklep/login'
                        )} flex hover:text-gray-400  px-3 py-2 rounded-md text-2xl font-medium`}
                      >
                        <UserOutlined />
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="block">
              <div className="ml-4 flex items-center md:ml-6"></div>
            </div>
            <div className="-mr-2 flex md:hidden text-2xl items-center gap-2">
              <Link href="/sklep/koszyk">
                <a className="text-gray-900 flex hover:text-gray-400  px-3 py-2 rounded-md font-medium relative">
                  <ShoppingCartOutlined />
                  {products.length > 0 && (
                    <span className="text-lg absolute right-0 bottom-0 text-purple-600">{products.length}</span>
                  )}
                </a>
              </Link>
              {status === 'authenticated' ? (
                <>
                  <Link href="/sklep/konto">
                    <a className="text-gray-900 flex hover:text-gray-400  px-3 py-2 rounded-md font-medium">
                      <UserOutlined />
                    </a>
                  </Link>
                  <span
                    onClick={handleLogOut}
                    className="cursor-pointer text-gray-900 flex hover:text-gray-400 px-3 py-2 rounded-md font-medium"
                  >
                    <PoweroffOutlined />
                  </span>
                </>
              ) : (
                <Link href="/sklep/login">
                  <a className="text-gray-900 flex hover:text-gray-400  px-3 py-2 rounded-md font-medium">
                    <UserOutlined />
                  </a>
                </Link>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-900 hover:text-gray-900 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="h-8 w-8"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/sklep/produkty">
                <a className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Produkty</a>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default ShopNavbar;
