import { Parser } from 'html-to-react';
import edjsHTML from 'editorjs-html';

import Layout from '@/components/layout/Main/index';
import MainPageService from 'common/services/main.service';
import Coach from '@/components/simple/Coach';
import Header from '@/components/simple/Header';
import {
  TStrapiArrayResponse,
  TStrapiClubManagementInfo,
  TStrapiManagementMember,
  TStrapiObjectResponse
} from '@/types/strapi.types';

const Management = ({
  zarzadMembers,
  zarzadInfo
}: {
  zarzadMembers: TStrapiArrayResponse<TStrapiManagementMember>;
  zarzadInfo: TStrapiObjectResponse<TStrapiClubManagementInfo>;
}) => {
  const edjsParser = edjsHTML();
  const zarzadInfoHTML = zarzadInfo ? edjsParser.parse(JSON.parse(zarzadInfo.data.attributes.Content)) : null;
  return (
    <>
      <section>
        <Header title={'Zarząd klubu'} />
        {zarzadInfoHTML && (
          <div className="flex justify-center">
            <article className="prose prose-md">
              <div>{Parser().parse(zarzadInfoHTML.join(''))}</div>
            </article>
          </div>
        )}
        <div className="my-20 flex lg:flex-row justify-around flex-col items-center">
          {zarzadMembers &&
            zarzadMembers.data.length > 0 &&
            zarzadMembers.data.map((member) => (
              <div className="lg:w-1/3 w-full max-w-xl flex justify-center my-8" key={member.id}>
                <Coach
                  name={member.attributes.First_Name}
                  surname={member.attributes.Last_Name}
                  imageSrc={
                    member.attributes.Image.data ? `/strapi${member.attributes.Image.data.attributes.url}` : null
                  }
                  position={member.attributes.Position}
                />
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default Management;

export async function getServerSideProps() {
  const zarzadMembersResult = await MainPageService.getZarzadMembers();
  const zarzadInfoResult = await MainPageService.getZarzadInfo();
  return {
    props: {
      zarzadMembers: zarzadMembersResult.result,
      zarzadInfo: zarzadInfoResult.result
    }
  };
}

Management.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
