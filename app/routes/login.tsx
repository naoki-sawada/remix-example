import { FirebaseError } from "@firebase/util";
import React, { useContext, useState } from "react";
import type { MetaFunction } from "remix";
import { AuthContext } from "../contexts/Auth";

export const meta: MetaFunction = () => {
  return {
    title: "Login",
    description: "Login Page!",
  };
};

export default function Login() {
  const { signIn } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (e) {
      setLoading(false);
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleChangeEmail}
          />
        </div>
        <div>
          <label htmlFor="email">Password: </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handleChangePassword}
          />
        </div>
        <input type="submit" value="Login" disabled={loading} />
      </form>
    </div>
  );
}
