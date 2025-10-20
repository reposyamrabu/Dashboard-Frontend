import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type { ApiError } from '../types/api';

// Custom hook for handling mutations with common error handling
export const useApiMutation = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: AxiosError<ApiError>, variables: TVariables) => void;
    invalidateQueries?: string[][];
  }
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      // Invalidate specified queries
      if (options?.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey });
        });
      }

      options?.onSuccess?.(data, variables);
    },
    onError: (error: AxiosError<ApiError>, variables) => {
      // Global error handling can be added here
      console.error(
        'API Mutation Error:',
        error.response?.data?.message || error.message
      );

      options?.onError?.(error, variables);
    },
  });
};

// Utility function to extract error message from axios error
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.message || error.message || 'An error occurred'
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred';
};
