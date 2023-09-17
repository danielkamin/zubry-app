import Zoom from 'react-medium-image-zoom';
import Image from "next/image";
const ImageWithZoom = ({ imageSrc, altName }: { imageSrc: string; altName: string }) => {
  return (
    <div className="relative h-96 w-auto player-gallery-item">
      <Zoom>
        <Image
          width={0}
          height={0}
          style={{ width: 'auto', height: '100%' }} // optional
          className="rounded-xl"
          sizes="100vw"
          src={`/strapi${imageSrc}`}
          alt={altName}
        />
      </Zoom>
    </div>
  );
};

export default ImageWithZoom;
