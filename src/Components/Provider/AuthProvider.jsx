import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../../Firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    // setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    // setLoading(true);
    return signOut(auth);
  };

  const signIn = (email, password) => {
    // setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signInWithGoogle = (provider) => {
    // setLoading(true);
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
  
    const unSubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      // setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }
  , []);

  const AuthInfo = {
    user,
    // loading,
    createUser,
    logOut,
    signIn,
    signInWithGoogle,
  };
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
