import Head from 'next/head';

import Header from '@/components/simple/Header';
import Layout from '@/components/layout/Main/index';
import MainPageService from 'common/services/main.service';
import Player from '@/components/simple/Player';
import Coach from '@/components/simple/Coach';
import { PickGridCols } from '@/utils/helpers';
import { TStrapiArrayResponse, TStrapiCoach, TStrapiPlayer } from '@/types/strapi.types';

export default function Team3LM({
  players,
  coaches
}: {
  players: TStrapiArrayResponse<TStrapiPlayer>;
  coaches: TStrapiArrayResponse<TStrapiCoach>;
}) {
  return (
    <div>
      <Head>
        <title>Zespół 3. ligi</title>
        <meta name="description" content="Zobacz zawodników 3. ligowej drużyny Żubry Chorten Białystok." key="desc" />
      </Head>
      <Header title={'Żubry Chorten Białystok - 3 liga'} />
      <div className="">
        <div>Kadra trenerska drużyny Żubry Chorten Białystok prowadzącej rozgrywki 3LM.</div>
      </div>
      {coaches && coaches.data.length > 0 ? (
        <div
          className={
            'grid ' +
            PickGridCols(coaches.data.length) +
            ' md:grid-cols-1 sm:grid-cols-1 gap-16 mt-10 mb-20 justify-items-center'
          }
        >
          {coaches.data.map((coach) => {
            return (
              <Coach
                key={coach.id}
                name={coach.attributes.First_Name}
                surname={coach.attributes.Last_Name}
                imageSrc={coach.attributes.Photo.data ? `/strapi${coach.attributes.Photo.data.attributes.url}` : null}
                position={coach.attributes.Position}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-gray-400 text-lg my-4 block text-center">Brak zasobów do wyswietlenia...</p>
      )}
      <div className="mt-24">
        <div>Kadra zawodnicza drużyny Żubry Chorten Białystok prowadzącej rozgrywki 3LM.</div>
      </div>
      {players && players.data.length > 0 ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-16 mt-10">
          {players.data.map((player) => {
            return (
              <Player
                playerId={player.id}
                key={player.id}
                name={player.attributes.First_Name}
                surname={player.attributes.Last_Name}
                imageSrc={player.attributes.Photo.data ? `/strapi${player.attributes.Photo.data.attributes.url}` : null}
                dateOfBirth={player.attributes.Birthday}
                position={player.attributes.Position}
                playerFromCms={true}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-gray-400 text-lg my-4 block text-center">Brak zasobów do wyswietlenia...</p>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const players = await MainPageService.get3LMPlayers();
  const coaches = await MainPageService.get3LMCoaches();
  return {
    props: {
      players: players.result,
      coaches: coaches.result
    },
    revalidate: 60
  };
}

Team3LM.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
