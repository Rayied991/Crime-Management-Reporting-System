import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (ManagerID, cookie) => {
    setUser({ ManagerID, cookie });

  };

  const checkUser = () => {
    console.log("user:  "+user.ManagerID)
    console.log("user:  "+user.cookie)
    if(user.ManagerID!=null && user.cookie!=null) {
      return true;
    }
    else
    {
      return false;
    }

  };

  const logout = () => {

    doSignOut()
  };
  async function doSignOut() {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT + '/manager/signout/',
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true
        }
      );
      console.log(response)
        setUser(null);
        document.cookie = null;

        router.push('/Manager/Signin');
      

    } catch (error) {
      console.error('error failed: ', error);
    }
  }
  return (
    <AuthContext.Provider value={{ user, login, logout,checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);