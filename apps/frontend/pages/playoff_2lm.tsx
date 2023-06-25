import Layout from '@/components/layout/Main/index';

export default function PlayOff2LM() {
  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-gray-700 text-2xl">Tu będą wyswietlane wyniki meczy playoff...</h1>
      </div>
    </>
  );
}

PlayOff2LM.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
