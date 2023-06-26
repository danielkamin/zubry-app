import Link from 'next/link';

import ShopLayout from '@/components/layout/Shop/index';
import ShopService from 'common/services/shop.service';
import ProductsSidebar from '@/components/page/Products/ProductsSidebar';
import ShoppingCard from '@/components/simple/ShoppingCard';
import { TStrapiContentItem, TStrapiProduct } from '@/types/strapi.types';

const Produkty = ({ products }: { products: TStrapiContentItem<TStrapiProduct>[] }) => {
  return (
    <div className="md:my-6 w-full flex md:flex-row flex-col md:items-start items-center">
      <section className="md:w-1/5 mb-8 mt-16 md:mt-0">
        <ProductsSidebar />
      </section>
      <section className="flex justify-center mx-6">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <Link href={`/sklep/produkty/${product.id}`} key={product.id}>
              <a className="group">
                <ShoppingCard product={product.attributes} />
              </a>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Produkty;

export async function getServerSideProps(context) {
  const { query } = context;
  const { result } = await ShopService.getProducts(query);
  return {
    props: {
      products: result.data
    }
  };
}

Produkty.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};
