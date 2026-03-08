"use client";

import { useState, useCallback } from "react";
import {
  useAccount,
  usePublicClient,
  useWalletClient,
} from "wagmi";
import { parseUnits } from "viem";
import { ERC20_ABI } from "../lib/constants";

/* ─────────────────────────────────────────
   useApproveToken — approve TEE to spend ERC20
   ───────────────────────────────────────── */

export function useApproveToken() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  /** Check current allowance */
  const checkAllowance = useCallback(
    async (
      tokenAddress: `0x${string}`,
      spender: `0x${string}`,
    ): Promise<bigint> => {
      if (!publicClient || !address) return 0n;
      const result = await publicClient.readContract({
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: "allowance",
        args: [address, spender],
      });
      return result as bigint;
    },
    [publicClient, address],
  );

  /** Check balance */
  const checkBalance = useCallback(
    async (tokenAddress: `0x${string}`): Promise<bigint> => {
      if (!publicClient || !address) return 0n;
      const result = await publicClient.readContract({
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: [address],
      });
      return result as bigint;
    },
    [publicClient, address],
  );

  /** Approve spender for amount */
  const approve = useCallback(
    async (
      tokenAddress: `0x${string}`,
      spender: `0x${string}`,
      amount: string,
      decimals: number = 6,
    ) => {
      if (!walletClient || !address || !publicClient) {
        throw new Error("Wallet not connected");
      }

      setLoading(true);
      setError(null);
      setTxHash(null);

      try {
        const amountWei = parseUnits(amount, decimals);

        // Check if already approved enough
        const currentAllowance = await checkAllowance(tokenAddress, spender);
        if (currentAllowance >= amountWei) {
          return { alreadyApproved: true, txHash: null };
        }

        const hash = await walletClient.writeContract({
          address: tokenAddress,
          abi: ERC20_ABI,
          functionName: "approve",
          args: [spender, amountWei],
        });

        setTxHash(hash);

        // Wait for confirmation
        const receipt = await publicClient.waitForTransactionReceipt({ hash });

        return {
          alreadyApproved: false,
          txHash: hash,
          receipt,
        };
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Approve failed";
        setError(msg);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [walletClient, address, publicClient, checkAllowance],
  );

  return {
    approve,
    checkAllowance,
    checkBalance,
    loading,
    error,
    txHash,
  };
}
