import axios from 'axios';
import useSWR from 'swr';
import Button from 'src/components/simple/Button';
import { motion } from 'framer-motion';

const LastGame = () => {
  const fetcher = async (url: string) => await axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR('/api/latest-game', fetcher);
  if ((isLoading && !data) || error) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className=" shadow-2xl border-2 flex  rounded-2xl last-game mx-auto my-0 w-max bg-white transform -translate-y-3/4 justify-center items-center"
    >
      <div className="flex items-center flex-col md:px-14 sm:px-8 md:pt-5 pt-2 md:pb-10 sm:pb-4 pb-2 px-2 font-semibold">
        <div className="text-gray-500 text-sm ">{data.result.date}</div>
        <div className="latest-game grid grid-flow-col auto-cols-max justify-items-center items-center md:mt-8 mt-4 mb-4">
          <div className="flex items-center">
            <div className="flex flex-col justify-center text-center items-center">
              <div className="relative last-game__team-logo">
                <img src={data.result.home.logo} alt={data.result.home.name} />
              </div>
              <p className="last-game__team-name md:text-lg text-sm mt-2">{data.result.home.name}</p>
            </div>
            <span className="md:text-6xl sm:text-3xl text-xl md:mx-4 mr-2">{data.result.home.score}</span>
          </div>
          <div className="divider lg:mx-8 xl:mx-16 mx-2 md:mx-4"></div>
          <div className="flex items-center">
            <span className="md:text-6xl sm:text-3xl text-xl md:mx-4 ml-2">{data.result.visitor.score}</span>
            <div className="flex flex-col justify-center text-center items-center">
              <div className="relative last-game__team-logo">
                <img src={data.result.visitor.logo} alt={data.result.visitor.name} />
              </div>
              <p className="last-game__team-name md:text-lg text-sm  mt-2">{data.result.visitor.name}</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <a href={data.result.gameUrl}>
            <Button>Statystyki</Button>
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default LastGame;
