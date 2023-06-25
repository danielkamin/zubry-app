import Image from 'next/image';
import { FC } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';

import SubHeader from '@/components/simple/SubHeader';
import Button from '@/components/simple/Button';
import HorizontalCardSkeleton from '@/components/simple/HorizontalCardSkeleton';

interface IClubInfo {
  imageUrl: string;
  intro: string;
}

const ClubInfo: FC<IClubInfo> = ({ imageUrl, intro }) => {
  const router = useRouter();

  if (router.isFallback) return <HorizontalCardSkeleton />;
  return (
    <motion.div
      className="relative py-10 my-8 mx-auto"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="flex md:flex-row flex-col shadow-md rounded-xl border bg-white">
        <div className="flex flex-col md:w-2/4 w-full p-8">
          <div>
            <SubHeader>O Klubie</SubHeader>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4 text-base flex text-justify z-10 relative">{intro}</p>
          <div className="mt-auto ml-auto">
            <Link href="/terminarz_2lm">
              <a>
                <Button>Terminarz</Button>
              </a>
            </Link>
          </div>
        </div>
        <div className="block md:w-2/4 w-full  ">
          <div className="rounded-r-xl overflow-hidden md:max-w-3xl max-w-lg relative" style={{ height: '320px' }}>
            <Image src={imageUrl} layout="fill" objectFit="cover" alt="Żubry Białystok" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClubInfo;
