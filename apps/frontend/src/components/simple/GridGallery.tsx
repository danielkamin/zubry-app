import { TStrapiImageWithAdditionalInfo } from '@/types';
import ImageWithTags from './ImageWithTags';
const GridGallery = ({ images }: { images: TStrapiImageWithAdditionalInfo[] }) => {
  return (
    <ul className="flex gap-3 my-12 flex-wrap justify-center">
      {images ? (
        images.map(({ caption, url, name }) => (
          <ImageWithTags key={url} imageSrc={url} altName={name} tags={caption ? caption.split(',') : null} />
        ))
      ) : (
        <p className="text-gray-400 text-lg my-4 block text-center">Brak zdjęć do wyswietlenia...</p>
      )}
    </ul>
  );
};

export default GridGallery;
