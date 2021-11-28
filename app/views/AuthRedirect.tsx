import { useContext } from "react";
import { Navigate } from "react-router";
import { useLocation } from "remix";
import Loading from "~/components/Loading";
import { AuthContext } from "~/contexts/Auth";

const beforeSignInPaths = ["/", "/login"];

export default function AuthRedirect({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  if (currentUser === undefined) return <Loading />;

  const isBeforeSignInPath = beforeSignInPaths.find(
    (path) => path === location.pathname
  );

  if (isBeforeSignInPath) {
    return currentUser ? <Navigate to="/home" replace /> : <>{children}</>;
  }
  return !currentUser ? <Navigate to="/login" replace /> : <>{children}</>;
}
