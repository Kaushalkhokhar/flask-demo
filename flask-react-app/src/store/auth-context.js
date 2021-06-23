import React, { useState } from "react";

const AuthContext = React.createContext({
  token: false,
  tokenHandler: (token) => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(false);
  const setTokenHandler = (token) => {
    setToken(token);
  };
  return (
    <AuthContext.Provider value={{ token:token, tokenHandler:setTokenHandler }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
