import Image from 'next/image';
import { useRouter } from 'next/router';

import HorizontalCardSkeleton from '@/components/simple/HorizontalCardSkeleton';
import { TStrapiContentItem, TStrapiImageWithFormats } from '@/types/strapi.types';

const ImagesRotator = ({ images }: { images: TStrapiContentItem<TStrapiImageWithFormats>[] }) => {
  const router = useRouter();
  if (router.isFallback) return <HorizontalCardSkeleton />;
  if (!images) return;
  function getImageUrl(imageAttrs: TStrapiImageWithFormats) {
    if (imageAttrs.formats && imageAttrs.formats.medium) {
      return imageAttrs.formats.medium.url;
    } else return imageAttrs.url;
  }
  return (
    <section className="images-rotator__wrapper">
      <article className="images-rotator__content">
        <div className="images-rotator__content-inner">
          <ul className="images-rotator__images-list">
            {images.map((image, index) => (
              <li className="images-rotator__image-wrapper" key={index}>
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={`/strapi${getImageUrl(image.attributes)}`}
                  alt={image.attributes.name}
                  style={{ minWidth: '400px' }}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="images-rotator__content-inner">
          <ul className="images-rotator__images-list">
            {images.map((image, index) => (
              <li className="images-rotator__image-wrapper" key={index}>
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={`/strapi${image.attributes.url}`}
                  alt={image.attributes.name}
                />
              </li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
};

export default ImagesRotator;
