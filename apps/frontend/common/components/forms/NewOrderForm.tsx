import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { orderAddressSchema } from '@/validation';

const NewOrderForm = ({ formHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(orderAddressSchema)
  });

  return (
    <form onSubmit={handleSubmit(formHandler)}>
      <div className="flex flex-col mb-2">
        <div className="flex flex-col relative mb-3">
          <p className="custom-required-field text-gray-600 mb-1">Imię</p>
          <input
            type="text"
            className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="wprowadź imię..."
            {...register('firstName')}
          />
        </div>
        {errors.firstName && <span className="my-2 text-xs text-red-500">{errors.firstName.message}</span>}
      </div>
      <div className="flex flex-col mb-2">
        <div className="flex flex-col relative mb-3">
          <p className="custom-required-field text-gray-600 mb-1">Nazwisko</p>
          <input
            type="text"
            className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="wprowadź nazwisko..."
            {...register('lastName')}
          />
        </div>
        {errors.lastName && <span className="my-2 text-xs text-red-500">{errors.lastName.message}</span>}
      </div>
      <div className="flex flex-col mb-2">
        <div className="flex flex-col relative mb-3">
          <p className="custom-required-field text-gray-600 mb-1">Numer kontaktowy</p>
          <input
            type="text"
            className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="wprowadź numer..."
            {...register('phoneNumber')}
          />
        </div>
        {errors.phoneNumber && <span className="my-2 text-xs text-red-500">{errors.phoneNumber.message}</span>}
      </div>
      <div className="flex flex-col mb-2">
        <div className="flex flex-col relative mb-3">
          <p className="custom-required-field text-gray-600 mb-1">Miasto</p>
          <input
            type="text"
            className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="wprowadź miasto..."
            {...register('city')}
          />
        </div>
        {errors.city && <span className="my-2 text-xs text-red-500">{errors.city.message}</span>}
      </div>
      <div className="flex flex-col mb-2">
        <div className="flex flex-col relative mb-3">
          <p className="custom-required-field text-gray-600 mb-1">Nazwa ulicy</p>
          <input
            type="text"
            className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="wprowadź nazwę ulicy...."
            {...register('street')}
          />
        </div>
        {errors.buildingNumber && <span className="my-2 text-xs text-red-500">{errors.buildingNumber.message}</span>}
      </div>
      <div className="flex flex-col mb-2">
        <div className="flex flex-col relative mb-3">
          <p className="custom-required-field text-gray-600 mb-1">Numer budynku</p>
          <input
            type="text"
            className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="wprowadź numer budynku lub domu..."
            {...register('buildingNumber')}
          />
        </div>
        {errors.buildingNumber && <span className="my-2 text-xs text-red-500">{errors.buildingNumber.message}</span>}
      </div>
      <div className="flex flex-col mb-2">
        <div className="flex flex-col relative mb-3">
          <p className="text-gray-600 mb-1">Numer lokalu/mieszkania</p>
          <input
            type="text"
            className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="wprowadź numer lokalu lub mieszkania..."
            {...register('apartmentNumber')}
          />
        </div>
        {errors.apartmentNumber && <span className="my-2 text-xs text-red-500">{errors.apartmentNumber.message}</span>}
      </div>
      <div className="flex flex-col mb-2">
        <div className="flex flex-col relative mb-3">
          <p className="custom-required-field text-gray-600 mb-1">Kod pocztowy</p>

          <input
            type="text"
            className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="wprowadź kod pocztowy..."
            {...register('postalCode')}
          />
        </div>
        {errors.postalCode && <span className="my-2 text-xs text-red-500">{errors.postalCode.message}</span>}
      </div>
      <div className="flex flex-col mb-2">
        <div className="flex flex-col relative mb-3">
          <p className="text-gray-600 mb-1">Opcjonalne informacje do zamówienia</p>
          <textarea
            rows={4}
            className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Napisz preferowany sposób przesyłki lub jakąś notatkę do zamówienia..."
            {...register('note')}
          />
        </div>
        {errors.note && <span className="my-2 text-xs text-red-500">{errors.note.message}</span>}
      </div>
      <div className="flex w-full">
        <button
          type="submit"
          className="py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          Zamów
        </button>
      </div>
    </form>
  );
};

export default NewOrderForm;
