import Head from 'next/head';

import Player from '@/components/simple/Player';
import Header from '@/components/simple/Header';
import Layout from '@/components/layout/Main/index';
import Coach from '@/components/simple/Coach';
import { PickGridCols } from '@/utils';
import MainPageService from 'common/services/main.service';
import { TStrapiArrayResponse, TStrapiCoach, TStrapiPlayer } from '@/types/strapi.types';

export default function Team({
  players,
  coaches
}: {
  players: TStrapiArrayResponse<TStrapiPlayer>;
  coaches: TStrapiArrayResponse<TStrapiCoach>;
}) {
  return (
    <div>
      <Head>
        <title>Zespół 2. Ligi</title>
        <meta name="description" content="Zobacz zawodników 2. ligowej drużyny Żubry Chorten Białystok." key="desc" />
      </Head>
      <Header title={'Żubry Chorten Białystok'} />
      <p>Kadra trenerska drużyny Żubry Chorten Białystok prowadzącej rozgrywki 2LM.</p>
      {coaches && coaches.data.length > 0 && (
        <div
          className={
            'grid ' +
            PickGridCols(coaches.data.length) +
            ' md:grid-cols-1 sm:grid-cols-1 mt-10 mb-10 justify-items-center'
          }
        >
          {coaches.data.map((coach, key) => {
            return (
              <Coach
                key={key}
                name={coach.attributes.First_Name}
                surname={coach.attributes.Last_Name}
                imageSrc={coach.attributes.Photo.data ? `/strapi${coach.attributes.Photo.data.attributes.url}` : null}
                position={coach.attributes.Position}
              />
            );
          })}
        </div>
      )}
      <div className="block">
        <p>Przedstawieni są tutaj zawodnicy reprezentujacy nasze barwy w sezonie 2021/2022.</p>
        <p>Wybierając, któregoś z zawodników możesz podejrzeć jego dokładne statystyki, nie tylko z tego sezonu.</p>
      </div>
      {players && players.data.length > 0 && (
        <div
          className={'grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-16 mt-10 justify-items-center'}
        >
          {players.data.map((player, key) => {
            return (
              <Player
                key={key}
                name={player.attributes.First_Name}
                surname={player.attributes.Last_Name}
                imageSrc={player.attributes.Photo.data ? `/strapi${player.attributes.Photo.data.attributes.url}` : null}
                dateOfBirth={player.attributes.Birthday}
                position={player.attributes.Position}
                playerId={player.id}
                playerFromCms={true}
                withLink={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const players = await MainPageService.get2LMPlayers();
  const coaches = await MainPageService.get2LMCoaches();
  return {
    props: {
      players: players.result,
      coaches: coaches.result
    },
    revalidate: 60
  };
}

Team.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
