import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { registerSchema } from '@/validation';
import UserService from 'common/services/user.service';
import { useAlertContext } from 'common/store/alert.context';
import Link from 'next/link';

const RegisterForm = () => {
  const router = useRouter();
  const alertContext = useAlertContext();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(registerSchema)
  });

  const registerUser = async (data) => {
    const response = await UserService.registerAccount(data);
    if (response.status !== true) alertContext.openAlert('success', response.result);
    else {
      router.push('/sklep/login');
      alertContext.openAlert('success', response.result);
    }
  };
  return (
    <form onSubmit={handleSubmit(registerUser)} autoComplete="off">
      <div className="flex flex-col mb-2">
        <div className="flex relative ">
          <input
            type="email"
            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Twój email"
            {...register('email')}
          />
        </div>
        {errors.email && <span className="my-2 text-xs text-red-500">{errors.email.message}</span>}
      </div>
      <div className="flex flex-col mb-2">
        <div className="flex relative ">
          <input
            type="password"
            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Twoje hasło"
            {...register('password')}
          />
        </div>
        {errors.password && <span className="my-2 text-xs text-red-500">{errors.password.message}</span>}
      </div>
      <div className="flex flex-col mb-6">
        <div className="flex relative ">
          <input
            type="password"
            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Ponownie twoje hasło"
            {...register('passwordConfirmation')}
          />
        </div>
        {errors.passwordConfirmation && (
          <span className="my-2 text-xs text-red-500">{errors.passwordConfirmation.message}</span>
        )}
      </div>
      <div className="flex flex-col mb-6">
        <label className="flex items-center space-x-3 mb-3">
          <input
            type="checkbox"
            className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-purple-600 checked:border-transparent focus:outline-none"
            {...register('acceptedRegulations')}
          />
          <Link href="/sklep/regulamin">
            <a className="text-gray-700 font-normal text-sm hover:underline">Akceptuję regulamin sklepu</a>
          </Link>
        </label>
        {errors.acceptedRegulations && (
          <span className="my-2 text-xs text-red-500">{errors.acceptedRegulations.message}</span>
        )}
      </div>
      <div className="flex w-full">
        <button
          type="submit"
          className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          Rejestracja
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
