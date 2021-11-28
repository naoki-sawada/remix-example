import { useContext } from "react";
import { Outlet } from "remix";
import Loading from "~/components/Loading";
import { AuthContext } from "~/contexts/Auth";
import Nav from "./Nav";

export default function ({ children }: { children: React.ReactNode }) {
  const { signOut, currentUser } = useContext(AuthContext);
  if (currentUser === undefined) return <Loading />;
  return currentUser ? (
    <div>
      <header>
        <button onClick={signOut}>Logout</button>
      </header>
      <Nav />
      <main>
        <Outlet />
      </main>
    </div>
  ) : (
    <>{children}</>
  );
}
