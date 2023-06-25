import { useRouter } from 'next/router';
import React from 'react';

import ProductsFilterSortForm from '@/components/forms/ProductsFilterSortForm';

const ProductsSidebar = ({ productCategories = ['Akcesoria', 'Odzież'] }) => {
  const router = useRouter();

  const handleFilter = (data) => {
    let queryLink = '/sklep/produkty';
    const { sort, ...rest } = data;
    queryLink += `?sort=${sort}`;
    if (Object.values(rest).some((val) => val === true)) {
      queryLink += '&categories=';
      queryLink += '[';
      Object.entries(rest).forEach((entrie) => {
        if (entrie[1] === true) {
          queryLink += `"${entrie[0]}",`;
        }
      });
      queryLink = queryLink.slice(0, -1);
      queryLink += ']';
    }
    router.replace(queryLink);
  };

  return (
    <div className="w-32">
      <ProductsFilterSortForm formHandler={handleFilter} productCategories={productCategories} />
    </div>
  );
};

export default ProductsSidebar;
