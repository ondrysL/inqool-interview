import { Link } from "@tanstack/react-router";
import { Building2, Menu, Panda, User, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  return (
    <>
      {isSidebarVisible && (
        <aside className="absolute bg-primary-foreground right-0 top-0 h-screen z-50 border-l-2 border-l-border px-8 py-4 md:hidden">
          <button
            className="flex justify-end w-full cursor-pointer"
            onClick={() => setIsSidebarVisible(false)}
          >
            <X></X>
          </button>
          <div className="flex flex-col gap-y-4">
            <Link
              to="/users"
              className="flex gap-2 items-center"
              activeProps={{ className: "underline underline-offset-5" }}
            >
              <User className="size-5" />
              <span>User table</span>
            </Link>
            <Link
              to="/animals"
              className="flex gap-2 items-center"
              activeProps={{ className: "underline underline-offset-5" }}
            >
              <Panda className="size-5" />
              <span>Animal table</span>
            </Link>
          </div>
        </aside>
      )}
      <nav className="flex justify-between items-center border-b-border border-b-2 py-2 px-6">
        <div className="flex gap-2 items-center">
          <Building2 className="size-4" />
          <span className="text-sm">InQool Interview</span>
        </div>

        <button
          className="md:hidden cursor-pointer"
          onClick={() => setIsSidebarVisible(true)}
        >
          <Menu />
        </button>

        <div className="gap-4 hidden md:flex">
          <Link
            to="/users"
            className="flex gap-2 items-center"
            activeProps={{ className: "underline underline-offset-5" }}
          >
            <User className="size-4" />
            <span>User table</span>
          </Link>
          <Link
            to="/animals"
            className="flex gap-2 items-center"
            activeProps={{ className: "underline underline-offset-5" }}
          >
            <Panda className="size-4" />
            <span>Animal table</span>
          </Link>
        </div>
      </nav>
    </>
  );
};
