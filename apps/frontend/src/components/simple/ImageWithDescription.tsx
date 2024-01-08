/* eslint-disable @typescript-eslint/no-explicit-any */
import { TStrapiImageWithAdditionalInfo } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
interface IImageWithDescription {
  description: string;
  picture: TStrapiImageWithAdditionalInfo;
  isBanner: boolean;
}
export const ImageWithDescription = ({ description, picture, isBanner }: IImageWithDescription) => {
  if (isBanner)
    return (
      <div>
        <div className="relative lg:h-96 md:h-60 sm:h-48 h-40 w-auto mb-4">
          <Image
            width={0}
            height={0}
            style={{ width: 'auto', height: '100%' }} // optional
            className="rounded-xl"
            sizes="100vw"
            src={picture.url}
            alt={''}
          />
        </div>
        <p className="text-gray-700">{description}</p>
      </div>
    );
  return (
    <div>
      <div className="lg:h-96 md:h-60 sm:h-48 h-40 overflow-hidden rounded-lg bg-gray-200 relative w-72">
        <Image src={picture.url} alt={description} layout="fill" objectFit="cover" />
      </div>
      <p className="mt-4 text-lg font-medium text-gray-800">{description}</p>
    </div>
  );
};

export const ImageWithDescriptionWithRedirect = ({
  redirectUrl,
  ...props
}: { redirectUrl: string } & IImageWithDescription) => {
  return (
    <Link href={redirectUrl} className="hover:opacity-75 transition-opacity">
      <ImageWithDescription {...props} />
    </Link>
  );
};
