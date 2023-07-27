import { createContext, useEffect, useState } from "react";
import firebase from "./firebase";

export const AuthContext = createContext();

const useGetUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return user;
};

const useCreateUser = () => {
  const [state, setState] = useState({ error: "", message: "", status: "" });

  const newUser = async (email, password) => {
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (res) {
        setState({
          ...state,
          error: "",
          message: "Usuário criado com sucesso",
          status: "SUCCESS",
        });
      }
    } catch (err) {
      setState({ ...state, error: err.message, message: "", status: "ERROR" });
    }
  };

  return [state, newUser];
};

const useLoginUser = () => {
  const [state, setState] = useState({ error: "", message: "", status: "" });

  const login = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setState({ ...state, error: "", status: "SUCCESS" });
    } catch (err) {
      setState({ ...state, error: err.message, status: "ERROR" });
    }
  };

  return [state, login];
};

const signout = () => {
  firebase.auth().signOut();
};

export const AuthProvider = ({ children }) => {
  const user = useGetUser();
  const [createUserState, createUser] = useCreateUser();
  const [accessUserState, accessUser] = useLoginUser();
  return (
    <AuthContext.Provider
      value={{
        user,
        createUser: { createUserState, createUser },
        accessUser: { accessUserState, accessUser },
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
