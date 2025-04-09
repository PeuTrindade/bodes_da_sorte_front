import { createContext, ReactNode, useContext, useState } from 'react';

interface IAuthContext {
    isAdmin: boolean
    setIsAdmin: (isAdmin: boolean) => void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

AuthContext.displayName = 'AuthContext';

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
   const [isAdmin, setIsAdmin] = useState(false);

   return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin }}>{children}</AuthContext.Provider>
   );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
