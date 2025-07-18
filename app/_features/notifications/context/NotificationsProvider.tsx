import { createContext, useContext } from "react";
import { notification } from "../types/NotificationType";

interface NotificationsProviderProps {
  value: initialStateType;
  children: React.ReactNode;
}

interface initialStateType {
  open: boolean;
  isFetching: boolean;
  notifications: notification[];
  setNotifications: React.Dispatch<React.SetStateAction<notification[]>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  error: any;
  isError: boolean;
  hasMore: boolean;
}

const intialState: initialStateType = {
  open: false,
  isFetching: false,
  notifications: [],
  setNotifications: () => {},
  setPage: () => {},
  error: null,
  isError: false,
  hasMore: true,
};

const notificationsContext = createContext<initialStateType>(intialState);

function NotificationsProvider({
  children,
  value,
}: NotificationsProviderProps) {
  return (
    <notificationsContext.Provider value={value}>
      {children}
    </notificationsContext.Provider>
  );
}

export function useNotificationsContext() {
  const context = useContext(notificationsContext);
  if (!context) {
    throw new Error(
      "useNotificationsContext must be used within a notifications provider",
    );
  }
  return context;
}

export default NotificationsProvider;
