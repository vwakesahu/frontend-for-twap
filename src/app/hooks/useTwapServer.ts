"use client";

import { useState, useCallback } from "react";
import { TWAP_SERVER_URL } from "../lib/constants";

/* ─────────────────────────────────────────
   Types matching the TWAP server responses
   ───────────────────────────────────────── */

export type TwapOrderStatus = {
  success: boolean;
  orderId: string;
  status: "active" | "paused" | "completed" | "cancelled";
  tranchesFilled: number;
  totalTranches: number;
  amountSpent: string;
  intentIds: string[];
  sourceChainId: number;
};

export type TwapOrderListItem = {
  id: string;
  user: string;
  assetIn: string;
  assetOut: string;
  chainIn: string;
  chainOut: string;
  sourceChainId: number;
  destChainId: number;
  totalAmountIn: string;
  amountPerPeriod: string;
  period: number;
  startTime: number;
  endTime: number;
  status: string;
  tranchesFilled: number;
  totalTranches: number;
  amountSpent: string;
  intentIds: string[];
  createdAt: string;
};

/* ─────────────────────────────────────────
   useTwapServer — talks to localhost:3002
   ───────────────────────────────────────── */

export function useTwapServer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => setError(null), []);

  /** POST /twap/health */
  const health = useCallback(async () => {
    const res = await fetch(`${TWAP_SERVER_URL}/twap/health`, { method: "POST" });
    return res.json() as Promise<{ status: string; service: string }>;
  }, []);

  /** POST /twap/ecies-pubkey */
  const getEciesPubkey = useCallback(async (): Promise<string> => {
    const res = await fetch(`${TWAP_SERVER_URL}/twap/ecies-pubkey`, { method: "POST" });
    const data = await res.json();
    if (!data.success) throw new Error("Failed to get ECIES pubkey");
    return data.publicKey as string;
  }, []);

  /** POST /twap/address — TEE wallet address */
  const getTeeAddress = useCallback(async (): Promise<string> => {
    const res = await fetch(`${TWAP_SERVER_URL}/twap/address`, { method: "POST" });
    const data = await res.json();
    if (!data.success) throw new Error("Failed to get TEE address");
    return data.address as string;
  }, []);

  /** POST /twap/create — submit encrypted order with signature */
  const createOrder = useCallback(
    async (encryptedDataHex: string, signature: string, message: string) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${TWAP_SERVER_URL}/twap/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ encryptedData: encryptedDataHex, signature, message }),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error || "Order creation failed");
        return {
          orderId: data.orderId as string,
          status: data.status as string,
        };
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        setError(msg);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  /** GET /twap/status/:orderId */
  const getOrderStatus = useCallback(
    async (orderId: string): Promise<TwapOrderStatus> => {
      const res = await fetch(`${TWAP_SERVER_URL}/twap/status/${orderId}`);
      const data = await res.json();
      return data as TwapOrderStatus;
    },
    [],
  );

  /** GET /twap/orders/:userAddress */
  const getUserOrders = useCallback(
    async (userAddress: string): Promise<TwapOrderListItem[]> => {
      const res = await fetch(
        `${TWAP_SERVER_URL}/twap/orders/${userAddress}`,
      );
      const data = await res.json();
      if (!data.success) return [];
      return (data.orders ?? []) as TwapOrderListItem[];
    },
    [],
  );

  /** POST /twap/cancel/:orderId */
  const cancelOrder = useCallback(async (orderId: string) => {
    const res = await fetch(`${TWAP_SERVER_URL}/twap/cancel/${orderId}`, {
      method: "POST",
    });
    return res.json();
  }, []);

  return {
    loading,
    error,
    reset,
    health,
    getEciesPubkey,
    getTeeAddress,
    createOrder,
    getOrderStatus,
    getUserOrders,
    cancelOrder,
  };
}
