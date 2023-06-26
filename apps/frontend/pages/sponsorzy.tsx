import Header from '@/components/simple/Header';
import Layout from '@/components/layout/Main/index';
import Sponsor from '@/components/page/Sponsors/Sponsor';
import MainPageService from 'common/services/main.service';
import { TStrapiContentItem, TStrapiSponsor } from '@/types/strapi.types';

const Sponsors = ({ sponsors }: { sponsors: TStrapiContentItem<TStrapiSponsor>[] }) => {
  return (
    <>
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
