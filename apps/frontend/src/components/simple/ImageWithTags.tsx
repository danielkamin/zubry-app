import Link from 'next/link';
import Badge from './Badge';
import ImageWithZoom from './ImageWithZoom';

const ImageWithTags = ({ imageSrc, altName, tags }: { imageSrc: string; altName: string; tags?: string[] }) => {
  return (
    <div>
      <ImageWithZoom imageSrc={imageSrc} altName={altName} />
      {tags && (
        <div className="my-1 flex gap-2">
          {tags.map((t) => (
            <Link key={`${altName}-${t}`} href={`/galeria/caption?search=${t}`} className="hover:opacity-75">
              <Badge text={t} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageWithTags;
