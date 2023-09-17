import { pzKoszMainUrl } from '@/utils';

const ScheduleItem = ({ data }) => {
  return (
    <div className="my-7 mx-2">
      <div className="flex flex-col content-center justify-center text-center">
        <div className="flex flex-row justify-center w-full mb-2">
          <div className="flex flex-col w-full justify-center">
            <div className="font-semibold text-sm text-center text-gray-500">{data.data}</div>
          </div>
        </div>
        <div className="flex flex-row mb-3">
          <div className="w-4/12 h-12 md:hidden block relative m-auto flex-col">
            {data.k1.logo && (
              <div className="flex justify-center">
                <img alt={data.k1.nazwa} src={data.k1.logo} />
              </div>
            )}
          </div>
          <div className="flex flex-col w-4/12"></div>
          <div className="w-4/12 h-12 md:hidden block relative m-auto flex-col">
            {data.k2.logo && (
              <div className="flex justify-center">
                <img alt={data.k2.nazwa} src={data.k2.logo} />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-center w-full">
          <div className="relative flex flex-col w-4/12 justify-center">
            <div className={'md:absolute md:right-0' + (data.k1.id == 7601 ? ' font-bold' : '')}>{data.k1.nazwa}</div>
          </div>
          <div className="w-12 h-12 hidden md:block relative ml-4">
            {data.k1.logo && (
              <div className="flex justify-center">
                <img alt={data.k1.nazwa} src={data.k1.logo} />
              </div>
            )}
          </div>
          <div className="flex flex-col w-4/12 text-center font-bold justify-center">
            <a rel="noreferrer" className="hover:opacity-60" href={pzKoszMainUrl + 'mecz/' + data.id} target="_blank">
              {data.wynik1.toString() == '0' ? '-' : data.wynik1} : {data.wynik2.toString() == '0' ? '-' : data.wynik2}
            </a>
          </div>
          <div className="w-12 h-12 hidden md:block relative mr-4">
            {data.k2.logo && (
              <div className="flex justify-center">
                <img alt={data.k2.nazwa} src={data.k2.logo} />
              </div>
            )}
          </div>
          <div className="relative flex flex-col w-4/12 justify-center">
            <div className={'md:absolute md:left-0' + (data.k2.id == 7601 ? ' font-bold' : '')}>{data.k2.nazwa}</div>
          </div>
        </div>
      </div>
      <div className="divider-horizotal mt-8 mb-12"></div>
    </div>
  );
};

export default ScheduleItem;
