import { MainPageService } from '@/api';
import { TStrapiDynamicPage } from '@/types';
import Head from 'next/head';
import Header from '@/components/simple/Header';
import ComponentRenderer from '@/components/page/ComponentRenderer';
import ShopLayout from '@/components/layout/Shop';

const DynamicPage = ({ page }: { page: TStrapiDynamicPage }) => {
  return (
    <>
      <Head>
        <title>{page.Metadata.Meta_Title}</title>
        <meta name="description" content={page.Metadata.Meta_Description} key="desc" />
      </Head>
      <section>
        <Header title={page.Title} />
        <ComponentRenderer components={page.Page_Content} />
      </section>
    </>
  );
};

export default DynamicPage;

export async function getServerSideProps({ params }) {
  const { result } = await MainPageService.getDynamicPages(params.slug);
  return {
    props: {
      page: result.data[0].attributes
    }
  };
}

DynamicPage.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};
