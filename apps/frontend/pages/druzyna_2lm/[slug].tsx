import { useRouter } from 'next/router';
import Image from 'next/image';
import { Parser } from 'html-to-react';
import edjsHTML from 'editorjs-html';

import Layout from '@/components/layout/Main/index';
import Header from '@/components/simple/Header';
import GridGallery from '@/components/simple/GridGallery';
import { calculateAge } from '@/utils/helpers';
import MainPageService from 'common/services/main.service';
import HorizontalCardSkeleton from '@/components/simple/HorizontalCardSkeleton';
import { TStrapiPlayer } from '@/types/strapi.types';
import { PictureOutlined } from '@ant-design/icons';

const PlayerDetails = ({ player }: { player: TStrapiPlayer & { id: number } }) => {
  const router = useRouter();
  const edjsParser = edjsHTML();

  return (
    <>
      {router.isFallback ? (
        <HorizontalCardSkeleton />
      ) : (
        <section>
          <Header title={player.First_Name + ' ' + player.Last_Name} />
          <div className="flex flex-col lg:flex-row">
            <div className="h-96 relative m-auto min-h-full w-2/6">
              {player.Photo.data ? (
                <Image
                  layout="fill"
                  objectFit="contain"
                  alt={`${player.First_Name} ${player.Last_Name}`}
                  src={`/strapi${player.Photo.data.attributes.url}`}
                  className="rounded-xl"
                ></Image>
              ) : (
                <div className="flex text-7xl justify-center items-center h-full text-gray-400">
                  <PictureOutlined />
                </div>
              )}
            </div>
            <div className="flex flex-col items-center lg:w-4/6 w-full">
              <div className="text-2xl sm:text-3xl lg:text-5xl font-semibold mt-3">
                <p className="bg-yellow-400 text-white w-max px-8 py-2">NR {player.Number}</p>
              </div>
              <div className="text-2xl sm:text-3xl lg:text-5xl font-semibold mt-3">
                <p className="bg-black text-white w-max px-8 py-2">{player.Position}</p>
              </div>
              <div className="text-2xl sm:text-3xl lg:text-5xl font-semibold mt-3">
                <p className="bg-black text-white w-max px-8 py-2 content-center">
                  WZROST: <span className="text-yellow-400">{player.Height}</span> WIEK:{' '}
                  <span className="text-yellow-400">{calculateAge(player.Birthday, 'yyyy-MM-dd').toUpperCase()}</span>
                </p>
              </div>
              <div className="text-2xl sm:text-3xl lg:text-5xl font-semibold mt-3">
                <p className="text-gray-700 w-max p-4">STATYSTYKI:</p>
              </div>
              <div className="text-2xl sm:text-3xl lg:text-5xl font-semibold mt-3">
                <p className="bg-black text-white w-max px-8 py-2 content-center">
                  PUNKTY: <span className="text-yellow-400">{player.Average_Points ? player.Average_Points : 0}</span>{' '}
                  ZBIÓRKI:{' '}
                  <span className="text-yellow-400">{player.Average_Rebounds ? player.Average_Rebounds : 0}</span>
                </p>
              </div>
              <div className="text-2xl sm:text-3xl lg:text-5xl font-semibold mt-3">
                <p className="bg-black text-white w-max px-8 py-2 content-center">
                  ASYSTY: <span className="text-yellow-400">{player.Average_Asists ? player.Average_Asists : 0}</span>{' '}
                  MINUTY: <span className="text-yellow-400">{player.Average_Minutes ? player.Average_Minutes : 0}</span>
                </p>
              </div>
            </div>
          </div>
          {player.Info && (
            <div className="flex justify-center my-12 container">
              <article className="prose prose-md">
                {Parser().parse(edjsParser.parse(JSON.parse(player.Info)).join(''))}
              </article>
            </div>
          )}
          <GridGallery images={player.Images.data} />
        </section>
      )}
    </>
  );
};

export async function getStaticProps({ params }) {
  const { result } = await MainPageService.get2LMPlayer(params.slug);
  const content = result.data.attributes;
  return {
    props: {
      player: {
        id: result.data.id,
        ...content
      }
    },
    revalidate: 60
  };
}

export async function getStaticPaths() {
  const { result, status } = await MainPageService.get2LMPlayers();
  if (result && status) {
    return {
      paths:
        result.data.map((player) => {
          return {
            params: {
              slug: `/${player.id}`
            }
          };
        }) || [],
      fallback: true
    };
  }
}

PlayerDetails.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default PlayerDetails;
