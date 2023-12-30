import { createContext, useState, useCallback } from "react";
import { Magic } from "magic-sdk";
import { env } from "../env";
import { useLazyQuery } from "@apollo/client";
import { ALL_USERS_QUERY } from "../graphql";
import type { User } from "../../../shared/shared_types";

export type UserContextType = {
  user: User | null;
  fetchUser: () => Promise<void>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  fetchUser: async () => {},
});

type Props = {
  children: React.ReactNode;
};

export function UserProvider({ children }: Props) {
  const magic = new Magic(env.MAGIC_PUBLIC_API_KEY);
  const [getUsers] = useLazyQuery(ALL_USERS_QUERY);
  const [user, setUser] = useState<User | null>(null);
  const fetchUser = useCallback(async () => {
    const info = await magic.user.getInfo();
    const email = info.email;
    const { data } = await getUsers();
    if (!data?.AllUsers) {
      return;
    }
    const [findUser] = data.AllUsers.filter((e) => e?.password === email);
    if (findUser) {
      setUser({
        id: findUser.id,
        name: findUser.name,
        password: findUser.password,
        studentId: findUser.studentID,
        photoLink: findUser.photoLink,
        // introduction: findUser.introduction,
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}
