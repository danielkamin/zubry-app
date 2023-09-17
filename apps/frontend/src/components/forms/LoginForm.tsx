/* eslint-disable @typescript-eslint/no-unused-vars */
import { MailOutlined, UnlockOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

//todo refactor Common componentu button na nowy

const LoginForm = ({ csrfToken }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const login = async (data) => {
    await signIn('credentials', { username: data.username, password: data.password, callbackUrl: '/sklep' });
  };
  return (
    <form onSubmit={handleSubmit(login)}>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <div className="flex flex-col mb-2">
        <div className="flex relative ">
          <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
            <MailOutlined />
          </span>
          <input
            type="text"
            className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Twój email"
            {...register('username')}
          />
        </div>
      </div>
      <div className="flex flex-col mb-6">
        <div className="flex relative ">
          <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
            <UnlockOutlined />
          </span>
          <input
            type="password"
            className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Twoje hasło"
            {...register('password')}
          />
        </div>
      </div>
      <div className="flex items-center mb-6 -mt-4">
        <div className="flex ml-auto">
          <a href="#" className="inline-flex text-xs font-thin text-gray-500 sm:text-sm hover:text-gray-700 ">
            Zapomniałeś Hasła?
          </a>
        </div>
      </div>
      <div className="flex w-full">
        <button
          type="submit"
          className="py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
