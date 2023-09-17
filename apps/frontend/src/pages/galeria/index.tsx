import Link from 'next/link';
import { PictureOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Head from 'next/head';

import Layout from 'src/components/layout/Main/index';
import Header from 'src/components/simple/Header';
import { MainPageService } from '@/api';
import { TStrapiClubGallery } from '@/types';

const ImageGallery = ({ categories }: { categories: TStrapiClubGallery }) => {
  return (
    <div>
      <Head>
        <title>Galeria zdjęć Żubry Białystok.</title>
        <meta
          name="description"
          content="Zobacz zdjęcia z meczy i innych wydarzeń związanych z naszym klubem PKK Żubry Białystok."
          key="desc"
        />
      </Head>
      <Header title={'Nasza Galeria'} />
      <section className="flex justify-center">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {categories.Categories.map((cat) => (
            <Link href={`/galeria/${cat.id}`} key={cat.id} className="group w-72 ">
              <div className="aspect-w-1 aspect-h-1 h-72 overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 relative">
                {cat.Thumbnail.data ? (
                  <Image
                    src={`/strapi${cat.Thumbnail.data.attributes.formats.medium.url}`}
                    alt={cat.Title}
                    fill
                    className="group-hover:opacity-75 object-cover"
                  />
                ) : (
                  <div className="flex justify-center items-center text-white w-full h-full">
                    <PictureOutlined className="absolute text-white z-50 text-3xl" />
                  </div>
                )}
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-800 two-line-clamp">{cat.Title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export async function getStaticProps() {
  const { result } = await MainPageService.getPhotoGalleryCategories();
  const sortedCategories: TStrapiClubGallery = result.data
    ? { ...result.data.attributes, Categories: result.data.attributes.Categories.reverse() }
    : null;
  return {
    props: {
      categories: {
        Categories: sortedCategories.Categories,
        Preview: null
      }
    },
    revalidate: 60
  };
}

export default ImageGallery;

ImageGallery.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};