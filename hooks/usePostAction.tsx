"use client";

import { useActionState, useEffect, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

export type StatusType = "ok" | "error" | null;

interface UsePostActionProps<T, P> {
  action: (prevState: T, data: P) => Promise<T>;
  defaultState?: Omit<T, "status">;
  onSuccess?: (data: NonNullable<Awaited<T>>) => void;
  onError?: (data: NonNullable<Awaited<T>>) => void;
  goBack?: boolean;
  needConfirmation?: boolean;
}

export default function usePostAction<T, P>({
  action,
  defaultState,
  onSuccess = () => {},
  onError,
  goBack = false,
  needConfirmation = false,
}: UsePostActionProps<T, P>) {
  const pathname = usePathname();
  const router = useRouter();
  const [isTransitionPending, startTransition] = useTransition();
  const [data, actionFn, isPending] = useActionState(action, {
    ...(defaultState as T),
    status: null,
  } as Awaited<T & { status: StatusType }>);

  const actionCallback = async (data: P) => {
    if (needConfirmation) {
      const confirm = window.confirm("Are you sure you want to do this?");

      if (!confirm) return;
    }

    startTransition(() => actionFn(data));
  };

  useEffect(() => {
    if (data) {
      const { status, ...rest } = data as Awaited<T & { status: StatusType }>;
      if (status === "ok" && onSuccess) {
        startTransition(async () => {
          await onSuccess(rest as NonNullable<Awaited<T>>);
          if (goBack) {
            const newPath =
              pathname.split("/").length > 2
                ? pathname.split("/").slice(0, -1).join("/")
                : "/";
            await router.push(newPath);
            await router.refresh();
          }
        });
      } else if (status === "error" && onError) {
        startTransition(() => onError(rest as NonNullable<Awaited<T>>));
      }
    }
  }, [data]);

  const { status, ...restData } = (data || {}) as Awaited<
    T & { status: StatusType }
  >;

  return {
    data: restData,
    action: actionFn,
    actionCallback,
    isPending: isPending || isTransitionPending,
  };
}
