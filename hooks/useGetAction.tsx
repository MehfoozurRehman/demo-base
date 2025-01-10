"use client";

import useSWR, { SWRConfiguration } from "swr";

import { use } from "react";

export default function useGetAction<T>({
  key,
  action,
  options,
}: {
  key: string;
  action: () => Promise<T>;
  options?: SWRConfiguration & { initialDataPromise?: Promise<any> };
}) {
  const { initialDataPromise, ...restOptions } = options || {};

  const initialData = initialDataPromise ? use(initialDataPromise) : undefined;

  const swrResponse = useSWR<T>(key, action, {
    ...restOptions,
    keepPreviousData: true,
  });

  const { data, isLoading, isValidating, ...rest } = swrResponse;

  return {
    data: (data !== undefined ? data : initialData) as T,
    isLoading: isLoading && !initialData,
    isValidating: isValidating && !initialData,
    ...rest,
  };
}
