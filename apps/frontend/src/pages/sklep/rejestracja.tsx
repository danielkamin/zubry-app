import ShopLayout from 'src/components/layout/Shop/index';
import RegisterForm from 'src/components/forms/RegisterForm';
import Link from 'next/link';

const Register = () => {
  return (
    <div className="my-12 flex justify-center">
      <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow border sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-6 text-xl text-gray-600 sm:text-2xl">Stwórz nowe konto</div>
        <div className="mt-4">
          <RegisterForm />
        </div>
        <div className="flex items-center justify-center mt-6">
          <Link
            href="/sklep/login"
            className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700"
          >
            <span className="ml-2">Masz już konto?</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

Register.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
};
