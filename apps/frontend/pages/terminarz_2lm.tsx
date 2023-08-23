import Head from 'next/head';

import MainPageService from 'common/services/main.service';
import PzkoszApiService from 'common/services/pzkosz.service';
import { pzKoszMainUrl } from 'common/utils/constants';
import Header from '@/components/simple/Header';
import ScheduleItem from '@/components/simple/ScheduleItem';
import Standings from '@/components/simple/Standings';
import Layout from '@/components/layout/Main/index';
import SubHeader from '@/components/simple/SubHeader';

export default function Schedule({ leagueId, seasonId, leaderBoard, ourGames }) {
  const fullTableDesc = 'Zobacz pełną tabelę';
  const fullScheduleDesc = 'Zobacz pełny terminarz';
  return (
    <>
      <div>
        <Head>
          <title>Terminarz 2. ligi</title>
          <meta name="description" content="Zobacz terminarz 2. ligowej drużyny Żubry Chorten Białystok." key="desc" />
        </Head>
        <Header title={'Tabela i Terminarz - 2 liga'} />
        {/* <div className="flex justify-center mb-12">
          <Link href="/playoff_2lm">
            <a className="text-gray-700 text-2xl flex gap-4 items-center hover:text-primary-6 transition-colors">
              <h3>PLAY-OFF</h3>
              <RightOutlined />
            </a>
          </Link>
        </div> */}
        <div className="w-full text-right mb-2">
          <a
            rel="noreferrer"
            href={`${pzKoszMainUrl}liga/${leagueId}/sezon/${seasonId}/terminarz_i_wyniki.html`}
            target="_blank"
            className="font-semibold text-hover underline text-gray-600"
          >
            {fullTableDesc}
          </a>
        </div>
        <Standings data={leaderBoard} />
        <div className="block text-center">
          <SubHeader textColor="gray-700">{'Terminarz naszych meczów'}</SubHeader>
        </div>
        {ourGames.map((item, key) => {
          return <ScheduleItem key={key} data={item} />;
        })}
        <div className="w-full text-center mt-20">
          <a
            rel="noreferrer"
            href={`${pzKoszMainUrl}liga/${leagueId}/sezon/${seasonId}/terminarz_i_wyniki.html`}
            target="_blank"
            className="text-lg font-bold text-hover uppercase underline text-gray-600"
          >
            {fullScheduleDesc}
          </a>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const pzkoszApiService = await PzkoszApiService.getInstance();
  const pzkoszSettingsResult = (await MainPageService.getPzkoszSettingsData()).result;
  const ourGamesResult = (await pzkoszApiService.getOurGames()).result;
  const leaderBoardResult = (await pzkoszApiService.getLeaderBoard()).result;
  return {
    props: {
      leagueId: pzkoszSettingsResult.data.attributes.settings.leagueId,
      groupId: pzkoszSettingsResult.data.attributes.settings.stages[0].id,
      seasonId: pzkoszSettingsResult.data.attributes.settings.seasonId,
      teamId: pzkoszSettingsResult.data.attributes.settings.teamId,
      leaderBoard: leaderBoardResult,
      ourGames: ourGamesResult
    },
    revalidate: 60
  };
}

Schedule.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
