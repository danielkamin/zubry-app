import ShopLayout from '@/components/layout/Shop/index';
import NewsTitle from '@/components/page/Aktualnosci/NewsTitle';
import ShopService from 'common/services/shop.service';
import BasicArticle from '@/components/complex/BasicArticle';

const Regulations = ({ shopRegulations }: { shopRegulations: string }) => {
  return (
    <div className="flex justify-center flex-col items-center">
      <NewsTitle>Regulamin Sklepu.</NewsTitle>
      <BasicArticle content={shopRegulations} />
    </div>
  );
};

export default Regulations;

export async function getStaticProps() {
  const { result } = await ShopService.getShopRegulationsInfo();
  return {
    props: {
      shopRegulations: result.data.attributes.Content
    },
    revalidate: 120
  };
}
Regulations.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};
