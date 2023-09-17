import Head from 'next/head';

import Layout from 'src/components/layout/Main/index';
import { MainPageService } from '@/api';
import StandingsYouth from 'src/components/simple/StandingsYouth';
import ScheduleItemYouth from 'src/components/simple/ScheduleItemYouth';
import Tabs from 'src/components/complex/Tabs';
import {
  TStrapi3LMLeaderboard,
  TStrapi3LMSchedule,
  TStrapiArrayResponse,
  TStrapiLeaderBoardItem,
  TStrapiScheduleItem
} from '@/types';

export default function Schedule_3LM({
  leaderboardStages,
  timetableStages,
  leaderboard,
  timetable
}: {
  leaderboardStages: string[];
  timetableStages: string[];
  leaderboard: TStrapiArrayResponse<TStrapi3LMLeaderboard>;
  timetable: TStrapiArrayResponse<TStrapi3LMSchedule>;
}) {
  const sortStandings = (a: TStrapiLeaderBoardItem, b: TStrapiLeaderBoardItem) => {
    if (a.Rank < b.Rank) return -1;
    if (a.Rank > b.Rank) return 1;
    return 0;
  };
  const sortGames = (a: TStrapiScheduleItem, b: TStrapiScheduleItem) => {
    if (a.Game_Stage_Number < b.Game_Stage_Number) return -1;
    if (a.Game_Stage_Number > b.Game_Stage_Number) return 1;
    return 0;
  };
  return (
    <>
      <Head>
        <title>Tabela i Terminarz - 3 liga</title>
        <meta name="description" content="Zobacz terminarz 3. ligowej drużyny Żubry Chorten Białystok." key="desc" />
      </Head>
      <Tabs wrapperClass="md:-mt-12 -mt-6 w-screen relative left-1/2 transform -translate-x-1/2">
        <div title="Terminarz">
          <Tabs contentClass="max-w-3xl mx-auto mt-12">
            {timetable.data.map((stageTimetable, index) => (
              <div key={stageTimetable.id} title={timetableStages[index]}>
                {stageTimetable.attributes.Schedule.sort(sortGames).map((scheduleItem) => (
                  <div key={scheduleItem.id}>
                    <p className="text-center font-medium text-gray-800">{scheduleItem.Game_Stage_Number}. kolejka</p>
                    <ScheduleItemYouth scheduleItem={scheduleItem} />
                    <div className="divider-horizotal mt-8 mb-12"></div>
                  </div>
                ))}
              </div>
            ))}
          </Tabs>
        </div>
        <div title="Tabela">
          <Tabs contentClass="max-w-3xl mx-auto mt-12 mx-4 md:mx-auto">
            {leaderboard.data.map((stageLeaderBoard, index) => (
              <div key={stageLeaderBoard.id} title={leaderboardStages[index]}>
                <StandingsYouth leaderBoard={stageLeaderBoard.attributes.Table.sort(sortStandings)} />
              </div>
            ))}
          </Tabs>
        </div>
      </Tabs>
    </>
  );
}

export async function getStaticProps() {
  const timetable = await MainPageService.get3LMTimetable();
  const leaderboard = await MainPageService.get3LMLeaderboard();
  const leaderboardStages = leaderboard.result.data.map((l) => l.attributes.Stage_Name);
  const timetableStages = timetable.result.data.map((t) => t.attributes.Stage_Name);

  return {
    props: {
      leaderboardStages,
      timetableStages,
      leaderboard: leaderboard.result,
      timetable: timetable.result
    },
    revalidate: 60
  };
}

Schedule_3LM.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
