import { motion } from 'framer-motion';
import { FC } from 'react';
import { useRouter } from 'next/router';

import HorizontalCardSkeleton from '@/components/simple/HorizontalCardSkeleton';
import SubHeader from '@/components/simple/SubHeader';
import Button from '@/components/simple/Button';
import { extractIdFromYoutubeUrl } from '@/utils/helpers';

interface IYouTubePlayerProps {
  url: string;
  intro: string;
}
export const YouTubePlayer: FC<IYouTubePlayerProps> = ({ url, intro }) => {
  const router = useRouter();
  const embedId = extractIdFromYoutubeUrl(url);
  if (router.isFallback) return <HorizontalCardSkeleton />;
  return (
    <motion.div
      className="relative py-10 mx-auto"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="flex md:flex-row flex-col shadow-md rounded-xl border bg-white">
        <div className="block md:w-2/4 w-full">
          <div className="rounded-l-xl overflow-hidden md:max-w-3xl max-w-lg">
            <div className="video-responsive">
              <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/${embedId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Mecz"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:w-2/4 w-full  p-8">
          <div>
            <SubHeader>YouTube</SubHeader>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4 text-base flex text-justify z-10 relative">{intro}</p>
          <div className="mt-auto ml-auto">
            <a rel="noreferrer" href="https://www.youtube.com/channel/UCJjJFlFRbKVCR00I5bWbQIA" target="_blank">
              <Button>Nasz kanał</Button>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default YouTubePlayer;
