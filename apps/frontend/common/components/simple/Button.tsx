import { FC } from 'react';

interface IButtonProps {
  type?: 'button' | 'submit' | 'reset';
}

const Button: FC<IButtonProps> = ({ children, type = 'button' }) => {
  return (
    <button
      type={type}
      className="inline-block px-6 py-2.5 bg-gray-900 text-white font-medium text-base leading-tight uppercase rounded shadow-md hover:bg-black hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
    >
      {children}
    </button>
  );
};

export default Button;
