import { useState } from 'react';
import {
  Copy, Check, ExternalLink, Wallet, ArrowRight, ArrowDown,
  Cpu, Shield, Radio, Terminal, Lock, Signal,
} from 'lucide-react';
import HowToBuyBackground from './HowToBuyBackground';

/* ═══════════════════════════════════════════════════════════════════
   DATA — unchanged from the original section
   ═══════════════════════════════════════════════════════════════════ */

const EXCHANGES = [
  { name: 'UNISWAP', tag: 'DEX', color: 'text-cyber-magenta', hex: '#FF00A8' },
  { name: 'RAYDIUM', tag: 'DEX', color: 'text-cyber-cyan', hex: '#00F0FF' },
  { name: 'PANCAKE', tag: 'DEX', color: 'text-cyber-yellow', hex: '#FFE600' },
  { name: 'GATE.IO', tag: 'CEX', color: 'text-cyber-green', hex: '#39FF14' },
];

const STEPS = [
  { n: '01', title: 'GET A WALLET', body: 'Install MetaMask or Phantom. Write down your seed phrase. Don\'t lose it — we can\'t help you, cyber.', icon: Wallet },
  { n: '02', title: 'GRAB SOME ETH/SOL', body: 'Fund your wallet from an exchange. You\'ll need gas to ride the streets.', icon: Signal },
  { n: '03', title: 'CONNECT & SWAP', body: 'Hit a DEX above, paste the contract address, and swap for $CYBER. Slippage: 6.9%.', icon: Radio },
  { n: '04', title: 'WELCOME TO NIGHT CITY', body: 'You\'re in. HODL, meme, and watch the burn vault eat supply. Don\'t go cyberpsycho.', icon: Terminal },
];

const AI_OPERATOR_IMG = 'https://ik.imagekit.io/zznoau6lx/abb8f972-aacb-4ff4-85f0-85b4380afc1f.png';

const NETWORK_LABEL = 'SOLANA';
const STATUS_LABEL = 'ONLINE';

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export default function HowToBuy() {
  const [copied, setCopied] = useState(false);
  const address = '0xCH00MwAk3UpS4muR4id34d0000000000000000';

  const copy = () => {
    navigator.clipboard?.writeText(address).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="buy" className="relative overflow-hidden px-5 py-24">
      <HowToBuyBackground />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ── Header ── */}
        <div className="mb-16 text-center reveal-glitch">
          <div className="font-mono text-xs tracking-[0.4em] text-cyber-yellow animate-flicker">// ACQUISITION PROTOCOL</div>
          <h2 className="mt-3 font-display text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            HOW TO <span className="text-cyber-yellow text-glow-yellow rgb-hover">BUY</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-mono text-sm tracking-[0.3em] text-cyber-cyan/70">
            ACQUISITION TERMINAL
          </p>
          <div className="mx-auto mt-6 h-px w-24" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.6), transparent)' }} />
        </div>

        {/* ── Two-column acquisition console ── */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-10">
          {/* ═══ LEFT: AI Mission Operator ═══ */}
          <div className="reveal-left">
            <OperatorHologram />
            <OperatorStatus />
          </div>

          {/* ═══ RIGHT: Connected terminal ═══ */}
          <div className="reveal-right flex flex-col gap-6">
            {/* TARGET CONTRACT */}
            <ContractTerminal
              address={address}
              copied={copied}
              onCopy={copy}
            />

            {/* connector */}
            <NodeConnector />

            {/* AVAILABLE ACCESS NODES */}
            <AccessNodes />

            {/* connector */}
            <NodeConnector />

            {/* MISSION FLOW */}
            <MissionFlow />
          </div>
        </div>
      </div>

      <HowToBuyStyles />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   LEFT — AI MISSION OPERATOR HOLOGRAM
   Rotating HUD rings, radar circles, hexagon grid, scanlines, particles,
   holographic circles. Chest-up framing of the AI portrait.
   ═══════════════════════════════════════════════════════════════════ */

function OperatorHologram() {
  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      {/* rotating HUD rings + radar + hex grid + AI portrait */}
      <div className="op-frame clip-cyber relative aspect-square overflow-hidden border border-cyber-cyan/30 bg-cyber-dark/40 backdrop-blur-sm">
        <HudCorners hex="#00F0FF" />

        {/* radar circles behind the operator */}
        <div className="op-radar" aria-hidden>
          <span className="op-ring" style={{ width: '100%', height: '100%' }} />
          <span className="op-ring" style={{ width: '72%', height: '72%' }} />
          <span className="op-ring" style={{ width: '44%', height: '44%' }} />
          <span className="op-ring op-ring-spin" style={{ width: '88%', height: '88%' }} />
          <span className="op-ring op-ring-spin-rev" style={{ width: '60%', height: '60%' }} />
          <span className="op-radar-beam" />
        </div>

        {/* hexagon lattice */}
        <div className="op-hexgrid" aria-hidden />

        {/* binary stream overlay */}
        <div className="op-binary" aria-hidden>
          {['01001011', 'AUTH OK', '10110010', 'NET-77', '0xAF23', '11100011', 'SYNC', '0xC9D2', '11010101'].map((b, i) => (
            <span key={i} className="op-bin" style={{ left: `${6 + (i * 11) % 88}%`, top: `${8 + (i * 19) % 84}%`, animationDelay: `${i * 0.4}s` }}>
              {b}
            </span>
          ))}
        </div>

        {/* AI portrait — chest up, centered, not aggressively cropped */}
        <div className="op-portrait" aria-hidden>
          <img
            src={AI_OPERATOR_IMG}
            alt="AI mission operator hologram"
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
          {/* holographic grade + scanlines + vignette */}
          <div className="op-grade" />
          <div className="op-scanlines" />
          <div className="op-portrait-vignette" />
          <div className="op-flicker" />
        </div>

        {/* floating holographic circles */}
        <span className="op-holo-circle op-holo-1" />
        <span className="op-holo-circle op-holo-2" />
        <span className="op-holo-circle op-holo-3" />

        {/* digital particles */}
        <div className="op-particles" aria-hidden>
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="op-particle"
              style={{
                left: `${8 + i * 11}%`,
                top: `${14 + (i % 4) * 22}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${6 + (i % 3) * 2}s`,
              }}
            />
          ))}
        </div>

        {/* top status strip */}
        <div className="op-strip op-strip-top">
          <span className="flex items-center gap-1.5">
            <span className="op-dot op-dot-green" />
            <span>OPERATOR</span>
          </span>
          <span className="op-strip-id">AURA-09</span>
        </div>

        {/* bottom scan label */}
        <div className="op-strip op-strip-bottom">
          <span>HOLO-RENDER</span>
          <span className="op-strip-pulse">ACTIVE</span>
        </div>
      </div>
    </div>
  );
}

/* Small status panel under the operator — part of the operating system */
function OperatorStatus() {
  const rows: [string, string, string][] = [
    ['MISSION OPERATOR', 'AURA-09', 'cyan'],
    ['STATUS', 'ONLINE', 'green'],
    ['NETWORK', 'SECURE', 'cyan'],
    ['MISSION', 'READY', 'yellow'],
  ];
  const colorMap: Record<string, string> = {
    cyan: '#00F0FF', green: '#39FF14', yellow: '#FFE600', magenta: '#FF00A8',
  };
  return (
    <div className="mx-auto mt-5 w-full max-w-[460px]">
      <div className="clip-cyber-sm relative border border-cyber-cyan/25 bg-cyber-panel/55 p-4 backdrop-blur-sm">
        <HudCorners hex="#00F0FF" small />
        <div className="mb-3 flex items-center justify-between font-mono text-[9px] tracking-[0.3em] text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="op-dot op-dot-green" />
            OPERATOR STATUS
          </span>
          <span className="text-cyber-cyan/60">ID:AURA-09</span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
          {rows.map(([k, v, c]) => (
            <div key={k} className="flex items-center justify-between border-b border-cyber-cyan/10 pb-1.5">
              <span className="font-mono text-[9px] tracking-[0.22em] text-gray-500">{k}</span>
              <span
                className="font-mono text-[10px] font-bold tracking-[0.15em]"
                style={{ color: colorMap[c], textShadow: `0 0 6px ${colorMap[c]}80` }}
              >
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   RIGHT — TARGET CONTRACT TERMINAL
   STATUS / NETWORK / CONTRACT ADDRESS with working copy button.
   ═══════════════════════════════════════════════════════════════════ */

function ContractTerminal({ address, copied, onCopy }: { address: string; copied: boolean; onCopy: () => void }) {
  return (
    <div className="ct-wrap clip-cyber relative border border-cyber-magenta/40 bg-cyber-dark/55 backdrop-blur-sm">
      <HudCorners hex="#FF00A8" />

      {/* module header */}
      <div className="flex items-center justify-between border-b border-cyber-magenta/25 px-5 py-3">
        <div className="flex items-center gap-2">
          <Lock className="h-3.5 w-3.5 text-cyber-magenta" />
          <span className="font-mono text-[10px] tracking-[0.32em] text-cyber-magenta">TARGET CONTRACT</span>
        </div>
        <span className="font-mono text-[9px] tracking-[0.25em] text-gray-500">CLASSIFIED // LVL-1</span>
      </div>

      <div className="px-5 py-4">
        {/* STATUS / NETWORK two-up */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <StatusReadout icon={Cpu} label="STATUS" value={STATUS_LABEL} hex="#39FF14" />
          <StatusReadout icon={Radio} label="NETWORK" value={NETWORK_LABEL} hex="#00F0FF" />
        </div>

        {/* CONTRACT ADDRESS */}
        <div className="font-mono text-[9px] tracking-[0.3em] text-gray-500">CONTRACT ADDRESS</div>
        <div className="mt-2 flex items-center gap-3">
          <code className="flex-1 truncate rounded-sm border border-cyber-magenta/30 bg-cyber-darker/80 px-3 py-2.5 font-mono text-sm text-cyber-magenta">
            {address}
          </code>
          <button
            onClick={onCopy}
            className="ct-copy clip-cyber-sm flex items-center gap-1.5 border border-cyber-cyan/40 bg-cyber-panel px-3 py-2.5 font-mono text-xs tracking-widest text-cyber-cyan transition-all hover:bg-cyber-cyan/10"
            aria-label="Copy contract address"
          >
            {copied ? <Check className="h-4 w-4 text-cyber-green" /> : <Copy className="h-4 w-4" />}
            {copied ? 'COPIED' : 'COPY'}
          </button>
        </div>
      </div>

      {/* scanline sweep */}
      <div className="ct-scanline" />
    </div>
  );
}

function StatusReadout({ icon: Icon, label, value, hex }: { icon: typeof Cpu; label: string; value: string; hex: string }) {
  return (
    <div className="ct-readout clip-cyber-sm relative border bg-cyber-darker/60 px-3 py-2.5" style={{ borderColor: `${hex}30` }}>
      <div className="flex items-center gap-1.5" style={{ color: hex }}>
        <Icon className="h-3 w-3" />
        <span className="font-mono text-[8px] tracking-[0.28em] opacity-80">{label}</span>
      </div>
      <div className="mt-1 font-mono text-sm font-bold" style={{ color: hex, textShadow: `0 0 6px ${hex}80` }}>
        {value}
      </div>
      <span className="ct-readout-led" style={{ background: hex, boxShadow: `0 0 6px ${hex}` }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   RIGHT — AVAILABLE ACCESS NODES
   Holographic connection nodes replacing the exchange buttons.
   ═══════════════════════════════════════════════════════════════════ */

function AccessNodes() {
  return (
    <div className="an-wrap clip-cyber relative border border-cyber-cyan/30 bg-cyber-dark/55 backdrop-blur-sm">
      <HudCorners hex="#00F0FF" />

      <div className="flex items-center justify-between border-b border-cyber-cyan/20 px-5 py-3">
        <div className="flex items-center gap-2">
          <Signal className="h-3.5 w-3.5 text-cyber-cyan" />
          <span className="font-mono text-[10px] tracking-[0.32em] text-cyber-cyan">AVAILABLE ACCESS NODES</span>
        </div>
        <span className="font-mono text-[9px] tracking-[0.25em] text-gray-500">{EXCHANGES.length} NODES</span>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
        {EXCHANGES.map((e, i) => (
          <a
            key={i}
            href="#buy"
            className="an-node clip-cyber-sm group relative flex flex-col gap-2 border bg-cyber-panel/50 p-3.5 transition-all hover:bg-cyber-cyan/10"
            style={{ transitionDelay: `${i * 60}ms`, borderColor: `${e.hex}30` }}
          >
            {/* ONLINE indicator */}
            <div className="flex items-center justify-between">
              <span className="an-led" style={{ background: e.hex, boxShadow: `0 0 6px ${e.hex}` }} />
              <span className="font-mono text-[7px] tracking-[0.22em]" style={{ color: e.hex }}>ONLINE</span>
            </div>

            {/* exchange "logo" mark */}
            <div className="flex items-center gap-2">
              <span className="an-mark" style={{ borderColor: `${e.hex}80`, color: e.hex, boxShadow: `0 0 8px ${e.hex}40` }}>
                {e.name.charAt(0)}
              </span>
              <div className="min-w-0">
                <div className={`truncate font-display text-sm font-bold ${e.color}`}>{e.name}</div>
                <div className="font-mono text-[8px] tracking-[0.25em] text-gray-500">{e.tag}</div>
              </div>
            </div>

            {/* arrow */}
            <div className="flex items-center justify-between border-t border-cyber-cyan/10 pt-2">
              <span className="font-mono text-[7px] tracking-[0.25em] text-gray-600">CONNECT</span>
              <ArrowRight className="h-3 w-3 text-gray-500 transition-all group-hover:translate-x-0.5" style={{ color: e.hex }} />
            </div>

            {/* hover scanline */}
            <div className="an-scan" />
          </a>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   RIGHT — MISSION FLOW
   One connected vertical mission protocol linked by a glowing neural line.
   Each step is a futuristic terminal module.
   ═══════════════════════════════════════════════════════════════════ */

function MissionFlow() {
  return (
    <div className="mf-wrap relative">
      <div className="mb-4 flex items-center gap-2 px-1">
        <Terminal className="h-3.5 w-3.5 text-cyber-yellow" />
        <span className="font-mono text-[10px] tracking-[0.32em] text-cyber-yellow">MISSION FLOW</span>
        <div className="ml-2 h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(255,230,0,0.4), transparent)' }} />
        <span className="font-mono text-[9px] tracking-[0.25em] text-gray-500">PROTOCOL 04</span>
      </div>

      {/* glowing vertical neural data line */}
      <div className="mf-line" aria-hidden>
        <div className="mf-line-glow" />
        <div className="mf-line-pulse" />
      </div>

      <div className="flex flex-col gap-4">
        {STEPS.map((s, i) => (
          <MissionModule key={i} step={s} index={i} last={i === STEPS.length - 1} />
        ))}
      </div>
    </div>
  );
}

function MissionModule({ step, index, last }: { step: typeof STEPS[number]; index: number; last: boolean }) {
  const Icon = step.icon;
  return (
    <div className="mf-module relative flex gap-4" style={{ transitionDelay: `${index * 80}ms` }}>
      {/* neural node on the line */}
      <div className="mf-node-wrap relative z-10 shrink-0">
        <div className="mf-node">
          <span className="mf-node-core" />
          <span className="mf-node-ring" />
        </div>
        {!last && <div className="mf-node-leg" />}
      </div>

      {/* terminal module body */}
      <div className="mf-body clip-cyber relative flex-1 border border-cyber-cyan/25 bg-cyber-panel/55 p-4 backdrop-blur-sm transition-all hover:border-cyber-cyan/50">
        <HudCorners hex="#00F0FF" small />

        {/* huge glowing step number, watermark */}
        <span className="mf-step-num">{step.n}</span>

        <div className="relative flex items-start gap-3">
          <span className="mf-icon-wrap">
            <Icon className="h-4 w-4 text-cyber-yellow" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] tracking-[0.3em] text-cyber-cyan/70">STEP {step.n}</span>
              <span className="mf-blink" />
            </div>
            <h3 className="mt-1 font-display text-base font-bold tracking-wide text-cyber-yellow" style={{ textShadow: '0 0 8px rgba(255,230,0,0.4)' }}>
              {step.title}
            </h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-gray-300">{step.body}</p>
          </div>
        </div>

        {/* scanline + noise overlays */}
        <div className="mf-scanlines" />
        <div className="mf-noise" />
        {/* blinking bottom indicator */}
        <div className="mf-bottom">
          <span className="mf-bottom-led" />
          <span className="font-mono text-[7px] tracking-[0.3em] text-gray-500">MODULE {step.n} // ACTIVE</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SHARED — HUD corner brackets + node connector
   ═══════════════════════════════════════════════════════════════════ */

function HudCorners({ hex, small }: { hex: string; small?: boolean }) {
  const sz = small ? 'h-3.5 w-3.5' : 'h-5 w-5';
  const off = small ? '-left-0.5 -top-0.5' : '-left-1 -top-1';
  const style = { borderColor: hex, boxShadow: `0 0 8px ${hex}80` };
  return (
    <>
      <div className={`absolute ${sz} ${off} border-l-2 border-t-2`} style={style} />
      <div className={`absolute ${sz} -right-1 -top-1 border-r-2 border-t-2`} style={style} />
      <div className={`absolute ${sz} -bottom-1 -left-1 border-b-2 border-l-2`} style={style} />
      <div className={`absolute ${sz} -bottom-1 -right-1 border-b-2 border-r-2`} style={style} />
    </>
  );
}

function NodeConnector() {
  return (
    <div className="nc-wrap flex items-center justify-center py-1" aria-hidden>
      <span className="nc-dot" />
      <span className="nc-line" />
      <ArrowDown className="h-3.5 w-3.5 text-cyber-cyan/70" />
      <span className="nc-line" />
      <span className="nc-dot" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STYLES — operator hologram, terminal modules, neural line
   ═══════════════════════════════════════════════════════════════════ */

function HowToBuyStyles() {
  return (
    <style>{`
/* ── AI Operator hologram frame ── */
.op-frame { box-shadow: 0 0 30px rgba(0,240,255,0.15), inset 0 0 40px rgba(0,240,255,0.08); }

/* radar + rings */
.op-radar { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
.op-ring {
  position: absolute; border: 1px solid rgba(0,240,255,0.16); border-radius: 50%;
}
.op-ring-spin {
  border-style: dashed; border-color: rgba(0,240,255,0.22);
  animation: opSpin 18s linear infinite;
}
.op-ring-spin-rev {
  border-style: dotted; border-color: rgba(255,0,168,0.22);
  animation: opSpin 24s linear infinite reverse;
}
@keyframes opSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
.op-radar-beam {
  position: absolute; top: 50%; left: 50%; width: 50%; height: 1px;
  background: linear-gradient(90deg, rgba(0,240,255,0.5), transparent);
  transform-origin: left center;
  animation: opSpin 6s linear infinite;
  box-shadow: 0 0 8px rgba(0,240,255,0.4);
}

/* hexagon grid */
.op-hexgrid {
  position: absolute; inset: 0; opacity: 0.12;
  background-image:
    repeating-linear-gradient(60deg, rgba(0,240,255,0.4) 0 1px, transparent 1px 28px),
    repeating-linear-gradient(-60deg, rgba(0,240,255,0.4) 0 1px, transparent 1px 28px),
    repeating-linear-gradient(0deg, rgba(0,240,255,0.4) 0 1px, transparent 1px 24px);
  mask-image: radial-gradient(circle at 50% 45%, black 35%, transparent 78%);
  -webkit-mask-image: radial-gradient(circle at 50% 45%, black 35%, transparent 78%);
}

/* binary stream */
.op-binary { position: absolute; inset: 0; pointer-events: none; }
.op-bin {
  position: absolute;
  font-family: 'Share Tech Mono', monospace;
  font-size: 8px; letter-spacing: 0.15em;
  color: rgba(0,240,255,0.35);
  animation: opBinFlicker 4s ease-in-out infinite;
}
@keyframes opBinFlicker {
  0%, 100% { opacity: 0.15; } 50% { opacity: 0.45; }
}

/* AI portrait */
.op-portrait { position: absolute; inset: 0; }
.op-portrait img {
  filter: contrast(1.12) saturate(1.1) brightness(0.92) drop-shadow(0 0 18px rgba(0,240,255,0.25));
  animation: opHoloFlicker 5s ease-in-out infinite;
}
@keyframes opHoloFlicker {
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.82; }
  94% { opacity: 1; }
  96% { opacity: 0.9; }
  97% { opacity: 1; }
}
.op-grade {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(0,240,255,0.04) 0%, transparent 30%, rgba(5,5,7,0.55) 88%, rgba(5,5,7,0.95) 100%);
  mix-blend-mode: screen;
}
.op-scanlines {
  position: absolute; inset: 0;
  background: repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(0,0,0,0.32) 2px, rgba(0,0,0,0.32) 3px);
  opacity: 0.22; mix-blend-mode: multiply; pointer-events: none;
}
.op-portrait-vignette {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 50% 45%, transparent 40%, rgba(5,5,7,0.85) 100%);
  pointer-events: none;
}
.op-flicker {
  position: absolute; inset: 0;
  background: linear-gradient(115deg, transparent 40%, rgba(0,240,255,0.08) 50%, transparent 60%);
  background-size: 200% 100%;
  animation: opGlassSweep 7s ease-in-out infinite;
  mix-blend-mode: screen; pointer-events: none;
}
@keyframes opGlassSweep {
  0% { background-position: -120% 0; } 100% { background-position: 120% 0; }
}

/* holographic circles */
.op-holo-circle { position: absolute; border-radius: 50%; border: 1px solid rgba(0,240,255,0.25); pointer-events: none; }
.op-holo-1 { width: 70%; height: 70%; left: 15%; top: 15%; animation: opSpin 14s linear infinite; border-style: dashed; }
.op-holo-2 { width: 46%; height: 46%; left: 27%; top: 27%; animation: opSpin 10s linear infinite reverse; border-color: rgba(255,0,168,0.2); }
.op-holo-3 { width: 30%; height: 30%; left: 35%; top: 35%; animation: opPulse 3s ease-in-out infinite; }
@keyframes opPulse {
  0%, 100% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.12); opacity: 0.7; }
}

/* particles */
.op-particles { position: absolute; inset: 0; pointer-events: none; }
.op-particle {
  position: absolute; width: 2px; height: 2px; border-radius: 50%;
  background: rgba(0,240,255,0.6); box-shadow: 0 0 5px rgba(0,240,255,0.6);
  animation: opParticleFloat 8s ease-in-out infinite;
}
@keyframes opParticleFloat {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
  50% { transform: translateY(-18px) translateX(6px); opacity: 0.8; }
}

/* status strips */
.op-strip {
  position: absolute; left: 12px; right: 12px;
  display: flex; align-items: center; justify-content: space-between;
  font-family: 'Share Tech Mono', monospace;
  font-size: 8px; letter-spacing: 0.28em; color: rgba(0,240,255,0.7);
  pointer-events: none;
}
.op-strip-top { top: 10px; }
.op-strip-bottom { bottom: 10px; }
.op-strip-id { color: rgba(255,230,0,0.8); }
.op-strip-pulse { color: rgba(57,255,20,0.9); animation: opPulse 2s ease-in-out infinite; }
.op-dot { display: inline-block; width: 5px; height: 5px; border-radius: 50%; }
.op-dot-green { background: #39FF14; box-shadow: 0 0 6px #39FF14; animation: opPulse 2s ease-in-out infinite; }

/* ── Contract terminal ── */
.ct-wrap { box-shadow: 0 0 24px rgba(255,0,168,0.15), inset 0 0 24px rgba(255,0,168,0.06); }
.ct-scanline {
  position: absolute; left: 0; right: 0; top: 0; height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255,0,168,0.6), transparent);
  opacity: 0; pointer-events: none;
}
.ct-wrap:hover .ct-scanline { animation: ctScan 1.4s linear; }
@keyframes ctScan {
  0% { transform: translateY(0); opacity: 0; }
  10% { opacity: 0.8; } 90% { opacity: 0.8; }
  100% { transform: translateY(220px); opacity: 0; }
}
.ct-readout { position: relative; }
.ct-readout-led {
  position: absolute; top: 8px; right: 8px;
  width: 5px; height: 5px; border-radius: 50%;
  animation: opPulse 2s ease-in-out infinite;
}
.ct-copy { position: relative; overflow: hidden; }

/* ── Access nodes ── */
.an-wrap { box-shadow: 0 0 24px rgba(0,240,255,0.12), inset 0 0 24px rgba(0,240,255,0.05); }
.an-node { position: relative; overflow: hidden; }
.an-led {
  display: inline-block; width: 6px; height: 6px; border-radius: 50%;
  animation: opPulse 1.8s ease-in-out infinite;
}
.an-mark {
  display: inline-flex; align-items: center; justify-content: center;
  width: 26px; height: 26px; flex-shrink: 0;
  border: 1px solid; border-radius: 4px;
  font-family: 'Orbitron', sans-serif; font-weight: 900; font-size: 13px;
  background: rgba(8,10,18,0.6);
}
.an-scan {
  position: absolute; left: 0; right: 0; top: 0; height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0,240,255,0.5), transparent);
  opacity: 0; pointer-events: none;
}
.an-node:hover .an-scan { animation: anScan 1.2s linear; }
@keyframes anScan {
  0% { transform: translateY(0); opacity: 0; }
  10% { opacity: 0.8; } 90% { opacity: 0.8; }
  100% { transform: translateY(140px); opacity: 0; }
}

/* ── Mission flow neural line ── */
.mf-line {
  position: absolute; left: 17px; top: 38px; bottom: 8px; width: 2px;
  background: linear-gradient(180deg, rgba(0,240,255,0.05), rgba(0,240,255,0.4), rgba(0,240,255,0.05));
  pointer-events: none;
}
.mf-line-glow {
  position: absolute; inset: 0; width: 6px; left: -2px;
  background: linear-gradient(180deg, transparent, rgba(0,240,255,0.18), transparent);
  filter: blur(4px);
}
.mf-line-pulse {
  position: absolute; left: -3px; width: 8px; height: 24px;
  background: linear-gradient(180deg, transparent, rgba(0,240,255,0.9), transparent);
  filter: blur(1px);
  animation: mfPulse 3.2s ease-in-out infinite;
}
@keyframes mfPulse {
  0% { top: 0%; opacity: 0; }
  10% { opacity: 1; } 90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

/* mission module */
.mf-module { position: relative; }
.mf-node-wrap { position: relative; display: flex; flex-direction: column; align-items: center; }
.mf-node {
  position: relative; width: 34px; height: 34px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.mf-node-core {
  width: 10px; height: 10px; border-radius: 50%;
  background: #00F0FF; box-shadow: 0 0 10px #00F0FF, 0 0 18px rgba(0,240,255,0.5);
  animation: opPulse 2s ease-in-out infinite;
}
.mf-node-ring {
  position: absolute; inset: 0; border: 1px dashed rgba(0,240,255,0.4); border-radius: 50%;
  animation: opSpin 12s linear infinite;
}
.mf-node-leg { width: 2px; flex: 1; margin-top: 4px; background: linear-gradient(180deg, rgba(0,240,255,0.4), rgba(0,240,255,0.1)); }

.mf-body { position: relative; overflow: hidden; box-shadow: 0 0 18px rgba(0,240,255,0.08); }
.mf-step-num {
  position: absolute; right: 14px; top: 6px;
  font-family: 'Orbitron', sans-serif; font-weight: 900;
  font-size: 56px; line-height: 1;
  color: rgba(0,240,255,0.08);
  pointer-events: none; user-select: none;
}
.mf-icon-wrap {
  display: inline-flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; flex-shrink: 0;
  border: 1px solid rgba(255,230,0,0.4); border-radius: 4px;
  background: rgba(255,230,0,0.06);
  box-shadow: 0 0 10px rgba(255,230,0,0.15), inset 0 0 8px rgba(255,230,0,0.08);
}
.mf-blink {
  display: inline-block; width: 6px; height: 6px; border-radius: 50%;
  background: #39FF14; box-shadow: 0 0 6px #39FF14;
  animation: mfBlink 1.4s steps(1) infinite;
}
@keyframes mfBlink { 0%, 48% { opacity: 1; } 50%, 100% { opacity: 0.2; } }
.mf-scanlines {
  position: absolute; inset: 0; pointer-events: none; opacity: 0.14;
  background: repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(0,240,255,0.18) 2px, rgba(0,240,255,0.18) 3px);
}
.mf-noise {
  position: absolute; inset: 0; pointer-events: none; opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.mf-bottom {
  position: absolute; left: 12px; bottom: 8px;
  display: flex; align-items: center; gap: 6px; pointer-events: none;
}
.mf-bottom-led {
  width: 5px; height: 5px; border-radius: 50%;
  background: #FF00A8; box-shadow: 0 0 6px #FF00A8;
  animation: mfBlink 1.2s steps(1) infinite;
}

/* ── Node connector between blocks ── */
.nc-wrap { position: relative; }
.nc-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: rgba(0,240,255,0.5); box-shadow: 0 0 6px rgba(0,240,255,0.5);
}
.nc-line {
  width: 60px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0,240,255,0.4), transparent);
}

@media (prefers-reduced-motion: reduce) {
  .op-ring-spin, .op-ring-spin-rev, .op-radar-beam, .op-holo-1, .op-holo-2, .op-holo-3,
  .op-particle, .op-flicker, .op-bin, .op-strip-pulse, .op-dot-green, .op-portrait img,
  .mf-line-pulse, .mf-node-ring, .mf-blink, .mf-bottom-led, .an-led, .ct-readout-led {
    animation: none !important;
  }
}
`}</style>
  );
}
