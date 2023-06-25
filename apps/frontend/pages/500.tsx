import { useRouter } from 'next/router';

import ErrorMessage from '@/components/simple/ErrorMessage';
const ServerError = () => {
  const router = useRouter();

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
      <ErrorMessage
        message={router.query.error_message ? router.query.error_message : 'Nieznany błąd serwera.'}
        code={500}
      />
    </main>
  );
};

export default ServerError;
