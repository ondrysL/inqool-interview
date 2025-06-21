import { Sidebar } from "@/components/layout/Sidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <main className="flex h-screen bg-primary">
      <Sidebar />
      <div className="bg-white w-full m-6 rounded-lg overflow-y-scroll">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </main>
  ),
});
