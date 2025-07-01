import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ToastMessages = {
  pending: string;
  success: string;
  error: string;
};

export function wrapWithToast<Args extends unknown[], R>(
  fn: (...args: Args) => Promise<R>,
  messages: ToastMessages,
): (...args: Args) => Promise<R> {
  return (...args: Args) => {
    const toastHandle = toast.promise(fn(...args), {
      loading: messages.pending,
      success: messages.success,
      error: messages.error,
    });
    return toastHandle.unwrap();
  };
}
