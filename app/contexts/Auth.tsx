import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { auth } from "../utils/auth";

type AuthProps = {
  currentUser?: User | null;
  loading: boolean;
  error?: Error;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthProps>({
  loading: true,
  signIn: async (email, password) => {},
  signUp: async (email, password) => {},
  signOut: async () => {},
});

function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [currentUser, setCurrentUser] = useState<User | null>();

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      throw e;
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      throw e;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await auth.signOut();
    } catch (e) {
      throw e;
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setLoading(false);
      setCurrentUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, loading, error, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
