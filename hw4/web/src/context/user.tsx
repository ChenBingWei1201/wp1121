"use client";

import { createContext, useState, useEffect, useContext } from "react";

const LOCALSTORAGE_KEY = "save-me";
const saveMe = localStorage.getItem(LOCALSTORAGE_KEY);

export type UserContext = {
  me: string;
  setMe: (me: string) => void;
  signedIn: boolean;
  setSignedIn: (s: boolean) => void;
};

export const UserContext = createContext<UserContext>({
  me: "",
  setMe: () => {},
  signedIn: false,
  setSignedIn: () => {},
});

type Props = {
  children: React.ReactNode;
};

export function UserProvider({ children }: Props) {
  const [me, setMe] = useState<string>(saveMe || "");
  const [signedIn, setSignedIn] = useState<boolean>(false);

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [me, signedIn]);

  return (
    <UserContext.Provider value={{ me, setMe, signedIn, setSignedIn }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
