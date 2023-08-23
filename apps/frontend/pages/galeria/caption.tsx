import Layout from '@/components/layout/Main/index';
import GridGallery from '@/components/simple/GridGallery';
import Header from '@/components/simple/Header';
import MainPageService from 'common/services/main.service';
import { TStrapiImageWithAdditionalInfo } from '@/types/strapi.types';

const CaptionImages = ({ images, caption }: { images: TStrapiImageWithAdditionalInfo[] | null; caption: string }) => {
  if (!images) {
    return <p className="text-gray-400 text-lg my-4 block text-center">Nie znaleziono szukanych zdjęć...</p>;
  }
  return (
    <section>
      <Header title={`Zdjęcia powiązanie z tagiem: ${caption ?? ''}`} />
      {images.length > 0 ? (
        <GridGallery images={images} />
      ) : (
        <p className="text-gray-400 text-lg my-4 block text-center">Brak zdjęć w tej galerii...</p>
      )}
    </section>
  );
};

export default CaptionImages;

export async function getServerSideProps({ query }) {
  if (!query || !query.search)
    return {
      props: {
        images: null,
        caption: null
      }
    };
  const { result } = await MainPageService.getPhotosByCaptionFromGallery(query.search);
  return {
    props: {
      images: result,
      caption: query.search
    }
  };
}

CaptionImages.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
