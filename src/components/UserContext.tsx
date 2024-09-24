/* eslint-disable @typescript-eslint/no-explicit-any */
import {createContext,useState,useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/setup";


export const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>(null);


    useEffect(() => {
        // Listen to Firebase auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is logged in, update user state
            setUser(user);
          } else {
            // User is logged out, reset user state
            setUser(null);
          }
        });
    
        // Cleanup the listener when component unmounts
        return () => unsubscribe();
      }, []);

      return (
        <UserContext.Provider value={{ user, setUser }}>
          {children}
        </UserContext.Provider>
      );
    };