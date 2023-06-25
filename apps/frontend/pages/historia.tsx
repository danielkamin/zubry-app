import { Parser } from 'html-to-react';
import edjsHTML from 'editorjs-html';

import MainPageService from '@/modules/services/main.service';
import Header from '@/components/simple/Header';
import Layout from '@/components/layout/Main/index';
import { TStrapiClubHistory, TStrapiObjectResponse } from '@/types/strapi.types';

const History = ({ history }: { history: TStrapiObjectResponse<TStrapiClubHistory> }) => {
  const edjsParser = edjsHTML();
  const HTML = edjsParser.parse(JSON.parse(history.data.attributes.Content));

  return (
    <div>
      <Header title={'Historia'} />
      <div className="flex justify-center text-justify">
        {!history || !history.data.attributes.Content ? (
          <p className="text-gray-400 text-lg my-4 block text-center">Brak informacji do wyswietlenia...</p>
        ) : (
          <article className="prose prose-md">{Parser().parse(HTML.join(''))}</article>
        )}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const { result } = await MainPageService.getClubHistoryData();
  return {
    props: {
      history: result
    },
    revalidate: 60
  };
}

export default History;

History.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
