import Link from 'next/link';
const DesktopDropDownWithLinks = ({ items, title, titleColor }) => {
  return (
    <div className="flex flex-col justify-center font-semibold">
      <div className="flex items-center justify-center">
        <div className="relative inline-block text-left dropdown z-50 bg-transparent">
          <button
            className={`font-semibold inline-flex justify-center w-full py-2 text-${titleColor} hover:opacity-50 transition duration-150 ease-in-out bg-transparent focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50`}
            type="button"
            aria-haspopup="true"
            aria-expanded="true"
            aria-controls="headlessui-menu-items-117"
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
          <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
            <div
              className="z-50 absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
              aria-labelledby="headlessui-menu-button-1"
              id="headlessui-menu-items-117"
              role="menu"
            >
              {items.map((item, index) => (
                <Link href={item.url} key={index}>
                  <a
                    tabIndex={index}
                    className="z-50 relative text-gray-700 flex justify-between w-full px-4 py-4 text-left transition-all hover:bg-gray-200"
                    role="menuitem"
                  >
                    {item.text}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopDropDownWithLinks;
