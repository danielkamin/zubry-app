import Layout from 'src/components/layout/Main/index';
import { MainPageService } from '@/api';

const Test = (data) => {
  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export async function getServerSideProps() {
  const { result } = await MainPageService.getPhotoGalleryCategories('16');
  return {
    props: {
      data: result.data.attributes.Categories
    }
  };
}

export default Test;

Test.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
