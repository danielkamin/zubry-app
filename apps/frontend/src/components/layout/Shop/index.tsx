import Meta from 'src/components/simple/Meta';
import ShopFooter from 'src/components/layout/Shop/Footer/Footer';
import ShopNavbar from 'src/components/layout/Shop/Navbar/Navbar';
import CookiesConsentBanner from '../../complex/CookieConsentBanner';

const ShopLayout = ({ children }) => {
  return (
    <>
      <Meta />
      <ShopNavbar />
      <main className="min-h-screen font-sans container mx-auto xl:px-8 md:px-6 px-2 2xl:px-12 md:mt-12 mt-6 mb-16">
        {children}
      </main>
      <CookiesConsentBanner />
      <ShopFooter />
    </>
  );
};

export default ShopLayout;
