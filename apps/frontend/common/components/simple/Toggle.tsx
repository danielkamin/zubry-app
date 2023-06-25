import React, { InputHTMLAttributes } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<FieldValues>;
  label: string;
}
const Toggle: React.FC<ToggleProps> = ({ register, name, label, ...rest }) => {
  return (
    <label className="flex items-center space-x-3 mb-3">
      <input
        type="checkbox"
        {...register(name)}
        {...rest}
        className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-purple-600 checked:border-transparent focus:outline-none"
      />
      <span className="text-gray-700 font-normal">{label}</span>
    </label>
  );
};

export default Toggle;
