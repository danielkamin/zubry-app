import Image from 'next/legacy/image';

import NewsTitle from 'src/components/page/Aktualnosci/NewsTitle';
import Date from 'src/components/simple/CustomDate';

const NewsHeader = ({ title, image, date }: { title: string; image: string; date?: string }) => {
  return (
    <>
      <NewsTitle>{title}</NewsTitle>
      <div className="text-xl ">
        <div className="relative h-96  md:h-v75 sm:h-v50 mb-8 mx-auto" style={{ maxWidth: '1000px' }}>
          <Image layout="fill" objectFit="contain" alt={`Artykuł na temat: ${title}`} src={image} />
        </div>
        {date && (
          <div className="max-w-3xl mx-auto">
            <Date dateString={date} />
          </div>
        )}
      </div>
    </>
  );
};

export default NewsHeader;
