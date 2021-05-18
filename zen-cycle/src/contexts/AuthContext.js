import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signup(email, password) {
    const userCredentials = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    await userCredentials.sendEmailVerification();
    return userCredentials;
  }

  async function login(email, password) {
    const userCredentials = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    return userCredentials;
  }

  function verifyEmail() {
    currentUser.sendEmailVerification();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    verifyEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
