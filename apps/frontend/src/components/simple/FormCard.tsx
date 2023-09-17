import { MessageOutlined } from '@ant-design/icons';
import { FC } from 'react';

const FormCard: FC<{ title: string }> = ({ title, children: Form }) => {
  return (
    <div className="shadow-xl rounded-xl w-full border bg-white">
      <div className="p-10 grid grid-flow-row gap-6">
        <p className="flex items-center font-semibold text-gray-800">
          {title}
          <MessageOutlined className="mx-1 " />
        </p>
        {Form}
      </div>
    </div>
  );
};
export default FormCard;
