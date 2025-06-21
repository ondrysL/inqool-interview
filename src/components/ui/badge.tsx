import { cn } from "@/lib/utils";

export const Badge = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return <div className={cn("w-fit px-2 rounded-md", className)}>{text}</div>;
};
