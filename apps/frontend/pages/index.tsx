/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from 'next/dynamic';
import useInView from 'react-cool-inview';
import Link from 'next/link';

import Banner from '@/components/page/Home/Banner';
import LastGame from '@/components/page/Home/LastGame';

const ClubInfo = dynamic(() => import('@/components/page/Home/ClubInfo'));
const LatestNews = dynamic(() => import('@/components/page/Home/LatestNews'));
const YouTubePlayer = dynamic(() => import('@/components/page/Home/YouTubePlayer'));
const GoogleMaps = dynamic(() => import('@/components/simple/GoogleMaps'));
const PlayersSection = dynamic(() => import('@/components/page/Home/Players'));
const ImagesRotator = dynamic(() => import('@/components/simple/ImagesRotator'));

import Layout from '@/components/layout/Main/index';
import { gymGoogleMapsIframeSrc } from 'common/utils/constants';
import MainPageService from 'common/services/main.service';
import {
  TStrapiArrayResponse,
  TStrapiArticle,
  TStrapiContentItem,
  TStrapiImageWithFormats,
  TStrapiPlayer
} from '@/types/strapi.types';
import PzkoszApiService from 'common/services/pzkosz.service';

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
  const youTubePlayerElementObserver = useInView({
    onEnter: ({ unobserve }) => unobserve()
  });
  const latestNewsElementObserver = useInView({
    onEnter: ({ unobserve }) => unobserve()
  });
  const clubInfoElementObserver = useInView({
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
      <div ref={youTubePlayerElementObserver.observe}>
        {youTubePlayerElementObserver.inView && <YouTubePlayer url={youtubeGameUrl} intro={youtubeIntro} />}
      </div>
      <div ref={imagesRotatorElementObserver.observe} className="images-rotator mt-12">
        <Link href="/galeria">
          <a>
            <ImagesRotator images={images} />
          </a>
        </Link>
      </div>

      <div ref={clubInfoElementObserver.observe}>
        {clubInfoElementObserver.inView && <ClubInfo imageUrl={teamImageUrl} intro={clubIntro} />}
      </div>
      <div ref={playersElementObserver.observe}>
        {playersElementObserver.inView && <PlayersSection players={players.data} />}
      </div>
      <div ref={googleMapsElementObserver.observe}>
        {googleMapsElementObserver.inView && (
          <GoogleMaps src={gymGoogleMapsIframeSrc} textInfo={'Mecze rozgrywamy tutaj:'} />
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
        : 'https://www.youtube.com/watch?v=dAjI2Lkup3A',
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
