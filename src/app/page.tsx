"use client";

import Image from "next/image";
import Link from "next/link";

/* ─── icons ─── */
function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ShieldLock() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <rect x="10" y="11" width="4" height="4" rx="1" />
      <path d="M11 11v-1a1 1 0 0 1 2 0v1" />
    </svg>
  );
}

function EyeOff() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    </svg>
  );
}

function Layers() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function Shuffle() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" />
      <polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" />
      <line x1="4" y1="4" x2="9" y2="9" />
    </svg>
  );
}

/* ─── features ─── */
const FEATURES = [
  {
    icon: <ShieldLock />,
    title: "Private TWAP Intents",
    desc: "Orders are ECIES-encrypted and submitted as intents. Your strategy is sealed inside a TEE — not even operators can see your order flow.",
  },
  {
    icon: <EyeOff />,
    title: "No On-Chain Footprint",
    desc: "There are no visible on-chain transactions tied to your strategy. Each slice executes through bridge intents that look identical to any other trade.",
  },
  {
    icon: <Shuffle />,
    title: "Untraceable Batching",
    desc: "TWAP slices are batched and shuffled with other intents. Even on-chain analysts can't distinguish your trades from normal retail activity.",
  },
  {
    icon: <Layers />,
    title: "Cross-Chain Execution",
    desc: "Deposit on Base, receive stock tokens on Robinhood chain. The TEE handles bridging, swapping, and settlement — all in the background.",
  },
];

/* ─── how it works steps ─── */
const STEPS = [
  {
    num: "01",
    title: "Encrypt your order",
    desc: "Your TWAP parameters are encrypted with the TEE's ECIES public key. The plaintext never leaves your browser.",
  },
  {
    num: "02",
    title: "TEE splits into slices",
    desc: "Inside the Trusted Execution Environment, your order is broken into retail-sized tranches spread over your chosen duration.",
  },
  {
    num: "03",
    title: "Intents execute privately",
    desc: "Each slice is submitted as a bridge intent — batched alongside other users. No individual trades are traceable back to you.",
  },
  {
    num: "04",
    title: "Settlement on destination",
    desc: "Stock tokens arrive on the destination chain. Settlement is verified on-chain, but your strategy remains invisible.",
  },
];

const STATS = [
  { value: "0", label: "On-Chain Traces" },
  { value: "100%", label: "TEE Encrypted" },
  { value: "ECIES", label: "Encryption" },
  { value: "2", label: "Chains Supported" },
];

/* ─────────────────────────────────────────
   Landing Page
   ───────────────────────────────────────── */

export default function Landing() {
  return (
    <div>
      {/* ═══════════ NAV ═══════════ */}
      <nav className="fixed top-0 inset-x-0 z-50 h-14 flex items-center justify-between px-5 sm:px-8 border-b border-line-subtle bg-bg/80 backdrop-blur-2xl">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Tachyon" width={22} height={22} className="invert opacity-80" />
          <span className="font-display text-[14px] font-semibold tracking-[-0.4px] text-text-1">
            tachyon
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a href="#how" className="text-[13px] text-text-3 hover:text-text-1 transition-colors hidden sm:inline">
            How it works
          </a>
          <a href="#privacy" className="text-[13px] text-text-3 hover:text-text-1 transition-colors hidden sm:inline">
            Privacy
          </a>
          <Link
            href="/app"
            className="h-[30px] px-3.5 text-[12px] font-semibold font-display bg-accent text-white rounded-md hover:bg-accent-hover transition-colors inline-flex items-center"
          >
            Launch App
          </Link>
        </div>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-dvh flex flex-col items-center justify-center px-5 overflow-hidden">
        {/* glow */}
        <div
          className="breathe absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 65%)",
            filter: "blur(50px)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-[740px] mx-auto text-center">
          {/* eyebrow */}
          <div className="enter enter-d1 inline-flex items-center gap-2 h-[26px] px-2.5 rounded-full border border-line-subtle bg-bg-elevated/50 text-[10px] font-mono uppercase tracking-[0.14em] text-text-3 mb-8 sm:mb-10">
            <span className="pulse-dot w-[5px] h-[5px] rounded-full bg-green" />
            Private TWAP execution
          </div>

          {/* headline */}
          <h1
            className="enter enter-d2 font-display leading-[0.9] text-text-1 mb-6"
            style={{
              fontSize: "clamp(40px, 8vw, 84px)",
              letterSpacing: "-0.045em",
              textWrap: "balance",
            }}
          >
            <span className="font-light">Whales in</span>
            <br />
            <span className="font-bold text-accent">disguise.</span>
          </h1>

          {/* sub */}
          <p
            className="enter enter-d3 text-text-2 text-[15px] sm:text-[18px] leading-[1.6] max-w-[520px] mx-auto mb-10 sm:mb-14"
            style={{ letterSpacing: "-0.02em" }}
          >
            Access RWAs and stocks across any chain, privately.
            <br className="hidden sm:inline" />
            Systematic TWAPs with private settlements, 
            <br className="hidden sm:inline" />
            no visible order flow, no traceable strategies.
          </p>

          {/* ctas */}
          <div className="enter enter-d4 flex items-center justify-center gap-3">
            <Link
              href="/app"
              className="h-11 px-6 text-[13px] font-semibold font-display bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors inline-flex items-center gap-2"
            >
              Launch App
              <ArrowRight />
            </Link>
            <a
              href="#how"
              className="h-11 px-6 text-[13px] font-medium font-display text-text-2 bg-bg-surface border border-line rounded-lg hover:bg-bg-hover hover:text-text-1 transition-all inline-flex items-center"
            >
              How it works
            </a>
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 enter enter-d4">
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-text-4">Scroll</span>
          <div className="w-px h-6 bg-gradient-to-b from-text-4 to-transparent" />
        </div>
      </section>

      {/* ═══════════ PRIVACY CALLOUT ═══════════ */}
      <section id="privacy" className="w-full max-w-[740px] mx-auto px-5 py-16 sm:py-24">
        <div className="bg-bg-elevated border border-line rounded-2xl p-6 sm:p-8">
          <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-text-4 mb-4">
            Why Tachyon
          </p>
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-[22px] sm:text-[28px] font-semibold text-text-1 leading-tight tracking-[-0.03em] mb-3">
                Your strategy is nobody&apos;s business.
              </h3>
              <p className="text-[14px] sm:text-[15px] text-text-2 leading-[1.7] max-w-[580px]">
                Large orders move markets. Front-runners watch mempools. Analysts trace wallet activity.
                Tachyon makes all of that irrelevant.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="px-4 py-3.5 rounded-xl bg-bg-surface border border-line-subtle">
                <p className="font-mono text-[11px] text-accent uppercase tracking-[0.1em] mb-1.5">Encrypted</p>
                <p className="text-[13px] text-text-2 leading-[1.5]">
                  Orders sealed with ECIES. Plaintext never leaves your browser.
                </p>
              </div>
              <div className="px-4 py-3.5 rounded-xl bg-bg-surface border border-line-subtle">
                <p className="font-mono text-[11px] text-accent uppercase tracking-[0.1em] mb-1.5">Batched</p>
                <p className="text-[13px] text-text-2 leading-[1.5]">
                  Slices mixed with other intents. Individual trades are indistinguishable.
                </p>
              </div>
              <div className="px-4 py-3.5 rounded-xl bg-bg-surface border border-line-subtle">
                <p className="font-mono text-[11px] text-accent uppercase tracking-[0.1em] mb-1.5">Invisible</p>
                <p className="text-[13px] text-text-2 leading-[1.5]">
                  No on-chain tx history. No wallet trail. Zero footprint.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section id="how" className="w-full max-w-[740px] mx-auto px-5 pb-20 sm:pb-28">
        <div className="mb-10">
          <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-text-4 mb-2">
            How it works
          </p>
          <h2
            className="font-display text-[26px] sm:text-[34px] font-semibold text-text-1 leading-[1.1]"
            style={{ letterSpacing: "-0.03em", maxWidth: "24ch" }}
          >
            Trade big. Stay invisible.
          </h2>
        </div>

        <div className="space-y-3">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className="flex gap-5 px-5 py-5 rounded-xl border border-line bg-bg-elevated hover:bg-bg-surface transition-colors"
            >
              <div className="shrink-0 w-10 h-10 rounded-lg bg-accent-dim flex items-center justify-center">
                <span className="font-mono text-[13px] font-semibold text-accent">{s.num}</span>
              </div>
              <div>
                <h3 className="font-display text-[15px] font-semibold text-text-1 mb-1 tracking-[-0.3px]">
                  {s.title}
                </h3>
                <p className="text-[13px] text-text-3 leading-[1.6]">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* keyline */}
      <div className="max-w-[740px] mx-auto px-5">
        <div className="h-px bg-line opacity-40" />
      </div>

      {/* ═══════════ FEATURES GRID ═══════════ */}
      <section className="w-full max-w-[740px] mx-auto px-5 py-20 sm:py-28">
        <div className="mb-10">
          <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-text-4 mb-2">
            Privacy by design
          </p>
          <h2
            className="font-display text-[26px] sm:text-[34px] font-semibold text-text-1 leading-[1.1]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Built for stealth.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="px-5 py-5 rounded-xl border border-line bg-bg-elevated hover:bg-bg-surface transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-accent-dim flex items-center justify-center text-accent mb-4">
                {f.icon}
              </div>
              <h3 className="font-display text-[15px] font-semibold text-text-1 mb-1.5 tracking-[-0.3px]">
                {f.title}
              </h3>
              <p className="text-[13px] text-text-3 leading-[1.6]">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* keyline */}
      <div className="max-w-[740px] mx-auto px-5">
        <div className="h-px bg-line opacity-40" />
      </div>

      {/* ═══════════ STATS ═══════════ */}
      <section className="w-full max-w-[740px] mx-auto px-5 py-16 sm:py-24">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div key={i} className="text-center sm:text-left">
              <p className="font-display text-[28px] sm:text-[34px] font-bold tracking-[-0.03em] text-text-1 leading-none mb-1">
                {s.value}
              </p>
              <p className="text-[11px] font-mono uppercase tracking-[0.1em] text-text-4">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* keyline */}
      <div className="max-w-[740px] mx-auto px-5">
        <div className="h-px bg-line opacity-40" />
      </div>

      {/* ═══════════ CTA ═══════════ */}
      <section className="w-full max-w-[740px] mx-auto px-5 py-20 sm:py-28 text-center">
        <h2
          className="font-display text-[28px] sm:text-[38px] font-semibold text-text-1 leading-[1.05] mb-4"
          style={{ letterSpacing: "-0.03em", textWrap: "balance" }}
        >
          Trade like a whale.
          <br />
          Leave no trace.
        </h2>
        <p className="text-[15px] text-text-2 mb-8 max-w-[440px] mx-auto">
          Connect your wallet. Set your TWAP parameters.
          The TEE encrypts, slices, and executes — invisibly.
        </p>
        <Link
          href="/app"
          className="h-11 px-6 text-[13px] font-semibold font-display bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors inline-flex items-center gap-2"
        >
          Launch App
          <ArrowRight />
        </Link>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-line-subtle">
        <div className="max-w-[740px] mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <Image src="/logo.svg" alt="Tachyon" width={14} height={14} className="invert opacity-30" />
            <span className="text-[11px] font-mono text-text-4">tachyon</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-mono text-text-4">
            <span>TEE-secured</span>
            <span className="text-line">&middot;</span>
            <span>ECIES encrypted</span>
            <span className="text-line">&middot;</span>
            <span>Base &middot; Robinhood</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
