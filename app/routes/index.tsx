import type { MetaFunction } from "remix";
import { Link } from "remix";

export const meta: MetaFunction = () => {
  return {
    title: "LP",
    description: "Landing Page!",
  };
};

export default function Index() {
  return (
    <div>
      <h1>LP</h1>
      <Link to="login">Login</Link>
    </div>
  );
}
