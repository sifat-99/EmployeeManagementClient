import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../../Firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic()

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (name, photoURL) => {
    setLoading(true);
    return updateProfile(auth.currentUser, { displayName: name, photoURL });
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signInWithGoogle = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        console.log(currentUser);
        const userInfo = {email: currentUser.email}
        axiosPublic.post('/jwt',userInfo)
        .then(res => {
          console.log(res.data)
          if(res.data.token)
          {
            localStorage.setItem('token', res.data.token)
          }
        })
      }
      else
      {
        localStorage.removeItem('token');
      }

    });
    return () => {
      unSubscribe();
    };
  }, [axiosPublic]);

  
  const AuthInfo = {
    user,
    loading,
    setLoading,
    createUser,
    logOut,
    signIn,
    signInWithGoogle,
    updateUser,
  };
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
