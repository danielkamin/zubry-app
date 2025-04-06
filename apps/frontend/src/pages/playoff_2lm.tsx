import { PzkoszApiService } from '@/api';
import Header from '@/components/simple/Header';
import ScheduleItem from '@/components/simple/ScheduleItem';
import Head from 'next/head';
import Link from 'next/link';
import Layout from 'src/components/layout/Main/index';

export default function PlayOff2LM({ ourPlayOffs }) {
  return (
    <div>
      <Head>
        <title>Mecze Play-Off</title>
        <meta name="description" content="Zobacz terminarz 2. ligowej drużyny Żubry Chorten Białystok." key="desc" />
      </Head>
      <Header title={'Mecze Play-Off'} />
      {ourPlayOffs && ourPlayOffs.length > 0 ? (
        ourPlayOffs.map((item) => <ScheduleItem data={item} key={item.id} />)
      ) : (
        <div className="flex text-gray-700 justify-center">
          <p className="mr-4">Brak meczy do wyświetlenia w tym sezonie... </p>
          <Link href="/terminarz_2lm" className="underline hover:opacity-60 transition-opacity">
            Powrót do terminarza
          </Link>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const pzkoszApiService = await PzkoszApiService.getInstance();
  const { result: ourPlayOffs } = await pzkoszApiService.getOurPlayOffGames();
  return {
    props: {
      ourPlayOffs: ourPlayOffs
    }
  };
}
PlayOff2LM.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
