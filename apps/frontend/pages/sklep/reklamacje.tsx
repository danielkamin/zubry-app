import NewsTitle from '@/components/page/Aktualnosci/NewsTitle';
import ShopLayout from '@/components/layout/Shop/index';
import ShopService from 'common/services/shop.service';
import BasicArticle from '@/components/complex/BasicArticle';

const Complaints = ({ complaintsInfo }) => {
  return (
    <div className="flex justify-center flex-col items-center">
      <NewsTitle>Zasady reklamacji.</NewsTitle>
      <BasicArticle content={complaintsInfo.Content} />
    </div>
  );
};

export default Complaints;
export async function getStaticProps() {
  const { result } = await ShopService.getComplaintsRegulationsInfo();
  return {
    props: {
      complaintsInfo: result.data.attributes
    },
    revalidate: 60
  };
}
Complaints.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};
