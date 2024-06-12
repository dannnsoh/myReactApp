import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userid, setUserid] = useState([]);
  const [om_userid, om_setUserid] = useState([])
  const [om_token, om_setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken, userid, setUserid, om_userid, om_setUserid, om_token, om_setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

