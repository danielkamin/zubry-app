import { useRouter } from 'next/router';
import Image from 'next/legacy/image';
import { Parser } from 'html-to-react';
import edjsHTML from 'editorjs-html';

import Layout from 'src/components/layout/Main/index';
import Header from 'src/components/simple/Header';
import GridGallery from 'src/components/simple/GridGallery';
import { calculateAge } from '@/utils';
import { MainPageService } from '@/api';
import HorizontalCardSkeleton from 'src/components/simple/HorizontalCardSkeleton';
import { TStrapiPlayer } from '@/types';
import Head from 'next/head';

const PlayerDetails = ({ player }: { player: TStrapiPlayer & { id: number } }) => {
  const router = useRouter();
  const edjsParser = edjsHTML();

  return (
    <>
      {router.isFallback ? (
        <HorizontalCardSkeleton />
      ) : (
        <section>
          <Head>
            <title>
              {player.First_Name} {player.Last_Name}
            </title>
            <meta
              name="description"
              content={`Zobacz profil zawodnika ${player.First_Name} ${player.Last_Name} 2. ligowej drużyny Żubry Chorten Białystok.`}
              key="desc"
            />
          </Head>
          <Header title={player.First_Name + ' ' + player.Last_Name} />
          <div className="grid lg:grid-cols-12">
            <div className="md:col-span-2"></div>
            <div className="w-60 h-60 relative rounded-xl col-span-12 md:col-span-2 m-auto min-h-full">
              <Image
                layout="fill"
                objectFit="contain"
                alt={`${player.First_Name} ${player.Last_Name}`}
                src={player.Photo.data ? `/strapi${player.Photo.data.attributes.url}` : null}
              ></Image>
            </div>
            <div className="col-span-4 ml-10 hidden md:block">
              <div className="text-5xl font-semibold mt-3">
                <p className="bg-yellow-400 text-white w-max pl-5 pr-20 py-2">NR {player.Number}</p>
              </div>
              <div className="text-5xl font-semibold mt-3">
                <p className="bg-black text-white w-max pl-5 pr-20 py-2">{player.Position}</p>
              </div>
              <div className="text-5xl font-semibold mt-3">
                <p className="bg-black text-white w-max pl-5 pr-20 py-2 content-center">
                  WZROST: <span className="text-yellow-400">{player.Height}</span> WIEK:{' '}
                  <span className="text-yellow-400">{calculateAge(player.Birthday, 'yyyy-MM-dd').toUpperCase()}</span>
                </p>
              </div>
              <div className="text-5xl font-semibold mt-3">
                <p className="text-gray-700 w-max pr-20 py-4">STATYSTYKI:</p>
              </div>
              <div className="text-5xl font-semibold mt-3">
                <p className="bg-black text-white w-max pl-5 pr-20 py-2 content-center">
                  PUNKTY: <span className="text-yellow-400">{player.Average_Points ? player.Average_Points : 0}</span>{' '}
                  ZBIÓRKI:{' '}
                  <span className="text-yellow-400">{player.Average_Rebounds ? player.Average_Rebounds : 0}</span>
                </p>
              </div>
              <div className="text-5xl font-semibold mt-3">
                <p className="bg-black text-white w-max pl-5 pr-20 py-2 content-center">
                  ASYSTY: <span className="text-yellow-400">{player.Average_Asists ? player.Average_Asists : 0}</span>{' '}
                  MINUTY: <span className="text-yellow-400">{player.Average_Minutes ? player.Average_Minutes : 0}</span>
                </p>
              </div>
            </div>
            <div className="md:col-span-2"></div>
          </div>
          <div className="md:hidden block w-full mx-auto text-center">
            <div className="text-5xl font-semibold mt-3">
              <p className="bg-yellow-400 text-white  py-2">{player.Number}</p>
            </div>
            <div className="flex flex-row mt-2 mx-2">
              <div className="flex flex-col w-6/12 text-left font-bold">Pozycja:</div>
              <div className="flex flex-col w-6/12 text-left">{player.Position}</div>
            </div>
            <div className="flex flex-row mt-2 mx-2">
              <div className="flex flex-col w-6/12 text-left font-bold">Wzrost:</div>
              <div className="flex flex-col w-6/12 text-left">{player.Height} cm</div>
            </div>
            <div className="flex flex-row mt-2 mx-2">
              <div className="flex flex-col w-6/12 text-left font-bold">Wiek:</div>
              <div className="flex flex-col w-6/12 text-left">
                {calculateAge(player.Birthday, 'yyyy-MM-dd').toLowerCase()}
              </div>
            </div>
            <div className="flex flex-row mt-2 mx-2">
              <div className="flex flex-col w-6/12 text-left font-bold">Puntky:</div>
              <div className="flex flex-col w-6/12 text-left">xd</div>
            </div>
            <div className="flex flex-row mt-2 mx-2">
              <div className="flex flex-col w-6/12 text-left font-bold">Zbiórki:</div>
              <div className="flex flex-col w-6/12 text-left">xd</div>
            </div>
            <div className="flex flex-row mt-2 mx-2">
              <div className="flex flex-col w-6/12 text-left font-bold">Asysty:</div>
              <div className="flex flex-col w-6/12 text-left">xd</div>
            </div>
            <div className="flex flex-row mt-2 mx-2">
              <div className="flex flex-col w-6/12 text-left font-bold">Minuty:</div>
              <div className="flex flex-col w-6/12 text-left">xd</div>
            </div>
          </div>
          {player.Info && (
            <div className="flex justify-center my-12 container">
              <article className="prose prose-md">
                {Parser().parse(edjsParser.parse(JSON.parse(player.Info)).join(''))}
              </article>
            </div>
          )}
          {player.Images.data && <GridGallery images={player.Images.data.map((i) => i.attributes)} />}
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
  const { result, status } = await await MainPageService.get2LMPlayers();
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
