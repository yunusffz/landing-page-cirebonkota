'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes
            retry: (failureCount: number, error: unknown) => {
              // Don't retry on 4xx errors (client errors)
              const status = (
                error as unknown as { response?: { status: number } }
              )?.response?.status;
              if (typeof status === 'number' && status >= 400 && status < 500) {
                return false;
              }
              // Retry up to 3 times for other errors
              return failureCount < 3;
            },
          },
        },
      })
  );

  // Set up global error handlers using event listeners
  useEffect(() => {
    const unsubscribeQueries = queryClient.getQueryCache().subscribe(event => {
      // Only handle 'updated' events where the query has an error
      if (
        event.type === 'updated' &&
        'query' in event &&
        event.query.state.error
      ) {
        const error = event.query.state.error;
        const message =
          error?.response?.data?.message ||
          error?.message ||
          'An error occurred while fetching data';
        if (!error || error.response?.status !== 401) {
          toast.error(message);
        }
      }
    });

    const unsubscribeMutations = queryClient
      .getMutationCache()
      .subscribe(event => {
        // Only handle 'updated' events where the mutation has an error
        if (
          event.type === 'updated' &&
          'mutation' in event &&
          event.mutation.state.error
        ) {
          const error = event.mutation.state.error;
          const message =
            error?.response?.data?.message ||
            error?.message ||
            'An error occurred while saving data';
          if (!error || error.response?.status !== 401) {
            toast.error(message);
          }
        }
      });

    return () => {
      unsubscribeQueries();
      unsubscribeMutations();
    };
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
