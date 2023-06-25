import Head from 'next/head';
import Link from 'next/link';

import ShopLayout from '@/components/layout/Shop/index';
import ShopService from '@/modules/services/shop.service';
import { TStrapiContentItem, TStrapiProduct } from '@/types/strapi.types';
import ShoppingCard from '@/components/simple/ShoppingCard';
import { RightOutlined } from '@ant-design/icons';
import MainPageService from '@/modules/services/main.service';

const SklepHome = ({ products, shopIntro }: { products: TStrapiContentItem<TStrapiProduct>[]; shopIntro: string }) => {
  return (
    <section>
      <Head>
        <title>Sklep PKK Zubry Białystok</title>
        <meta
          name="description"
          content="Zobacz i kup w naszym sklepie akcesoria klubowe PKK Żubry Białystok."
          key="desc"
        />
      </Head>
      <div className="lg:w-2/6 md:w-3/6 w-4/6 flex justify-center text-center flex-col items-center mx-auto h-full my-16">
        <h1 className="text-2xl mb-10 font-medium">Witamy w sklepie PKK Żubry Białystok.</h1>
        <p className="mb-8">{shopIntro}</p>
      </div>
      <div className="mx-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
        {products.map((product) => (
          <Link href={`/sklep/produkty/${product.id}`} key={product.id}>
            <a className="group">
              <ShoppingCard product={product.attributes} />
            </a>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link href="/sklep/produkty">
          <a className="text-gray-700 flex hover:text-purple-600 hover:underline transition-colors items-center">
            <span className="mr-2">Zobacz więcej produktów</span>
            <RightOutlined />
          </a>
        </Link>
      </div>
    </section>
  );
};

export default SklepHome;

export async function getServerSideProps(context) {
  const { query } = context;
  const { result } = await ShopService.getProducts(query, 1, 3);
  const globalSettings = (await MainPageService.getGlobalSettings()).result;
  return {
    props: {
      products: result.data,
      shopIntro: globalSettings.data.attributes.Shop_Intro
    }
  };
}
SklepHome.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};
