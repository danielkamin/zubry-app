/* eslint-disable @typescript-eslint/no-unused-vars */
import { CloseOutlined } from '@ant-design/icons';

import { TAlertProps, TAlertType } from '@/types';

const Alert: React.FC<TAlertProps> = ({ alertType, isOpen, handleClose, message }) => {
  if (!isOpen) return null;

  const getAlertColorFromType = (alertType: TAlertType) => {
    let alertColor = '';
    switch (alertType) {
      case 'error':
        alertColor = 'bg-red-500';
        break;
      case 'info':
        alertColor = 'bg-blue-500';
        break;
      case 'success':
        alertColor = 'bg-green-500';
        break;
      case 'warning':
        alertColor = 'bg-yellow-500';
        break;
    }
    return alertColor;
  };

  return (
    <div
      className={`fixed bottom-4 z-50 mb-4 w-4/5 left-0 rounded-lg px-4 py-2 right-0 mx-auto text-gray-100 ${getAlertColorFromType(
        alertType
      )}`}
    >
      <div className="flex justify-between">
        <div className="w-auto">{message}</div>
        <div
          className="flex items-center text-xl cursor-pointer hover:text-purple-600 transition-colors"
          onClick={handleClose}
        >
          <CloseOutlined />
        </div>
      </div>
    </div>
  );
};

export default Alert;
