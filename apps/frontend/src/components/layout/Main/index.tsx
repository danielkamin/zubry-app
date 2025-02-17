import Footer from 'src/components/layout/Main/Footer/Footer';
import Navbar from 'src/components/layout/Main/Navbar/Navbar';
import CookiesConsentBanner from 'src/components/complex/CookieConsentBanner';
import Meta from 'src/components/simple/Meta';

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <Navbar />
      <main className="min-h-screen font-sans text-gray-800 container mx-auto xl:px-8 md:px-6 px-4 2xl:px-12 md:mt-12 mt-6 mb-16">
        {children}
      </main>
      <Footer />
      <CookiesConsentBanner />
    </>
  );
};

export default Layout;
