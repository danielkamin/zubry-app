import Head from 'next/head';

import Header from '@/components/simple/Header';
import NewsSearch from '@/components/page/Aktualnosci/NewsSearch';
import NewsCard from '@/components/page/Aktualnosci/NewsCard';
import NewsPaginate from '@/components/page/Aktualnosci/NewsPaginate';
import Layout from '@/components/layout/Main/index';
import MainPageService from 'common/services/main.service';
import ServerError from '../500';
import { TStrapiArrayResponse, TStrapiArticle } from '@/types/strapi.types';

const News = ({
  articles,
  numberOfArticles,
  currentPage
}: {
  articles: TStrapiArrayResponse<TStrapiArticle>;
  numberOfArticles: number;
  currentPage: number;
}) => {
  if (articles === null || numberOfArticles === null) {
    return <ServerError />;
  }
  const noOfPages = Math.ceil(numberOfArticles / 6);

  return (
    <>
      <Head>
        <title>Aktualności i ogłoszenia klubowe.</title>
        <meta
          name="description"
          content="Zobacz aktualności związane z naszym klubem PKK Żubry Białystok."
          key="desc"
        />
      </Head>
      <Header title={'Aktualności'} />
      <NewsSearch />
      <div className="mx-auto gap-16 flex flex-wrap justify-around">
        {articles.data.map((article) => {
          return <NewsCard key={article.id} article={article.attributes} id={article.id} size="small" />;
        })}
      </div>
      <NewsPaginate page={currentPage} noOfPages={noOfPages} />
    </>
  );
};

export async function getServerSideProps({ query }) {
  let articleResult: TStrapiArrayResponse<TStrapiArticle>,
    newsCountResponseResult,
    currentPage = 0;

  if (query) {
    currentPage = query.page ? query.page : 1;
    articleResult = (
      await MainPageService.getPaginatedArticles(currentPage, query.search && query.search, query.sort && query.sort)
    ).result as TStrapiArrayResponse<TStrapiArticle>;
    newsCountResponseResult = await (await MainPageService.getNewsCount(query.search && query.search)).result;
  } else {
    articleResult = (await MainPageService.getPaginatedArticles()).result as TStrapiArrayResponse<TStrapiArticle>;
    newsCountResponseResult = (await MainPageService.getNewsCount()).result;
    if (newsCountResponseResult > 0) currentPage = 1;
  }
  return {
    props: {
      articles: articleResult,
      numberOfArticles: newsCountResponseResult,
      currentPage: currentPage
    }
  };
}

export default News;

News.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
