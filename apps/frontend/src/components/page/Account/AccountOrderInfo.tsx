import Image from 'next/legacy/image';

import { TStrapiContentItem, TStrapiOrder } from '@/types';
import { getOrderStatusText } from '@/utils';

const AccountOrderInfo = ({ order }: { order: TStrapiContentItem<TStrapiOrder> }) => {
  const getOrderFullAmount = () => {
    let orderFullAmount = 0;
    order.attributes.Details.forEach((orderProduct) => {
      orderFullAmount += orderProduct.Count * orderProduct.Product.data.attributes.Price;
    });
    return orderFullAmount.toFixed(2);
  };
  return (
    <div>
      <div className="mb-8 font-semibold text-3xl text-gray-700">
        <h3>Numer zamówienia: {order.attributes.Order_Number}</h3>
      </div>
      <div className="p-4 border rounded-xl bg-white shadow">
        <div className="flex justify-around gap-20">
          <section className="flex flex-col">
            <p className="font-bold mb-1">Dane Kontaktowe</p>
            <p>Imię: {order.attributes.First_Name}</p>
            <p>Nazwisko: {order.attributes.Last_Name}</p>
            <p>Telefon: {order.attributes.Phone_Number}</p>
          </section>
          <section className="flex flex-col">
            <p className="font-bold mb-1">Adres Rozliczeniowy</p>
            <p>Miasto: {order.attributes.City}</p>
            <p>Kod pocztowy: {order.attributes.Zip_Code}</p>
            <p>
              Numer budynku i lokalu: {order.attributes.Building_Number}/{order.attributes.Apartment_Number}
            </p>
          </section>
          <section className="flex flex-col">
            <p className="font-bold mb-1">Pozostałe informacje</p>
            <p>
              Status:{' '}
              <span className="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight">
                <span aria-hidden="true" className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"></span>
                <span className="relative">{getOrderStatusText(order.attributes)}</span>
              </span>
            </p>
            <p suppressHydrationWarning>
              Data zamówienia: {new Date(order.attributes.Order_Date).toLocaleDateString()}
            </p>
            <p>Data wysłania: --</p>
          </section>
        </div>
        <div className="pt-8 pb-4">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="font-semibold">
                <th
                  scope="col"
                  className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase "
                >
                  Produkt
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase "
                >
                  Cena
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase "
                >
                  Ilość
                </th>
              </tr>
            </thead>
            <tbody>
              {order.attributes.Details.map((orderProduct) => (
                <tr key={orderProduct.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-24 h-24 relative radiu">
                        <Image
                          layout="fill"
                          alt={orderProduct.Product.data.attributes.Name}
                          objectFit="cover"
                          src={orderProduct.Product.data.attributes.imageUrl}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">{orderProduct.Product.data.attributes.Name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{orderProduct.Product.data.attributes.Price}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{orderProduct.Count}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-right mt-4">
            Cena za produkty:<span className="font-semibold"> {getOrderFullAmount()} zł</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountOrderInfo;
