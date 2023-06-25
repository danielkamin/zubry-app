import Layout from '@/components/layout/Main/index';
import MainPageService from '@/modules/services/main.service';
import BasicArticle from '@/components/complex/BasicArticle';
const CookiePolicy = ({ cookieConsentRegulations }) => {
  return (
    <div className="flex justify-center">
      <BasicArticle content={cookieConsentRegulations} />
    </div>
  );
};

export default CookiePolicy;

export async function getStaticProps() {
  const { result } = await MainPageService.getCookieConsentRegulations();

  return {
    props: {
      cookieConsentRegulations: result && result.data.attributes.Content ? result.data.attributes.Content : ''
    },
    revalidate: 120
  };
}

CookiePolicy.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
