//getTest
/* eslint-disable @typescript-eslint/no-explicit-any */

import PzkoszApiService from '@/modules/services/pzkosz.service';

const Test = ({ t }) => {
  return (
    <>
      <div>
        <pre>{JSON.stringify(t, null, 2)}</pre>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const pzkoszApiService = await PzkoszApiService.getInstance();
  const t = await pzkoszApiService.getTest();

  return {
    props: {
      t
    }
  };
}

export default Test;
