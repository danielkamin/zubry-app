import Head from 'next/head';
import ErrorMessage from 'src/components/simple/ErrorMessage';

export default function FourOhFour() {
  return (
    <>
      <Head>
        <title>Nie znaleziona strona</title>
        <meta name="description" content="Nie udało się znaleźć szukanej strony" key="desc" />
      </Head>
      <main className="w-full h-screen flex flex-col justify-center items-center">
        <ErrorMessage message="404 - Strona nie odnaleziona." code={404} />
      </main>
    </>
  );
}
