import { useRouter } from 'next/router';

import ShopLayout from '@/components/layout/Shop/index';
import ShopService from 'common/services/shop.service';
import ProductDetails from '@/components/complex/ProductDetails';
import { TStrapiContentItem, TStrapiProduct } from '@/types/strapi.types';
import HorizontalCardSkeleton from '@/components/simple/HorizontalCardSkeleton';

const Product = ({ product }: { product: TStrapiContentItem<TStrapiProduct> }) => {
  const router = useRouter();

  return (
    <div className="flex justify-center">
      {router.isFallback || !product ? <HorizontalCardSkeleton /> : <ProductDetails product={product} />}
    </div>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const { result } = await ShopService.getProduct(params.slug);
  return {
    props: {
      product: result.data
    },
    revalidate: 60
  };
}

export async function getStaticPaths() {
  const { result } = await ShopService.getAllProducts();
  return {
    paths:
      result.data.map((product) => {
        return {
          params: {
            slug: `/${product.id}`
          }
        };
      }) || [],
    fallback: true
  };
}

export default Product;
Product.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};
