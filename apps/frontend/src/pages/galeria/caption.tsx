import Layout from 'src/components/layout/Main/index';
import GridGallery from 'src/components/simple/GridGallery';
import Header from 'src/components/simple/Header';
import { MainPageService } from '@/api';
import { TStrapiImageWithAdditionalInfo } from '@/types';
import Head from 'next/head';

const CaptionImages = ({ images, caption }: { images: TStrapiImageWithAdditionalInfo[] | null; caption: string }) => {
  if (!images) {
    return <p className="text-gray-400 text-lg my-4 block text-center">Nie znaleziono szukanych zdjęć...</p>;
  }
  return (
    <>
      <Head>
        <title>Zdjęcia - {caption ?? ''}</title>
        <meta name="description" content={`Zdjęcia powiązanie z tagiem: ${caption ?? ''}`} key="desc" />
      </Head>
      <section>
        <Header title={`Zdjęcia powiązanie z tagiem: ${caption ?? ''}`} />
        {images.length > 0 ? (
          <GridGallery images={images} />
        ) : (
          <p className="text-gray-400 text-lg my-4 block text-center">Brak zdjęć w tej galerii...</p>
        )}
      </section>
    </>
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
