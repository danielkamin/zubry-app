import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import Button from 'src/components/simple/Button';

const NewsSearch = () => {
  const router = useRouter();
  const queryParams = router.query;
  const { register, handleSubmit } = useForm();

  const handleSearchForNewsRedirect = (data) => {
    let baseUrl = '/aktualnosci';

    if (
      queryParams.sort &&
      queryParams.sort === data.sortQuery &&
      queryParams.search &&
      queryParams.search === data.searchQuery
    ) {
      return;
    }

    baseUrl += '?';
    data.searchQuery && (baseUrl += `search=${data.searchQuery}&`);
    data.sortQuery && (baseUrl += `sort=${data.sortQuery}`);

    const baseUrlLastChar = baseUrl[baseUrl.length - 1];
    if (baseUrlLastChar === '&' || baseUrlLastChar === '?') {
      baseUrl = baseUrl.slice(0, -1);
    }
    router.replace(baseUrl);
  };
  return (
    <div className="grid md:grid-flow-col md:auto-cols-max auto-rows-auto gap-4 grid-flow-row mb-8 items-center">
      <p className="text-gray-600 font-semibold">Znajdź aktualności i artykuły</p>
      <form
        onSubmit={handleSubmit(handleSearchForNewsRedirect)}
        className="md:grid md:grid-flow-col gap-4 flex flex-col w-full"
      >
        <input
          type="text"
          className="border border-gray-400 rounded px-3 placeholder-opacity-50 placeholder-gray-500 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
          placeholder="szukaj..."
          {...register('searchQuery')}
        />
        <select
          {...register('sortQuery')}
          className="rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
        >
          <option value="">Sortuj...</option>
          <option value="DESC">Od najnowszych</option>
          <option value="ASC">Od najstarszych</option>
        </select>
        <Button>Szukaj</Button>
      </form>
    </div>
  );
};

export default NewsSearch;
