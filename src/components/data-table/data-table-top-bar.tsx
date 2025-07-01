export const DataTableTopBar = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-between py-4">
      <h1 className="text-2xl font-semibold">{title}</h1>
    </div>
  );
};
