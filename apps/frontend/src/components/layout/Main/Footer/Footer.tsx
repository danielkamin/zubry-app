import {
  FacebookFilled,
  InstagramOutlined,
  YoutubeFilled,
  CopyrightOutlined,
  LinkedinOutlined,
  TwitterOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/legacy/image';
import TikTokLogo from 'public/tiktok.png';

const Footer = () => {
  return (
    <footer className="md:h-64 h-v75 w-100 grid md:grid-flow-col grid-flow-row md:gap-6 gap-10 justify-items-center bg-black justify-evenly text-white font-medium py-12 font-sans">
      <div className="grid grid-rows-3 items-center ">
        <a
          href="https://www.facebook.com/zubryofficial"
          target="_blank"
          rel="noreferrer"
          referrerPolicy="no-referrer"
          className="flex items-baseline transition-opacity hover:opacity-75"
        >
          <FacebookFilled style={{ fontSize: '1.5rem', backgroundColor: 'black', color: 'white' }} className="mr-2" />
          Facebook
        </a>
        <a
          href="https://www.youtube.com/channel/UCJjJFlFRbKVCR00I5bWbQIA"
          target="_blank"
          rel="noreferrer"
          referrerPolicy="no-referrer"
          className="flex items-baseline transition-opacity hover:opacity-75"
        >
          <YoutubeFilled style={{ fontSize: '1.5rem', backgroundColor: 'black', color: 'white' }} className="mr-2" />
          Youtube
        </a>
        <a
          href="https://www.instagram.com/zubry_bialystok/"
          target="_blank"
          rel="noreferrer"
          referrerPolicy="no-referrer"
          className="flex items-baseline transition-opacity hover:opacity-75"
        >
          <InstagramOutlined
            style={{ fontSize: '1.5rem', backgroundColor: 'black', color: 'white' }}
            className="mr-2"
          />
          Instagram
        </a>
      </div>
      <div className="grid grid-rows-3 items-center">
        <a
          href="https://www.tiktok.com/@zubrybialystok"
          target="_blank"
          rel="noreferrer"
          referrerPolicy="no-referrer"
          className="flex relative transition-opacity hover:opacity-75 items-center gap-2   "
        >
          <div className="bg-white rounded border-2 border-white flex">
            <Image src={TikTokLogo} width={24} height={24} alt="TikTok" />
          </div>
          Tiktok
        </a>
        <a
          href="https://twitter.com/Zubry_Bialystok"
          target="_blank"
          rel="noreferrer"
          referrerPolicy="no-referrer"
          className="flex items-baseline transition-opacity hover:opacity-75"
        >
          <TwitterOutlined style={{ fontSize: '1.5rem', backgroundColor: 'black', color: 'white' }} className="mr-2" />
          Twitter
        </a>
        <a
          href="https://www.linkedin.com/company/podlaski-klub-koszyk%C3%B3wki-%C5%BCubry-bia%C5%82ystok/"
          target="_blank"
          rel="noreferrer"
          referrerPolicy="no-referrer"
          className="flex items-baseline transition-opacity hover:opacity-75"
        >
          <LinkedinOutlined style={{ fontSize: '1.5rem', backgroundColor: 'black', color: 'white' }} className="mr-2" />
          Linkedin
        </a>
      </div>
      <div className="grid grid-rows-3 items-center  justify-items-center">
        <Link href="/klub/ciasteczka" className="transition-opacity hover:opacity-75">
          Polityka Prywatności
        </Link>
        <Link href="/sklep" className="transition-opacity hover:opacity-75">
          Sklep
        </Link>
        <Link href="/klub/kontakt" className="transition-opacity hover:opacity-75">
          Kontakt
        </Link>
      </div>
      <div className="grid grid-rows-2 items-center justify-items-center">
        <div className="flex flex-col justify-center items-center">
          <span className="">Strona zaprojektowana przez:</span>
          <span className="text-sm">Adam Sulima Dolina</span>
          <span className="text-sm">Daniel Kamiński</span>
        </div>
        <p className="flex items-center justify-center">
          <CopyrightOutlined className="mr-2" />
          Copyright PKK Żubry Białystok
        </p>
      </div>
    </footer>
  );
};

export default Footer;
