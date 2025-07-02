import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <Link to="/users" search={{ page: 0, size: 15 }}>Users</Link>
      <Link to="/animals" search={{ page: 0, size: 15 }}>Animals</Link>
    </div>
  );
}
