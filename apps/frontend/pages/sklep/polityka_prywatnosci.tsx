import NewsTitle from '@/components/page/Aktualnosci/NewsTitle';
import ShopLayout from '@/components/layout/Shop/index';
import ShopService from 'common/services/shop.service';
import BasicArticle from '@/components/complex/BasicArticle';

const PrivacyPolicy = ({ privacyPolicyInfo }: { privacyPolicyInfo: string }) => {
  return (
    <div className="flex justify-center flex-col items-center">
      <NewsTitle>Polityka Prywatności.</NewsTitle>
      <BasicArticle content={privacyPolicyInfo} />
    </div>
  );
};

export default PrivacyPolicy;

export async function getStaticProps() {
  const { result } = await ShopService.getPrivacyPolicyInfo();
  return {
    props: {
      privacyPolicyInfo: result.data.attributes.Content
    },
    revalidate: 60
  };
}

PrivacyPolicy.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};
