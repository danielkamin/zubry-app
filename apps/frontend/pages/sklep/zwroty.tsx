import NewsTitle from '@/components/page/Aktualnosci/NewsTitle';
import ShopLayout from '@/components/layout/Shop/index';
import ShopService from '@/modules/services/shop.service';
import BasicArticle from '@/components/complex/BasicArticle';

const Returns = ({ returnsInfo }: { returnsInfo: string }) => {
  return (
    <div className="flex justify-center flex-col items-center">
      <NewsTitle>Zasady zwrotów.</NewsTitle>
      <BasicArticle content={returnsInfo} />
    </div>
  );
};

export default Returns;
export async function getStaticProps() {
  const { result } = await ShopService.getReturnsRegulationsInfo();
  return {
    props: {
      returnsInfo: result.data.attributes.Content
    },
    revalidate: 60
  };
}
Returns.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};
