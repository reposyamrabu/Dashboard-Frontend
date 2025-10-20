import { AxiosError } from 'axios';
import { toast } from 'sonner';

let loadingToastId: string | number | null = null;

export function createMutationHandlers(options: {
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (response: unknown) => void;
  onError?: (error: unknown) => void;
}) {
  return {
    onMutate: () => {
      // Dismiss previous loading toast if exists
      if (loadingToastId) {
        toast.dismiss(loadingToastId);
        loadingToastId = null;
      }

      // Show loading toast
      loadingToastId = toast.loading(options.loadingMessage || 'Memproses...');
    },
    onSuccess: (response: unknown) => {
      // Dismiss loading toast
      if (loadingToastId) {
        toast.dismiss(loadingToastId);
        loadingToastId = null;
      }

      // Show success toast
      const message = extractSuccessMessage(
        response,
        options.successMessage || 'Operasi berhasil!'
      );
      toast.success(message);

      // Call custom onSuccess if provided
      options.onSuccess?.(response);
    },
    onError: (error: unknown) => {
      // Dismiss loading toast
      if (loadingToastId) {
        toast.dismiss(loadingToastId);
        loadingToastId = null;
      }

      // Show error toast
      const message = extractErrorMessage(
        error,
        options.errorMessage || 'Terjadi kesalahan'
      );
      toast.error(message);

      // Call custom onError if provided
      options.onError?.(error);
      console.error('Mutation error:', error);
    },
  };
}

export interface ApiResponse {
  code?: number;
  status?: string;
  messages?: string;
  data?: {
    message?: string;
    data?: {
      message?: string;
    };
  };
}

export interface ApiErrorResponse {
  data?: {
    message?: string;
    messages?: string;
    data?: {
      message?: string;
    };
  };
  message?: string;
  messages?: string;
  status?: number;
}

export function extractSuccessMessage(
  response: unknown,
  fallbackMessage = 'Operasi berhasil!'
): string {
  const responseData = response as ApiResponse;
  return (
    responseData?.data?.data?.message ||
    responseData?.data?.message ||
    responseData?.messages ||
    fallbackMessage
  );
}

export function extractErrorMessage(
  error: unknown,
  fallbackMessage = 'Terjadi kesalahan'
): string {
  if (error instanceof AxiosError) {
    const errorData = error.response?.data as ApiErrorResponse;
    return (
      errorData?.data?.message ||
      errorData?.messages ||
      errorData?.message ||
      fallbackMessage
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
}

export function showSuccessToast(
  response: unknown,
  fallbackMessage = 'Operasi berhasil!'
) {
  const message = extractSuccessMessage(response, fallbackMessage);
  toast.success(message);
}

export function showErrorToast(
  error: unknown,
  fallbackMessage = 'Terjadi kesalahan',
  options?: { includeStatus?: boolean }
) {
  const message = extractErrorMessage(error, fallbackMessage);
  const status = error instanceof AxiosError ? error.response?.status : null;
  const fullMessage =
    options?.includeStatus && status ? `${message} (${status})` : message;
  toast.error(fullMessage);
}
