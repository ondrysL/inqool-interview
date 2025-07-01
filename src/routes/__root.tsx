import { Toaster } from "@/components/ui/sonner";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <main className="flex h-screen bg-primary">
      <div className="bg-white w-full m-6 rounded-lg overflow-y-scroll relative">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
      <Toaster position="top-center" />
    </main>
  ),
});
