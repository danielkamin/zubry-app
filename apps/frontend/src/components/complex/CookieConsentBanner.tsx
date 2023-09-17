import Link from 'next/link';
import Image from "next/legacy/image";
import { useCallback, useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';

const CookiesConsentBanner = () => {
  const [show, setShow] = useState(false);
  const getCookieConsent = useCallback(() => {
    checkCookieConsent() ? setShow(false) : setShow(true);
  }, [setShow]);

  useEffect(() => {
    getCookieConsent();
  }, [getCookieConsent]);

  const checkCookieConsent = () => {
    return Cookies.get('CookieConsent');
  };

  const setCookieConsent = () => {
    Cookies.set('CookieConsent', 'true', { expires: 30 });
    getCookieConsent();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="font-sans fixed shadow bottom-8 left-1/2 transform -translate-x-1/2 w-96 border rounded bg-white p-5 flex flex-col z-50">
      <div className="flex justify-between mb-4">
        <h4 className="font-bold ">TA STRONA UŻYWA CIASTECZKA.</h4>
        <div
          onClick={setCookieConsent}
          className="cursor-pointer font-semibold text-xl flex flex-col items-center hover:text-purple-600 transition ease-in duration-200"
        >
          <CloseOutlined />
        </div>
      </div>
      <p className="text-justify text-gray-600">
        Dowiedz się więcej o{' '}
        <Link href="/ciasteczka" className="text-purple-600 underline">
          celu ich używania
        </Link>{' '}
        i <a href="http://jakwylaczyccookie.pl">zmianie ustawień cookie</a> w przeglądarce. Korzystając ze strony
        wyrażasz zgodę na używanie ciasteczek, zgodnie z aktualnymi ustawieniami przeglądarki.
      </p>
      <div className="-mb-12 w-16 h-16 relative mx-auto mt-2">
        <Image src={'/cookie.png'} layout="fill" alt="ciasteczka" objectFit="contain" />
      </div>
    </div>
  );
};

export default CookiesConsentBanner;
