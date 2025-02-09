import { ReactNode } from 'react';

export type TAlertType = 'success' | 'info' | 'warning' | 'error';

export type TAlertProps = {
  alertType: TAlertType;
  isOpen: boolean;
  message: string;
  handleClose?: (event: React.SyntheticEvent | MouseEvent, reason?: string) => void;
};

export type TProviderProps<T> = {
  children: ReactNode;
  defaultValue: T;
};

export type TSession = {
  user: {
    name: string;
    email: string;
  };
  expires: string;
  jwt: string;
  id: number;
};

export type TCartProduct = {
  storeId: string;
  id: number;
  price: number;
  size: { id: number; size: string };
  quantity: number;
  name: string;
  imageUrl: string;
};

export type TCreateOrderForm = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  city: string;
  street: string;
  buildingNumber: string;
  apartmentNumber: string;
  postalCode: string;
  note: string;
};

export type TProductsQuery = {
  categories: string;
  sort: string;
};
export type PzkoszSettings = {
  leagueId: string | number;
  seasonId: string | number;
  teamId: string | number;
  stages: Array<{ id: number; ligi_id: number; poziomy_id: number; sezony_id: number; nazwa: string }>;
};
