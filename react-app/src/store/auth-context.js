import React, { useCallback, useState } from "react";

const AuthContext = React.createContext({
  token: false,
  tokenHandler: (token) => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(false);
  const tokenHandler = useCallback((data) => {
    if (data) {
      localStorage.setItem('token', data)
    } else {
      localStorage.removeItem('token')
    }
    setToken(data);
  }, []);

  return (
    <AuthContext.Provider value={{ token, tokenHandler }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
