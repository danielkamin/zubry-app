/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from 'next/dynamic';
import useInView from 'react-cool-inview';
import Link from 'next/link';
import { motion } from 'framer-motion';

import Banner from 'src/components/page/Home/Banner';
import LastGame from 'src/components/page/Home/LastGame';
import Layout from 'src/components/layout/Main/index';
import HorizontalCardSkeleton from 'src/components/simple/HorizontalCardSkeleton';
import { GYM_GOOGLE_MAPS_IFRAME_SRC, DEFAULT_YOUTUBE_VIDEO_ID, YOUTUBE_CHANNEL_ID } from '@/utils';
import {
  TStrapiArrayResponse,
  TStrapiArticle,
  TStrapiContentItem,
  TStrapiImageWithFormats,
  TStrapiPlayer
} from '@/types';
import { PzkoszApiService, MainPageService } from '@/api';

const PromoCard = dynamic(() => import('src/components/simple/PromoCard'), {
  loading: () => <HorizontalCardSkeleton />
});
const LatestNews = dynamic(() => import('src/components/page/Home/LatestNews'), {
  loading: () => <HorizontalCardSkeleton />
});
const GoogleMaps = dynamic(() => import('src/components/simple/GoogleMaps'), {
  loading: () => <HorizontalCardSkeleton />
});
const PlayersSection = dynamic(() => import('src/components/page/Home/Players'), {
  loading: () => <HorizontalCardSkeleton />
});
const ImagesRotator = dynamic(() => import('src/components/simple/ImagesRotator'), {
  loading: () => <HorizontalCardSkeleton />
});
interface IHomePageProps {
  latestNews: TStrapiArrayResponse<TStrapiArticle>;
  youtubeGameUrl: string;
  youtubeIntro: string;
  players: TStrapiArrayResponse<TStrapiPlayer>;
  images: TStrapiContentItem<TStrapiImageWithFormats>[];
  teamImageUrl: string;
  clubIntro: string;
}

const Home = ({
  latestNews,
  youtubeGameUrl,
  players,
  images,
  teamImageUrl,
  clubIntro,
  youtubeIntro
}: IHomePageProps) => {
  const youTubePromoCardElementObserver = useInView({
    onEnter: ({ unobserve }) => unobserve()
  });
  const latestNewsElementObserver = useInView({
    onEnter: ({ unobserve }) => unobserve()
  });
  const clubPromoCardElementObserver = useInView({
    onEnter: ({ unobserve }) => unobserve()
  });
  const googleMapsElementObserver = useInView({
    onEnter: ({ unobserve }) => unobserve()
  });
  const playersElementObserver = useInView({
    onEnter: ({ unobserve }) => unobserve()
  });
  const imagesRotatorElementObserver = useInView({
    onEnter: ({ unobserve }) => unobserve()
  });

  return (
    <>
      <Banner size="md" imageUrl={teamImageUrl} />
      <LastGame />
      <div ref={latestNewsElementObserver.observe}>
        {latestNewsElementObserver.inView && <LatestNews latestNews={latestNews} />}
      </div>
      <div ref={youTubePromoCardElementObserver.observe} className="py-10">
        {youTubePromoCardElementObserver.inView && (
          <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <PromoCard
              sourceUrl={youtubeGameUrl}
              redirectText="YouTube"
              redirectUrl={`https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}`}
              title="Nasz youtube"
              description={youtubeIntro}
              isVideoPromo={true}
            />
          </motion.div>
        )}
      </div>
      <div ref={imagesRotatorElementObserver.observe} className="images-rotator mt-12">
        <Link href="/galeria">
          <ImagesRotator images={images} />
        </Link>
      </div>
      <div ref={clubPromoCardElementObserver.observe} className="py-10">
        {clubPromoCardElementObserver.inView && (
          <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <PromoCard
              sourceUrl={teamImageUrl}
              redirectText="Terminarz"
              redirectUrl="/terminarz_2lm"
              title="O klubie"
              description={clubIntro}
              isVideoPromo={false}
            />
          </motion.div>
        )}
      </div>
      <div ref={playersElementObserver.observe}>
        {playersElementObserver.inView && <PlayersSection players={players.data} />}
      </div>
      <div ref={googleMapsElementObserver.observe} className=" -mb-16">
        {googleMapsElementObserver.inView && (
          <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <GoogleMaps src={GYM_GOOGLE_MAPS_IFRAME_SRC} textInfo={'Mecze rozgrywamy tutaj:'} />
          </motion.div>
        )}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const pzkoszApiService = await PzkoszApiService.getInstance();
  const lastGame = await pzkoszApiService.getLastGame();
  const globalSettings = (await MainPageService.getGlobalSettings()).result;
  const latestNewsResult = (await MainPageService.getPaginatedArticles()).result;
  const playersResult = (await MainPageService.get2LMPlayers()).result;
  const imagesResult = (await MainPageService.getPhotoGalleryCategories()).result;
  return {
    props: {
      lastGame: lastGame ? lastGame.result : null,
      latestNews: latestNewsResult,
      youtubeGameUrl: globalSettings.data
        ? globalSettings.data.attributes.Youtube_Url
        : `https://www.youtube.com/watch?v=${DEFAULT_YOUTUBE_VIDEO_ID}`,
      players: playersResult,
      images: imagesResult.data.attributes.Preview.data,
      teamImageUrl: globalSettings.data
        ? `/strapi${globalSettings.data.attributes.Team_Banner.data.attributes.url}`
        : 'team.jpg',
      clubIntro: globalSettings.data ? globalSettings.data.attributes.Club_Intro : '...',
      youtubeIntro: globalSettings.data ? globalSettings.data.attributes.Youtube_Intro : '...'
    },
    revalidate: 60
  };
}

export default Home;

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
