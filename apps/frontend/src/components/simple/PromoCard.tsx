import Image from 'next/image';
import { FC } from 'react';
import Link from 'next/link';

import SubHeader from 'src/components/simple/SubHeader';
import Button from 'src/components/simple/Button';
import YoutubePlayer from './YoutubePromoCard';

interface IPromoCard {
  title: string;
  sourceUrl: string;
  description: string;
  redirectUrl?: string;
  redirectText?: string;
  isVideoPromo: boolean;
}

const PromoCard: FC<IPromoCard> = ({
  sourceUrl,
  description,
  title,
  redirectUrl,
  isVideoPromo,
  redirectText = 'Zobacz więcej'
}) => (
  <div className="flex lg:flex-row flex-col shadow-md rounded-xl border bg-white w-full">
    <div className="block lg:w-2/4 w-full lg:rounded-l-xl rounded-t-xl lg:rounded-tr-none overflow-hidden">
      {isVideoPromo ? (
        <YoutubePlayer url={sourceUrl} />
      ) : (
        <div className="relative xl:h-96 w-full md:h-80 h-64">
          <Image layout="fill" alt={title} objectFit="cover" src={sourceUrl} />
        </div>
      )}
    </div>
    <div className="flex flex-col lg:w-2/4 w-full p-8">
      <div>
        <SubHeader>{title}</SubHeader>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4 text-base flex text-justify z-10 relative">{description}</p>
      {redirectUrl && (
        <div className="mt-auto ml-auto">
          <Link href={redirectUrl}>
            <Button>{redirectText}</Button>
          </Link>
        </div>
      )}
    </div>
  </div>
);

export default PromoCard;
