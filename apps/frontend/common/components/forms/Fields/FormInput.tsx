import { InputHTMLAttributes } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<FieldValues>;
  label: string;
  error?: string;
}
const FormInput = ({ register, error, id, ...props }: FormInputProps) => {
  const classNames =
    'border border-gray-400 rounded px-3 placeholder-opacity-50 placeholder-gray-500 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent';
  return (
    <>
      <input {...register(props.name)} className={classNames} id={id} {...props} />
      {error && <div>{error}</div>}
    </>
  );
};

export default FormInput;
