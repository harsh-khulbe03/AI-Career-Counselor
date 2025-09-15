"use client";

import { trpc } from "@/lib/trpc/client";

export default function Home() {
  const { data: users, isLoading } = trpc.users.all.useQuery();
  if (isLoading) return <div>Loading...</div>;

  return (
    <main>
      <h1>Users</h1>
      <ul>
        {users?.json?.map((u) => (
          <li key={u.id}>{u.email}</li>
        ))}
      </ul>
    </main>
  );
}
