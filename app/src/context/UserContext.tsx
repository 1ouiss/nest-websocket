import { createContext, useState } from "react";

const UserContext = createContext({
  user: null,
  setUser: (user) => {},
  usersConnected: [],
  setUsersConnected: (users) => {},
});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [usersConnected, setUsersConnected] = useState([]);
  return (
    <UserContext.Provider
      value={{ user, setUser, usersConnected, setUsersConnected }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
