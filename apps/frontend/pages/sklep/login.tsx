import Link from 'next/link';

import ShopLayout from '@/components/layout/Shop/index';
import LoginForm from '@/components/forms/LoginForm';
import { useState } from 'react';

const formatLoginError = (errorMsg: string): string => {
  if (errorMsg === 'CredentialsSignin') {
    return 'Złe dane logowania.';
  } else if (errorMsg === '') {
    return '';
  } else {
    return 'Coś poszło nie tak. Skontaktuj się z administracją.';
  }
};

const Login = ({ csrfToken, errorMsg }) => {
  const [errorState] = useState(formatLoginError(errorMsg));
  return (
    <div className="my-12 flex justify-center">
      <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow border sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl">
          Zaloguj się do swojego konta
        </div>
        <div className="mt-4">
          <span className="text-red-500 font-semibold text-sm flex justify-center my-2">{errorState}</span>
          <LoginForm csrfToken={csrfToken} />
        </div>
        <div className="flex items-center justify-center mt-6">
          <Link href="/sklep/rejestracja">
            <a className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700">
              <span className="ml-2">Nie posiadasz konta?</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
export async function getServerSideProps(ctx) {
  const errorMsg = ctx.query.error ? ctx.query.error : '';
  return {
    props: {
      errorMsg: errorMsg
    }
  };
}
Login.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};
