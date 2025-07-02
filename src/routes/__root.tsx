import { Navbar } from "@/components/layout/navbar";
import { Toaster } from "@/components/ui/sonner";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <main className="flex h-screen">
      <div className="bg-background w-full rounded-lg overflow-y-scroll relative px-8 flex flex-col gap-y-6 md:px-24">
        <Navbar />
        <Outlet />
      </div>
      <TanStackRouterDevtools />
      <Toaster position="top-center" />
    </main>
  ),
});
