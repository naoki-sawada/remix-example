import type { MetaFunction } from "remix";

export const meta: MetaFunction = () => {
  return {
    title: "Home",
    description: "Welcome!",
  };
};

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to home!</p>
    </div>
  );
}
