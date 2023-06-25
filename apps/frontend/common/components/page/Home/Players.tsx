import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import HorizontalCardSkeleton from '@/components/simple/HorizontalCardSkeleton';
import SubHeader from '@/components/simple/SubHeader';
import { TStrapiPlayer, TStrapiContentItem } from '@/types/strapi.types';

const PlayersSection = ({ players }: { players: TStrapiContentItem<TStrapiPlayer>[] }) => {
  const router = useRouter();

  if (router.isFallback) return <HorizontalCardSkeleton />;
  return (
    <div className="w-full flex flex-col items-center justify-center mt-14">
      <Link href="/druzyna_2lm">
        <a>
          <SubHeader textColor="gray-800">Nasza drużyna</SubHeader>
        </a>
      </Link>
      <motion.div
        className="z-10 relative pb-10 pt-6 mx-auto"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-wrap justify-center items-center">
          {players.map((player) => (
            <Link href={`/druzyna_2lm/${player.id}`} key={player.id}>
              <a className="rounded-xl mx-12 my-10 hover:scale-110 transform transition border shadow-xl">
                <div className="md:w-40 md:h-56 w-48 h-64 rounded-xl overflow-hidden relative">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    priority
                    alt={`${player.attributes.First_Name} ${player.attributes.Last_Name}`}
                    src={player.attributes.Photo.data ? `/strapi${player.attributes.Photo.data.attributes.url}` : null}
                    className=""
                  />
                  <div className="absolute left-0 bottom-0 w-full text-center py-4 bg-black blur-sm"></div>
                  <span className="absolute left-0 bottom-1 text-gray-100  font-medium z-10 w-full text-center">
                    {player.attributes.First_Name} {player.attributes.Last_Name}
                  </span>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PlayersSection;
