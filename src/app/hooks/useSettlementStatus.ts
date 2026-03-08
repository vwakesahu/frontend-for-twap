"use client";

import { useState, useCallback } from "react";
import { usePublicClient } from "wagmi";
import { createPublicClient, http } from "viem";
import { BRIDGE_ABI, BRIDGES, baseSepolia, robinhoodTestnet } from "../lib/constants";

/* ─────────────────────────────────────────
   useSettlementStatus — check if intent is
   settled on destination chain via bridge
   ───────────────────────────────────────── */

const CHAIN_MAP = {
  84532: { chain: baseSepolia, bridge: BRIDGES.base },
  46630: { chain: robinhoodTestnet, bridge: BRIDGES.robinhood },
} as const;

export type IntentInfo = {
  user: string;
  tokenA: string;
  amountA: bigint;
  tokenB: string;
  amountB: bigint;
  destinationChainId: bigint;
  recipients: string[];
  amounts: bigint[];
  status: number;
};

export function useSettlementStatus() {
  const defaultClient = usePublicClient();
  const [loading, setLoading] = useState(false);

  /** Get a viem client for a specific chain */
  const getClient = useCallback(
    (chainId: number) => {
      const entry = CHAIN_MAP[chainId as keyof typeof CHAIN_MAP];
      if (!entry) throw new Error(`Unknown chain ${chainId}`);
      // If the default client matches the chain, reuse it
      if (defaultClient?.chain?.id === chainId) return defaultClient;
      // Otherwise create a one-off client for that chain
      return createPublicClient({
        chain: entry.chain,
        transport: http(),
      });
    },
    [defaultClient],
  );

  /** Check if an intent is solved on the destination chain */
  const isIntentSolved = useCallback(
    async (
      destChainId: number,
      sourceChainId: number,
      intentId: bigint,
    ): Promise<boolean> => {
      const entry = CHAIN_MAP[destChainId as keyof typeof CHAIN_MAP];
      if (!entry) throw new Error(`Unknown dest chain ${destChainId}`);
      const client = getClient(destChainId);
      const result = await client.readContract({
        address: entry.bridge as `0x${string}`,
        abi: BRIDGE_ABI,
        functionName: "isIntentSolvedOnChain2",
        args: [BigInt(sourceChainId), intentId],
      });
      return result as boolean;
    },
    [getClient],
  );

  /** Get the latest intent ID on a chain's bridge */
  const getLatestIntentId = useCallback(
    async (chainId: number): Promise<bigint> => {
      const entry = CHAIN_MAP[chainId as keyof typeof CHAIN_MAP];
      if (!entry) throw new Error(`Unknown chain ${chainId}`);
      const client = getClient(chainId);
      const result = await client.readContract({
        address: entry.bridge as `0x${string}`,
        abi: BRIDGE_ABI,
        functionName: "getLatestIntentId",
      });
      return result as bigint;
    },
    [getClient],
  );

  /** Get intent details from a chain's bridge */
  const getIntent = useCallback(
    async (chainId: number, intentId: bigint): Promise<IntentInfo> => {
      const entry = CHAIN_MAP[chainId as keyof typeof CHAIN_MAP];
      if (!entry) throw new Error(`Unknown chain ${chainId}`);
      const client = getClient(chainId);
      const result = await client.readContract({
        address: entry.bridge as `0x${string}`,
        abi: BRIDGE_ABI,
        functionName: "getIntent",
        args: [intentId],
      });
      const r = result as unknown as {
        user: string;
        tokenA: string;
        amountA: bigint;
        tokenB: string;
        amountB: bigint;
        destinationChainId: bigint;
        recipients: string[];
        amounts: bigint[];
        status: number;
      };
      return r;
    },
    [getClient],
  );

  /** Check settlement for multiple intents (batch) */
  const checkBatchSettlement = useCallback(
    async (
      destChainId: number,
      sourceChainId: number,
      intentIds: bigint[],
    ): Promise<{ intentId: bigint; solved: boolean }[]> => {
      setLoading(true);
      try {
        const results = await Promise.all(
          intentIds.map(async (id) => ({
            intentId: id,
            solved: await isIntentSolved(destChainId, sourceChainId, id),
          })),
        );
        return results;
      } finally {
        setLoading(false);
      }
    },
    [isIntentSolved],
  );

  return {
    isIntentSolved,
    getLatestIntentId,
    getIntent,
    checkBatchSettlement,
    loading,
  };
}
