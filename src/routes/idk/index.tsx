import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/idk/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = new URL("https://inqool-interview-api.vercel.app/api/users");
      url.searchParams.set("name", name);

      const res = await fetch(url.toString());
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">User Search</h1>
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="border p-2 rounded shadow-sm">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </li>
        ))}
      </ul>

      {!loading && users.length === 0 && <p>No users found.</p>}
    </div>
  );
}
