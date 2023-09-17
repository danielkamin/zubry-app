import { useRouter } from 'next/router';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
const queryObjectToStringBuilder = (queryParams) => {
  let queryStringResult = '?';
  Object.entries(queryParams).forEach((param) => {
    queryStringResult += `&${param[0]}=${param[1]}`;
  });
  if (queryStringResult === '?' || queryStringResult === '?&page=1') {
    return '';
  }
  return queryStringResult.slice(0, 1) + queryStringResult.slice(2);
};
const NewsPaginate = ({ page, noOfPages }) => {
  const router = useRouter();
  const goToPage = (index) => {
    const baseUrl = '/aktualnosci';
    let queryObject = {};
    router.query && (queryObject = router.query);
    queryObject['page'] = +page + index;
    router.replace(`${baseUrl}${queryObjectToStringBuilder(queryObject)}`);
  };

  return (
    <div className="flex justify-center mt-10 items-baseline">
      {page > 1 ? (
        <LeftOutlined className="text-2xl cursor-pointer" onClick={() => goToPage(-1)} />
      ) : (
        <LeftOutlined className="text-2xl" />
      )}
      <div className="mx-12">
        Strona {page} z {noOfPages}
      </div>
      {page != noOfPages ? (
        <RightOutlined className="text-2xl cursor-pointer" onClick={() => goToPage(1)} />
      ) : (
        <RightOutlined className="text-2xl" />
      )}
    </div>
  );
};

export default NewsPaginate;
