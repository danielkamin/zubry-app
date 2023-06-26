import ShopLayout from '@/components/layout/Shop/index';
import ShopService from 'common/services/shop.service';
import NewsTitle from '@/components/page/Aktualnosci/NewsTitle';
import BasicArticle from '@/components/complex/BasicArticle';

const Delivery = ({ deliveryInfo }: { deliveryInfo: string }) => {
  return (
    <div className="flex justify-center flex-col items-center">
      <NewsTitle>Informacje o dostawach.</NewsTitle>
      <BasicArticle content={deliveryInfo} />
    </div>
  );
};

export default Delivery;

export async function getStaticProps() {
  const { result } = await ShopService.getDeliveryRegulationsInfo();
  return {
    props: {
      deliveryInfo: result.data.attributes.Content
    },
    revalidate: 60
  };
}

Delivery.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};
