import { Database } from "lucide-react";

export const Sidebar = () => {
  return (
    <aside className="bg-primary w-1/6 text-white px-6 py-6">
      <div className="flex items-center gap-x-2">
        <Database className="size-4 " />
        <h1 className="text-xl font-semibold text-white">Interview</h1>
      </div>
    </aside>
  );
};
