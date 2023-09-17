import Head from 'next/head';
import { useRouter } from 'next/router';

import ErrorMessage from 'src/components/simple/ErrorMessage';
const ServerError = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Nieoczekiwany błąd</title>
        <meta name="description" content="Wystąpił nieoczekiwany błąd" key="desc" />
      </Head>
      <main className="w-full h-screen flex flex-col justify-center items-center">
        <ErrorMessage
          message={router.query.error_message ? router.query.error_message : 'Nieznany błąd serwera.'}
          code={500}
        />
      </main>
    </>
  );
};

export default ServerError;
