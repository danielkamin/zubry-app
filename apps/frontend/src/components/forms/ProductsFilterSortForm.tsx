import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ProductsFilterSortForm = ({ formHandler, productCategories }) => {
  const { setValue, register, handleSubmit } = useForm();
  const router = useRouter();

  useEffect(() => {
    const { query } = router;
    if (query.sort) {
      setValue('sort', router.query.sort);
    } else {
      setValue('sort', 'updatedAt:desc');
    }
    if (query.categories) {
      const categories = query.categories as string;
      JSON.parse(categories).forEach((categorie) => setValue(categorie, true));
    }
  }, []);
  return (
    <form onSubmit={handleSubmit(formHandler)} className="flex flex-col">
      <div className="flex flex-col pb-4 my-4 border-b border-gray-600">
        <label className="inline-flex items-center my-1">
          <input
            {...register('sort')}
            value="updatedAt:desc"
            type="radio"
            className="h-5 w-5 text-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-200 focus:ring-purple-500 "
          />
          <span className="ml-2 text-gray-700">Najnowsze</span>
        </label>
        <label className="inline-flex items-center my-1">
          <input
            {...register('sort')}
            value="updatedAt:asc"
            type="radio"
            className="h-5 w-5 text-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-200 focus:ring-purple-500 "
          />
          <span className="ml-2 text-gray-700">Najstarsze</span>
        </label>
        <label className="inline-flex items-center my-1">
          <input
            {...register('sort')}
            value="Price:desc"
            type="radio"
            className="h-5 w-5 text-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-200 focus:ring-purple-500 "
          />
          <span className="ml-2 text-gray-700">Najdroższe</span>
        </label>
        <label className="inline-flex items-center my-1">
          <input
            {...register('sort')}
            value="Price:asc"
            type="radio"
            className="h-5 w-5 text-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-200 focus:ring-purple-500 "
          />
          <span className="ml-2 text-gray-700">Najtańsze</span>
        </label>
      </div>
      <div className="flex flex-col pb-4 my-4 border-b border-gray-600">
        {productCategories.map((categorie) => (
          <label className="flex items-center space-x-3 mb-3" key={categorie}>
            <input
              type="checkbox"
              {...register(categorie)}
              className="appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:hover:bg-purple-700 checked:bg-purple-600  focus:outline-none focus:ring-purple-500"
            />
            <span className="text-gray-700 font-normal">{categorie}</span>
          </label>
        ))}
      </div>
      <button
        type="submit"
        className="px-2 py-1 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded "
      >
        filtruj
      </button>
    </form>
  );
};

export default ProductsFilterSortForm;
