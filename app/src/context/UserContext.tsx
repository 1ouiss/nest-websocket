import { createContext, useState } from "react";

const UserContext = createContext({
  user: null,
  setUser: (user) => {},
});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
