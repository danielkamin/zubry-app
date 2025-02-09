import Head from 'next/head';

import Player from 'src/components/simple/Player';
import Header from 'src/components/simple/Header';
import Layout from 'src/components/layout/Main/index';
import PersonCard from '@/components/simple/PersonCard';
import { PickGridCols } from '@/utils';
import { MainPageService } from '@/api';
import { TStrapiArrayResponse, TStrapiCoach, TStrapiPlayer } from '@/types';

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
      <p>Poniżej zaprezentowana jest nasza kadra trenerska oraz aktualni zawodnicy reprezentujący nasz klub</p>
      {coaches && coaches.data.length > 0 && (
        <div
          className={
            'grid ' +
            PickGridCols(coaches.data.length) +
            'grid md:grid-cols-2 grid-cols-1 gap-16 mt-10 justify-items-center'
          }
        >
          {coaches.data.map((coach, key) => {
            return (
              <PersonCard
                key={key}
                name={coach.attributes.First_Name}
                surname={coach.attributes.Last_Name}
                imageSrc={coach.attributes.Photo.data ? coach.attributes.Photo.data.attributes.url : null}
                description={coach.attributes.Position}
              />
            );
          })}
        </div>
      )}
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
                imageSrc={player.attributes.Photo.data ? player.attributes.Photo.data.attributes.url : null}
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
