import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // ৫ মিনিট ক্যাশে রাখবে
      refetchOnWindowFocus: false,
    },
  },
});
