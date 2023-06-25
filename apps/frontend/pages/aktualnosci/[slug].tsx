import Head from 'next/head';
import { useRouter } from 'next/router';

import NewsBody from '@/components/page/Aktualnosci/NewsBody';
import NewsHeader from '@/components/page/Aktualnosci/NewsHeader';
import Layout from '@/components/layout/Main/index';
import MainPageService from '@/modules/services/main.service';
import { TStrapiArrayResponse, TStrapiArticle } from '@/types/strapi.types';
import HorizontalCardSkeleton from '@/components/simple/HorizontalCardSkeleton';
import NewsCard from '@/components/page/Aktualnosci/NewsCard';

const SingleNews = ({
  article,
  additionalNews
}: {
  article: TStrapiArticle & { id: number };
  additionalNews: TStrapiArrayResponse<TStrapiArticle>;
}) => {
  const router = useRouter();
  return (
    <>
      {router.isFallback ? (
        <HorizontalCardSkeleton />
      ) : (
        <div>
          <article>
            <Head>
              <title>{article.Title} | PKK Żubry Białystok</title>
            </Head>
            {article.Image.data && (
              <NewsHeader title={article.Title} date={article.publishedAt} image={article.Image.data.attributes.url} />
            )}
            <NewsBody content={article.Content} />
            <span className="border-b w-full block my-8"></span>
          </article>
          <div className="mt-8">
            <p className="text-xl font-semibold mb-4">Inne aktualności:</p>
            <div className="grid container mx-auto xl:grid-cols-3 md:grid-cols-2 gap-16 gird-cols-1">
              {additionalNews.data.map((article) => {
                return <NewsCard key={article.id} article={article.attributes} id={article.id} size="small" />;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export async function getStaticProps({ params }) {
  const { result } = await MainPageService.getSingleArticle(params.slug);
  const additionalNews = await MainPageService.getPaginatedArticles(1, '', 'DESC', 3);
  const content = result.data.attributes;
  return {
    props: {
      article: {
        id: result.data.id,
        ...content
      },
      additionalNews: additionalNews.result
    },
    revalidate: 60
  };
}

export async function getStaticPaths() {
  const { result } = await MainPageService.getAllNewsWithSlug();
  if (!result) return;
  return {
    paths:
      result.data.map((news) => {
        return {
          params: {
            slug: `/${news.id}`
          }
        };
      }) || [],
    fallback: true
  };
}

SingleNews.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default SingleNews;
