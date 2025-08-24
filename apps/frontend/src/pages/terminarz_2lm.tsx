import Head from 'next/head';

import { PzkoszApiService, MainPageService } from '@/api';
import { pzKoszMainUrl } from '@/utils';
import Header from 'src/components/simple/Header';
import ScheduleItem from 'src/components/simple/ScheduleItem';
import Standings from 'src/components/simple/Standings';
import Layout from 'src/components/layout/Main/index';
import SubHeader from 'src/components/simple/SubHeader';
import { PzkoszSettings } from '@/types';
import Link from 'next/link';
import { ArrowRightOutlined } from '@ant-design/icons';

export default function Schedule({ leagueId, seasonId, leaderBoard, ourGames, ourPlayOffs }) {
  const fullTableDesc = 'Zobacz pełną tabelę';
  const fullScheduleDesc = 'Zobacz pełny terminarz';
  return (
    <>
      <div>
        <Head>
          <title>Terminarz 2. ligi</title>
          <meta
            name="description"
            content="Zobacz terminarz 2. ligowej drużyny Żubry Abakus Okna Białystok."
            key="desc"
          />
        </Head>
        <Header title={'Tabela i Terminarz - 2 liga'} />
        {ourPlayOffs && ourPlayOffs.length > 0 ? (
          <div className="flex justify-center mb-12">
            <Link
              href="/playoff_2lm"
              className="text-gray-700 text-2xl flex gap-4 items-center hover:opacity-50 transition-opacity underline"
            >
              <SubHeader textColor="gray-700">
                <div className="flex items-center">
                  PLAY-OFF <ArrowRightOutlined className="text-base ml-2" />
                </div>
              </SubHeader>
            </Link>
          </div>
        ) : null}
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
        {ourGames.map((item) => {
          return <ScheduleItem data={item} key={item.id} />;
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

export async function getServerSideProps() {
  const pzkoszApiService = await PzkoszApiService.getInstance();
  const pzkoszSettingsResult = (await MainPageService.getPzkoszSettingsData()).result;
  const ourGamesResult = (await pzkoszApiService.getOurGames()).result;
  const leaderBoardResult = (await pzkoszApiService.getLeaderBoard()).result;
  const pzkoszSettings = pzkoszSettingsResult.data.attributes.settings as PzkoszSettings;
  const { result: ourPlayOffs } = await pzkoszApiService.getOurPlayOffGames();
  return {
    props: {
      leagueId: pzkoszSettings.leagueId,
      groupId: pzkoszSettings.stages[0].id,
      seasonId: pzkoszSettings.seasonId,
      teamId: pzkoszSettings.teamId,
      leaderBoard: leaderBoardResult,
      ourGames: ourGamesResult,
      ourPlayOffs: ourPlayOffs
    }
  };
}

Schedule.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
