import { useRouter } from 'next/router';

import HorizontalCardSkeleton from '@/components/simple/HorizontalCardSkeleton';
import NewsCard from '@/components/page/Aktualnosci/NewsCard';
import SubHeader from '@/components/simple/SubHeader';
import { TStrapiArrayResponse, TStrapiArticle } from '@/types/strapi.types';

const LatestNews = ({ latestNews }: { latestNews: TStrapiArrayResponse<TStrapiArticle> }) => {
  const router = useRouter();

  if (router.isFallback) return <HorizontalCardSkeleton />;
  return (
    <section className="relative mb-8 -mt-32">
      <div className="mb-5">
        <SubHeader>Aktualności:</SubHeader>
      </div>
      {latestNews && latestNews.data.length > 0 ? (
        <div className="mx-auto flex flex-wrap justify-center gap-10 z-10 lg:justify-between">
          {latestNews.data.map((news) => (
            <NewsCard article={news.attributes} id={news.id} key={news.id} />
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
