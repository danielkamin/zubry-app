import { FC } from 'react';

interface IContactInfoProps {
  address: string;
  phoneNumber: string;
  openingHours: string;
  regon: string;
  nip: string;
  krs: string;
  bankAccountNumber: string;
}
const ContactInfo: FC<IContactInfoProps> = ({
  address,
  phoneNumber,
  openingHours,
  regon,
  nip,
  krs,
  bankAccountNumber
}) => {
  return (
    <div className="flex flex-col items-center">
      <p className="font-semibold text-lg mt-10 md:w-4/6 xl:w-3/6 w-5/6">
        Chcesz się z nami skontaktować? Uzyskać zdjęcia/materiały do publikacji? Napisz lub zadzwoń do nas!
      </p>
      <div className="border-t mb-10 mt-4 border-gray-300 md:w-4/6 xl:w-3/6 w-5/6"></div>

      <div className="text-gray-600 flex flex-col md:w-4/6 xl:w-3/6 w-5/6">
        <span className="my-1">
          Adres: <b>{address}</b>
        </span>
        <span className="my-1">
          <a href={`tel:${phoneNumber}`}>
            tel: <b>{phoneNumber}</b>
          </a>
        </span>
        <span className="my-1">
          Godziny otwarcia (pon-pt): <b>{openingHours}</b>
        </span>
        {regon && (
          <span className="my-1">
            REGON: <b>{regon}</b>
          </span>
        )}
        {nip && (
          <span className="my-1">
            NIP: <b>{nip}</b>
          </span>
        )}
        {krs && (
          <span className="my-1">
            KRS: <b>{krs}</b>
          </span>
        )}
        {bankAccountNumber && (
          <span className="my-1">
            Nr Konta bankowego: <b>{bankAccountNumber}</b>
          </span>
        )}
      </div>
    </div>
  );
};

export default ContactInfo;
