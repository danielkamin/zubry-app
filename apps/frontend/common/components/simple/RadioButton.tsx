import React, { InputHTMLAttributes } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<FieldValues>;
  label: string;
}
const RadioButton: React.FC<RadioProps> = ({ register, name, label, ...rest }) => {
  return (
    <label className="inline-flex items-center">
      <input
        {...register(name)}
        {...rest}
        type="radio"
        className="h-5 w-5 text-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-200 focus:ring-purple-500 "
      />
      <span className="ml-2 text-gray-700">{label}</span>
    </label>
  );
};

export default RadioButton;
