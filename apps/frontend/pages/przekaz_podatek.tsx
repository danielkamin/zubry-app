import Layout from '@/components/layout/Main/index';
import MainPageService from 'common/services/main.service';
import BasicArticle from '@/components/complex/BasicArticle';
import NewsHeader from '@/components/page/Aktualnosci/NewsHeader';
import { TStrapiContentItem, TStrapiCookieRegulations } from '@/types/strapi.types';

const TransferTax = ({ transferTaxData }: { transferTaxData: TStrapiContentItem<TStrapiCookieRegulations> }) => {
  if (!transferTaxData) {
    return <p>Wystąpił problem.</p>;
  }
  return (
    <section>
      <NewsHeader
        title={transferTaxData.attributes.Title}
        image={transferTaxData.attributes.Image.data.attributes.url}
      />
      <div className="flex justify-center">
        <BasicArticle content={transferTaxData.attributes.Content ? transferTaxData.attributes.Content : ''} />
      </div>
    </section>
  );
};

export default TransferTax;

export async function getStaticProps() {
  const { result } = await MainPageService.getTransferTax();
  return {
    props: {
      transferTaxData: result.data
    },
    revalidate: 120
  };
}

TransferTax.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
