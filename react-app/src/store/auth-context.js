import React, { useCallback, useState } from "react";

const AuthContext = React.createContext({
  token: false,
  tokenHandler: (token) => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(false);
  const tokenHandler = useCallback((token) => {
    setToken(token);
  }, []);

  return (
    <AuthContext.Provider value={{ token, tokenHandler }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
