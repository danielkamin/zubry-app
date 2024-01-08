import { TStrapiSponsor } from '@/types';
import Image from 'next/legacy/image';

const Sponsor = ({ sponsorData }: { sponsorData: TStrapiSponsor }) => {
  const generateLink = (url: string | null) => {
    if (url) {
      return url.startsWith('http') ? url : `http://${url}`;
    } else return '#';
  };
  return (
    <div className="w-full block">
      <a rel="noreferrer" href={generateLink(sponsorData.Url)}>
        <div className="image-container relative w-full h-40 md:h-52">
          <Image
            src={sponsorData.Image.data.attributes.url}
            layout="fill"
            objectFit="contain"
            alt="Logo drużyny Żubry Białystok"
          />
        </div>
      </a>
      <div className="lg:w-auto w-full ">
        <div className="font-bold text-2xl mb-4">{sponsorData.Name}</div>
        <p className="text-gray-700">{sponsorData.Description}</p>
      </div>
      <div className="divider-horizotal mt-8 mb-12"></div>
    </div>
  );
};

export default Sponsor;
