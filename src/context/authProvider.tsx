import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import type { PropsWithChildren } from "react";
import { users } from "../mocks/userMock";
import { Link, redirect, useNavigate } from "react-router";

export interface User {
  email: string;
  PIN: number;
}

type AuthProps = "authenticated" | "checking" | "not-authenticated";

interface userContextProps {
  user: User | null;
  sessionState: boolean;
  authStatus: AuthProps;
  login: (email: string, PIN: number) => void;
  logout: () => void;
}

const UserContext = createContext({} as userContextProps);

export function useAuth() {
  return useContext(UserContext);
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [sessionState, setSessionState] = useState(false);
  const [authStatus, setAuthStatus] = useState<AuthProps>("not-authenticated");

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleLogin = (email: string, PIN: number) => {
    console.log(email, PIN);

    const validUser = users.find((user) => user.email === email);
    if (validUser?.PIN === PIN) {
      console.log("validado");
      setUser(validUser);
      setSessionState(true);
      setAuthStatus("authenticated");
    } else {
      console.log("no validado");
    }
  };
  const handleLogout = () => {
    setUser(null);
    setSessionState(false);
    setAuthStatus("not-authenticated");
  };

  return (
    <UserContext
      value={{
        user,
        sessionState,
        authStatus,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </UserContext>
  );
};
