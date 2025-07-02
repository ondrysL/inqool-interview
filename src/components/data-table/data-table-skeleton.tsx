import { Skeleton } from "@/components/ui/skeleton";

export function DataTableSkeleton() {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-10 w-64 rounded" />
        <Skeleton className="h-10 w-20 rounded" />
        <Skeleton className="h-10 w-24 rounded" />
        <div className="ml-auto">
          <Skeleton className="h-10 w-44 rounded" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              {["", "Id", "Name", "Banned", "Gender", "Actions"].map((_, i) => (
                <th key={i} className="px-4 py-2 text-left">
                  <Skeleton className="h-4 w-16 rounded" />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 8 }).map((_, rowIdx) => (
              <tr key={rowIdx} className="animate-pulse">
                <td className="px-4 py-2">
                  <Skeleton className="h-5 w-5 rounded" />
                </td>
                <td className="px-4 py-2">
                  <Skeleton className="h-4 w-32 rounded" />
                </td>
                <td className="px-4 py-2">
                  <Skeleton className="h-4 w-48 rounded" />
                </td>
                <td className="px-4 py-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </td>
                <td className="px-4 py-2">
                  <Skeleton className="h-4 w-16 rounded" />
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <Skeleton className="h-6 w-6 rounded" />
                  <Skeleton className="h-6 w-6 rounded" />
                  <Skeleton className="h-6 w-6 rounded" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center space-x-2">
        <Skeleton className="h-6 w-16 rounded" />
        <Skeleton className="h-6 w-8 rounded" />
        <Skeleton className="h-6 w-16 rounded" />
      </div>
    </div>
  );
}
