import Link from 'next/link';
import { useState } from 'react';
const MobileDropDownWithLinks = ({ items, title, onClick }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col justify-center font-semibold">
      <div className="flex items-center justify-center">
        <div className="relative block w-full text-left bg-transparent">
          <span className="rounded-md">
            <button
              className="items-center font-semibold inline-flex justify-center w-full px-4 py-4 text-gray-800 hover:opacity-50 transition duration-150 ease-in-out bg-transparent focus:outline-none active:bg-gray-50"
              type="button"
              aria-haspopup="true"
              aria-expanded="true"
              aria-controls="headlessui-menu-items-117"
              onClick={() => setOpen(!open)}
            >
              <span>{title}</span>
              <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </span>
          <div className={`${open ? 'block' : 'hidden'} transition-all duration-300`}>
            <div
              className="w-full mt-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
              aria-labelledby="headlessui-menu-button-1"
              id="headlessui-menu-items-117"
              role="menu"
            >
              {items ? (
                items.map((item, index) => (
                  <Link
                    href={item.url}
                    key={index}
                    tabIndex={index}
                    className="z-50 relative text-gray-700 flex justify-between w-full px-4 py-4 text-left transition-all hover:bg-gray-200"
                    role="menuitem"
                    onClick={onClick}
                  >
                    {item.text}
                  </Link>
                ))
              ) : (
                <span>Brak danych</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDropDownWithLinks;
