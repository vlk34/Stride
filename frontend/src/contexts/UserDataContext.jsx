import React, { createContext, useContext, useState } from "react";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [localUserData, setLocalUserData] = useState({
    name: "",
    role: "",
    description: "",
    about: "",
    experiences: [],
    education: [],
    skills: [],
    imageUrl: "",
    email: "",
  });

  return (
    <UserDataContext.Provider value={{ localUserData, setLocalUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
