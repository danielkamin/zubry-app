import Head from 'next/head';

import Header from 'src/components/simple/Header';
import Layout from 'src/components/layout/Main/index';
import Sponsor from 'src/components/page/Sponsors/Sponsor';
import { MainPageService } from '@/api';
import { TStrapiContentItem, TStrapiSponsor } from '@/types';

const Sponsors = ({ sponsors }: { sponsors: TStrapiContentItem<TStrapiSponsor>[] }) => {
  return (
    <>
      <Head>
        <title>Sponsorzy drużyny</title>
        <meta name="description" content="Poznaj sponsorów drużyny Żubry Chorten Białystok." key="desc" />
      </Head>
      <div>
        <Header title={'Sponsorzy i partnerzy'} />
        <div className="flex justify-center mx-auto flex-col 2xl:w-2/4 lg:w-3/5 md:w-3/4 w-5/6">
          {sponsors.map((sponsor) => {
            return <Sponsor key={sponsor.id} sponsorData={sponsor.attributes} />;
          })}
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const { result } = await MainPageService.getSponsors();
  return {
    props: {
      sponsors: result.data
    },
    revalidate: 60
  };
}

export default Sponsors;

Sponsors.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
