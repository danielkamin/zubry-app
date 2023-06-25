import Layout from '@/components/layout/Main/index';
import GridGallery from '@/components/simple/GridGallery';
import Header from '@/components/simple/Header';
import MainPageService from '@/modules/services/main.service';
import { TStrapiGalleryCategory } from '@/types/strapi.types';

const CategoryImages = ({ category }: { category: TStrapiGalleryCategory }) => {
  return (
    <section>
      <Header title={category.Title} />
      <GridGallery images={category.Images.data} />
    </section>
  );
};

export default CategoryImages;

export async function getServerSideProps({ params }) {
  const { result } = await MainPageService.getPhotoGalleryCategories(params.id);
  return {
    props: {
      category: result.data.attributes.Categories[0]
    }
  };
}

CategoryImages.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
