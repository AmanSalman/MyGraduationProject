import { createContext, useEffect, useState } from "react";
import Loader from "../Loader/Loader";

export let UserContext = createContext();


export default function UserContextProvider({ children }) {
  const [token,setToken] = useState(localStorage.getItem("userToken") || null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    setToken(localStorage.getItem("userToken"));
    setIsLoading(false);
  },[token]);

  
  return (
    <UserContext.Provider value={{token,setToken,isLoading,setIsLoading}}>
      {isLoading ? <Loader /> : children}
    </UserContext.Provider>
  );
}