import Layout from 'src/components/layout/Main/index';
import GridGallery from 'src/components/simple/GridGallery';
import Header from 'src/components/simple/Header';
import { MainPageService } from '@/api';
import { TStrapiContentItem, TStrapiGallery } from '@/types';
import Head from 'next/head';

const Gallery = ({ gallery }: { gallery: TStrapiContentItem<TStrapiGallery> }) => {
  return (
    <>
      <Head>
        <title>Zdjęcia - {gallery.attributes.Title}</title>
        <meta name="description" content={`Galeria zdjęć: ${gallery.attributes.Title}`} key="desc" />
      </Head>
      <section>
        <Header title={gallery.attributes.Title} />
        {gallery.attributes.Images.data.length > 0 ? (
          <GridGallery images={gallery.attributes.Images.data.map((image) => image.attributes)} />
        ) : (
          <p className="text-gray-400 text-lg my-4 block text-center">Brak zdjęć w tej galerii...</p>
        )}
      </section>
    </>
  );
};

export default Gallery;

export async function getServerSideProps({ params }) {
  const { result } = await MainPageService.getPhotoGalleryById(params.id);
  return {
    props: {
      gallery: result.data
    }
  };
}

Gallery.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
