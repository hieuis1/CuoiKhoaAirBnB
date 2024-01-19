import { createContext, useContext, useState } from "react";
import { CURRENT_USER } from "../../constants";

// B1: createContext
const UserContext = createContext();

// B2: provider
const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER));
    return user || null;
  });

  const handleSignin = (user) => {
    setCurrentUser(user);
    localStorage.setItem(CURRENT_USER, JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.clear(CURRENT_USER);
  };

  const [infoUser, setInfoUser] = useState(null);

  const setValuesData = (data) => {
    setInfoUser(data);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        handleSignin,
        handleLogout,
        infoUser,
        setValuesData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook useAuth()
const useAuth = () => {
  // B3: Consumer
  const value = useContext(UserContext);
  return value;
};
// Custom hook useHistoryTicket()
const useHistoryTicket = () => {
  const data = useContext(UserContext);
  return data;
};

export { UserProvider, useAuth, useHistoryTicket };

// <Provider> <App/> </Provider>
