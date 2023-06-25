import Zoom from 'react-medium-image-zoom';

import { TStrapiBasicImage, TStrapiContentItem } from '@/types/strapi.types';
const GridGallery = ({ images }: { images: TStrapiContentItem<TStrapiBasicImage>[] }) => {
  return (
    <ul className="flex gap-3 my-12 flex-wrap justify-center">
      {images ? (
        images.map((image, index) => (
          <li key={index} className="relative h-96 w-auto player-gallery-item ">
            <Zoom>
              <img
                className="rounded-xl"
                src={`/strapi${image.attributes.url}`}
                alt={image.attributes.name}
                loading="lazy"
              />
            </Zoom>
          </li>
        ))
      ) : (
        <p className="text-gray-400 text-lg my-4 block text-center">Brak zdjęć do wyswietlenia...</p>
      )}
    </ul>
  );
};

export default GridGallery;
