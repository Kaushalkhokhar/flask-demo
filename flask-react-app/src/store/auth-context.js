import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  tokenHandler: (token) => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");
  const setTokenHandler = (token) => {
    console.log(token);
    console.log('running');
    setToken(token);
  };
  return (
    <AuthContext.Provider value={{ token:token, tokenHandler:setTokenHandler }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
