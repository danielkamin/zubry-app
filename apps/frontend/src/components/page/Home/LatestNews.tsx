import { useRouter } from 'next/router';

import HorizontalCardSkeleton from 'src/components/simple/HorizontalCardSkeleton';
import NewsCard from 'src/components/page/Aktualnosci/NewsCard';
import SubHeader from 'src/components/simple/SubHeader';
import { TStrapiArrayResponse, TStrapiArticle } from '@/types';

const LatestNews = ({ latestNews }: { latestNews: TStrapiArrayResponse<TStrapiArticle> }) => {
  const router = useRouter();

  if (router.isFallback) return <HorizontalCardSkeleton />;
  return (
    <section className="relative mb-8 -mt-32">
      <div className="mb-5">
        <SubHeader>Aktualności:</SubHeader>
      </div>
      {latestNews && latestNews.data.length > 0 ? (
        <div className="mx-auto flex flex-wrap justify-center gap-10 z-10 xl:justify-around">
          {latestNews.data.map((news) => (
            <NewsCard article={news.attributes} id={news.id} size="small" key={news.id} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center my-6">
          <p className="text-gray-700">Brak postów do wyświetlenia...</p>
        </div>
      )}
    </section>
  );
};

export default LatestNews;
