import Image from 'next/image';
import { PictureOutlined } from '@ant-design/icons';

const Coach = ({ name, surname, imageSrc, position }) => {
  return (
    <div className="flex p-3 border shadow-xl rounded-xl gap-5 w-full lg:w-96 mb-10 bg-white">
      <div className="w-24 h-36 relative my-auto rounded-xl shadow overflow-hidden ">
        {imageSrc ? (
          <Image layout="fill" objectFit="cover" alt={`${name} ${surname}`} src={imageSrc} />
        ) : (
          <div className="flex text-4xl justify-center items-center h-full text-gray-400">
            <PictureOutlined />
          </div>
        )}
      </div>
      <div className="w-2/3">
        <div className="h-1/2">
          <div className="font-semibold">
            {name} {surname}
          </div>
          <div className="text-sm">{position}</div>
        </div>
      </div>
    </div>
  );
};

export default Coach;
