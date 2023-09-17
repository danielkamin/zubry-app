import { FacebookOutlined, YoutubeOutlined, InstagramOutlined } from '@ant-design/icons';
import Link from 'next/link';

const ShopFooter = () => {
  return (
    <footer className="bg-black py-8 xl:pt-8">
      <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 text-white">
        <ul className="text-lg pb-8 flex flex-wrap justify-center">
          <li className="w-1/2 md:w-1/3 lg:w-1/3">
            <div className="text-center">
              <h2 className="text-white uppercase mb-4">Obsługa Klienta</h2>
              <ul className="text-sm">
                <li className="mb-4 hover:text-purple-600  transition-colors duration-200">
                  <Link href="/sklep/informacje/dostawy">Dostawy</Link>
                </li>
                <li className="mb-4 cursor-not-allowed text-gray-200  transition-colors duration-200">
                  <span>Reklamacje</span>
                </li>
                <li className="mb-4 hover:text-purple-600  transition-colors duration-200">
                  <Link href="/sklep/informacje/zwroty">Zwroty</Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="w-1/2 md:w-1/3 lg:w-1/3">
            <div className="text-center">
              <h2 className="text-white  text-md uppercase mb-4">Kontakty</h2>
              <ul className="text-sm">
                <li className="mb-4 hover:text-purple-600 transition-colors duration-200">
                  <Link href="/klub/kontakt">Nasza siedziba</Link>
                </li>
                <li className="mb-4 hover:text-purple-600  transition-colors duration-200">
                  <a
                    href="https://www.facebook.com/zubryofficial"
                    target="_blank"
                    rel="noreferrer"
                    referrerPolicy="no-referrer"
                  >
                    Facebook
                  </a>
                </li>
                <li className="mb-4 hover:text-purple-600  transition-colors duration-200">
                  <a href="tel:xxx xxx xxx">tel. xxx xxx xxx</a>
                </li>
              </ul>
            </div>
          </li>
          <li className="w-1/2 md:w-1/3 lg:w-1/3">
            <div className="text-center">
              <h2 className="text-white  text-md uppercase mb-4">Regulaminy</h2>
              <ul className="text-sm">
                <li className="mb-4 hover:text-purple-600  transition-colors duration-200">
                  <Link href="/sklep/informacje/polityka_prywatnosci">Polityka Prywatności</Link>
                </li>
                <li className="mb-4 hover:text-purple-600 transition-colors duration-200">
                  <Link href="/sklep/informacje/regulamin">Regulamin Sklepu</Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div className="pt-8 flex border-t border-gray-100 max-w-xs mx-auto items-center justify-between">
          <a
            href="https://www.facebook.com/zubryofficial"
            target="_blank"
            rel="noreferrer"
            referrerPolicy="no-referrer"
            className="text-2xl transition hover:text-purple-600"
          >
            <FacebookOutlined />
          </a>
          <a
            href="https://www.youtube.com/channel/UCJjJFlFRbKVCR00I5bWbQIA"
            target="_blank"
            rel="noreferrer"
            referrerPolicy="no-referrer"
            className="text-2xl transition hover:text-purple-600"
          >
            <YoutubeOutlined />
          </a>
          <a
            href="https://www.instagram.com/zubry_bialystok/"
            target="_blank"
            rel="noreferrer"
            referrerPolicy="no-referrer"
            className="text-2xl transition hover:text-purple-600"
          >
            <InstagramOutlined />
          </a>
        </div>
        <div className="text-center pt-10 sm:pt-12 font-light flex items-center justify-center">
          Created by Adam Sulima Dolina, Daniel Kamiński
        </div>
      </div>
    </footer>
  );
};

export default ShopFooter;
