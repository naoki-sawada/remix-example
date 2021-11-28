import { Link } from "remix";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="home">Home</Link>
        </li>
        <li>
          <Link to="settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
}
