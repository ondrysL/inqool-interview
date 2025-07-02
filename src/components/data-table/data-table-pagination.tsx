import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import type { Table } from "@tanstack/react-table";
import { useRouter, useSearch } from "@tanstack/react-router";

export function DataTablePagination<T>({ table }: { table: Table<T> }) {
  const router = useRouter();
  const search = useSearch({ strict: false });

  const pageCount = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex;

  const goToPage = (index: number) => {
    table.setPageIndex(index);
    router.navigate({
      search: {
        ...search,
        page: index,
        size: table.getState().pagination.pageSize,
      },
    });
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (pageIndex > 0) goToPage(pageIndex - 1);
            }}
          />
        </PaginationItem>

        {Array.from({ length: pageCount }).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === pageIndex}
              onClick={(e) => {
                e.preventDefault();
                goToPage(i);
              }}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (pageIndex < pageCount - 1) goToPage(pageIndex + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
