import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import SubHeader from '@/components/simple/SubHeader';
import HorizontalCardSkeleton from '@/components/simple/HorizontalCardSkeleton';

const GoogleMaps = ({ src, textInfo }) => {
  const router = useRouter();

  if (router.isFallback) return <HorizontalCardSkeleton />;
  return (
    <motion.div
      className="relative md:pt-20 pt-8"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <SubHeader textColor="gray-800">{textInfo}</SubHeader>
      <div className="flex justify-center items-center h-full w-full -mb-16">
        <div className="w-screen h-v50 border-0 flex justify-center relative">
          <iframe src={src} className="w-screen absolute bottom-0 h-full" allowFullScreen loading="lazy"></iframe>
        </div>
      </div>
    </motion.div>
  );
};

export default GoogleMaps;
