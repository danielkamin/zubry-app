import { useForm } from 'react-hook-form';
import NewButton from '../simple/NewButton';

const AddProductForm = ({ submitForm, sizes }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { size: `${sizes[0].id},${sizes[0].attributes.Size}`, quantity: 1 }
  });

  return (
    <form onSubmit={handleSubmit(submitForm)} autoComplete="off">
      <div className="flex mb-2 flex-wrap">
        {sizes.map((size) => (
          <label className="inline-flex items-center mr-3" key={size.id}>
            <input
              {...register('size')}
              value={`${size.id},${size.attributes.Size}`}
              type="radio"
              className="h-5 w-5 text-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-200 focus:ring-purple-500 "
            />
            <span className="ml-2 text-gray-700">{size.attributes.Size}</span>
          </label>
        ))}
      </div>
      <div className="flex flex-col mb-2">
        <label className="inline-flex items-center my-1">
          <input
            {...register('quantity')}
            type="number"
            min={1}
            className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </label>
      </div>
      <div className="flex w-full">
        <NewButton type="submit">Dodaj do koszyka</NewButton>
      </div>
    </form>
  );
};

export default AddProductForm;
