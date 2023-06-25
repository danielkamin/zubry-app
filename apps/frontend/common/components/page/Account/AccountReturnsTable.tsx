import { useRouter } from 'next/router';

import { goToPath } from '@/utils/helpers';
import { TStrapiContentItem, TStrapiReturn } from '@/types/strapi.types';

const AccountReturnsTable = ({ returns }: { returns: TStrapiContentItem<TStrapiReturn>[] }) => {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  Data zwrotu
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  Data przyjęcia
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  Numer Zamówienia
                </th>
              </tr>
            </thead>
            <tbody>
              {returns.map((returnObj) => (
                <tr
                  key={returnObj.id}
                  className="cursor-pointer bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => goToPath(`/sklep/konto/zamowienia/${returnObj.attributes.Order.data.id}`, router)}
                >
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {new Date(returnObj.attributes.Return_Date).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {new Date(returnObj.attributes.Return_Realization_Date).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <span className="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight">
                      <span aria-hidden="true" className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"></span>
                      <span className="relative">
                        {returnObj.attributes.Is_Realized ? 'Zrealizowany' : 'W trakcie'}
                      </span>
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {returnObj.attributes.Order.data.attributes.Order_Number}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountReturnsTable;
