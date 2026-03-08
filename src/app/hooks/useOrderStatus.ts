"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useTwapServer, type TwapOrderStatus } from "./useTwapServer";

/* ─────────────────────────────────────────
   useOrderStatus — polls a single order
   ───────────────────────────────────────── */

export function useOrderStatus(
  orderId: string | null,
  pollIntervalMs: number = 10_000,
) {
  const { getOrderStatus } = useTwapServer();
  const [status, setStatus] = useState<TwapOrderStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const poll = useCallback(async () => {
    if (!orderId) return;
    try {
      const data = await getOrderStatus(orderId);
      setStatus(data);
      setError(null);

      // Stop polling when terminal
      if (
        data.status === "completed" ||
        data.status === "cancelled"
      ) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Poll failed");
    }
  }, [orderId, getOrderStatus]);

  // Start/stop polling when orderId changes
  useEffect(() => {
    if (!orderId) {
      setStatus(null);
      return;
    }

    // Initial fetch
    poll();

    // Set up interval
    intervalRef.current = setInterval(poll, pollIntervalMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [orderId, pollIntervalMs, poll]);

  const refresh = useCallback(() => {
    poll();
  }, [poll]);

  return { status, error, refresh };
}
