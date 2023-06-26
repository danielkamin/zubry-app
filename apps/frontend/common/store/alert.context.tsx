import React, { useContext, useState } from 'react';

import Alert from '@/components/simple/Alert';
import { TAlertProps, TAlertType, TProviderProps } from '@/types/common.types';

type TAlertContext = {
  openAlert: (type: TAlertType, message: string) => void;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const AlertContext = React.createContext<TAlertContext>({ openAlert: () => {} });
export const useAlertContext = () => useContext(AlertContext);

export const AlertProvider: React.FC<TProviderProps<TAlertProps>> = (props) => {
  const [alertState, setAlertState] = useState(props.defaultValue);

  const handleAlertOpen = (alertType: TAlertType, message: string) => {
    setAlertState({ alertType: alertType, isOpen: true, message: message });
    setTimeout(() => {
      setAlertState({ alertType: alertType, isOpen: false, message: message });
    }, 3000);
  };
  const handleCloseAlert = (event: React.SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertState({ isOpen: false, message: alertState.message, alertType: alertState.alertType });
  };

  return (
    <AlertContext.Provider value={{ openAlert: handleAlertOpen }}>
      <Alert
        isOpen={alertState.isOpen}
        alertType={alertState.alertType}
        message={alertState.message}
        handleClose={handleCloseAlert}
      />
      {props.children}
    </AlertContext.Provider>
  );
};
