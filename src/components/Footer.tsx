import { useRef, useState } from 'react';
import {
  Twitter, MessageCircle, Send, Github, Zap, Copy, Check,
  Cpu, Radio, Lock, Terminal, Activity, Wifi,
} from 'lucide-react';
import { useFooterBoot } from '@/lib/useFooterBoot';

const NAV_LINKS = [
  { label: 'ABOUT', href: '#about' },
  { label: 'TOKENOMICS', href: '#tokenomics' },
  { label: 'ROADMAP', href: '#roadmap' },
  { label: 'PSYCHO METER', href: '#meter' },
  { label: 'HOW TO BUY', href: '#buy' },
  { label: 'FAQ', href: '#faq' },
];

const SOCIALS = [
  { icon: Twitter, label: 'X / TWITTER', href: '#' },
  { icon: MessageCircle, label: 'DISCORD', href: '#' },
  { icon: Send, label: 'TELEGRAM', href: '#' },
  { icon: Github, label: 'GITHUB', href: '#' },
];

const CONTRACT = '0xCH00MwAk3UpS4muR4id34d0000000000000000';

const BOOT_LOG = [
  '[ OK ] core kernel loaded',
  '[ OK ] net link established',
  '[ OK ] verifying network integrity',
  '[ OK ] system online — welcome, cyber',
];

type CopyPhase = 'idle' | 'auth' | 'verify' | 'encrypt' | 'done';
const PHASES: { key: CopyPhase; label: string; ms: number }[] = [
  { key: 'auth', label: 'AUTHENTICATING...', ms: 520 },
  { key: 'verify', label: 'VERIFYING...', ms: 520 },
  { key: 'encrypt', label: 'ENCRYPTING...', ms: 520 },
  { key: 'done', label: 'CONTRACT COPIED', ms: 2000 },
];

function runCopySequence(address: string, setPhase: (p: CopyPhase) => void) {
  navigator.clipboard?.writeText(address).catch(() => {});
  let i = 0;
  const tick = () => {
    const phase = PHASES[i];
    if (!phase) { setPhase('idle'); return; }
    setPhase(phase.key);
    i += 1;
    window.setTimeout(tick, phase.ms);
  };
  tick();
}

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  useFooterBoot(rootRef);
  const [copyState, setCopyState] = useState<CopyPhase>('idle');

  const handleCopy = () => {
    if (copyState !== 'idle' && copyState !== 'done') return;
    runCopySequence(CONTRACT, setCopyState);
  };

  const busy = copyState !== 'idle' && copyState !== 'done';
  const done = copyState === 'done';

  return (
    <footer ref={rootRef} id="footer" className="ft-root">
      <FooterStyles />

      {/* ── Layered atmosphere ── */}
      <div className="ft-glow" aria-hidden />
      <div className="ft-grid" aria-hidden />
      <div className="ft-scanlines" aria-hidden />
      <div className="ft-fog" aria-hidden>
        <span className="ft-fog-blob ft-fog-cyan" />
        <span className="ft-fog-blob ft-fog-magenta" />
        <span className="ft-fog-blob ft-fog-yellow" />
      </div>
      <div className="ft-binary" aria-hidden>
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="ft-bin"
            style={{
              left: `${(i * 5.5) % 100}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${7 + (i % 5) * 1.5}s`,
            }}
          />
        ))}
      </div>
      <div className="ft-particles" aria-hidden>
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="ft-particle"
            style={{
              left: `${6 + i * 9}%`,
              top: `${12 + (i % 4) * 22}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${6 + (i % 3) * 2}s`,
            }}
          />
        ))}
      </div>
      <div className="ft-noise" aria-hidden />

      {/* ── Giant watermark word ── */}
      <div className="ft-watermark" aria-hidden>
        <span data-text="CYBER">CYBER</span>
      </div>

      {/* ── HUD corner brackets ── */}
      <span className="ft-hud ft-hud-tl" />
      <span className="ft-hud ft-hud-tr" />
      <span className="ft-hud ft-hud-bl" />
      <span className="ft-hud ft-hud-br" />

      {/* ── Terminal header bar ── */}
      <div className="ft-termbar">
        <span className="ft-termbar-left">
          <Terminal className="h-3.5 w-3.5" />
          <span>CYBER_OS // TERMINAL v2.0.77</span>
        </span>
        <span className="ft-termbar-right">
          <span className="ft-termbar-dot" />
          <span>SESSION: ENCRYPTED</span>
        </span>
      </div>

      {/* ── Main three-column console ── */}
      <div className="ft-grid-layout relative z-10">
        {/* ═══ LEFT ═══ */}
        <div className="ft-col ft-col-left">
          <a href="#top" className="ft-logo flex items-center gap-2">
            <Zap className="h-6 w-6 fill-cyber-yellow animate-flicker text-cyber-yellow" />
            <span className="font-display text-xl font-black tracking-widest text-cyber-yellow text-glow-yellow rgb-hover">
              $CYBER
            </span>
          </a>

          <div className="ft-tagline mt-4 font-display text-2xl font-black leading-tight text-white sm:text-3xl">
            CYBER<br />
            <span className="text-cyber-cyan text-glow-cyan">NEVER DIES.</span>
          </div>

          <p className="ft-desc mt-4 max-w-xs font-body text-sm leading-relaxed text-gray-400">
            The final terminal of Night City. You completed the mission, cyber.
            Now jack in, stay chrome, and keep the signal alive.
          </p>

          <a
            href="#buy"
            className="ft-buy clip-cyber mt-6 inline-flex items-center gap-2 bg-cyber-yellow px-6 py-3 font-display text-xs font-bold tracking-widest text-cyber-dark transition-all hover:bg-cyber-cyan hover:animate-shake box-glow-yellow"
          >
            <Zap className="h-4 w-4 fill-cyber-dark animate-flicker" />
            BUY $CYBER NOW
          </a>
        </div>

        {/* ═══ CENTER ═══ */}
        <div className="ft-col ft-col-center">
          <div className="ft-nav-label ft-section-label">
            <span className="ft-label-bar" />
            NAVIGATION
          </div>
          <nav className="ft-nav mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="ft-nav-link">
                <span className="ft-nav-bracket">[</span>
                <span className="ft-nav-text">{l.label}</span>
                <span className="ft-nav-bracket">]</span>
              </a>
            ))}
          </nav>

          <div className="ft-social-label ft-section-label mt-8">
            <span className="ft-label-bar" />
            UPLINK // SOCIALS
          </div>
          <div className="ft-social mt-4 flex flex-wrap gap-3">
            {SOCIALS.map((s, i) => (
              <a
                key={i}
                href={s.href}
                aria-label={s.label}
                className="ft-social-link clip-cyber-sm flex h-11 w-11 items-center justify-center border border-cyber-cyan/30 bg-cyber-panel text-cyber-cyan transition-all hover:bg-cyber-cyan/10 hover:box-glow-cyan"
              >
                <s.icon className="h-5 w-5" />
                <span className="ft-social-pulse" />
              </a>
            ))}
          </div>
        </div>

        {/* ═══ RIGHT — SYSTEM STATUS ═══ */}
        <div className="ft-col ft-col-right">
          <div className="ft-sys-panel clip-cyber relative border border-cyber-cyan/30 bg-cyber-dark/60 p-5 backdrop-blur-sm">
            {/* panel header */}
            <div className="flex items-center justify-between border-b border-cyber-cyan/20 pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="h-3.5 w-3.5 text-cyber-cyan" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-cyber-cyan">SYSTEM STATUS</span>
              </div>
              <Activity className="h-3.5 w-3.5 text-cyber-green animate-flicker" />
            </div>

            {/* STATUS readout */}
            <div className="mt-4">
              <div className="font-mono text-[9px] tracking-[0.3em] text-gray-500">STATUS</div>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="ft-status-dot" style={{ background: '#39FF14', boxShadow: '0 0 10px #39FF14' }} />
                <span className="ft-status-value font-mono text-sm font-bold tracking-widest text-cyber-green">
                  SYSTEM ONLINE
                </span>
              </div>
            </div>

            {/* NETWORK readout */}
            <div className="ft-net mt-4">
              <div className="font-mono text-[9px] tracking-[0.3em] text-gray-500">NETWORK</div>
              <div className="mt-1.5 flex items-center gap-2">
                <Wifi className="h-3.5 w-3.5 text-cyber-cyan" />
                <span className="font-mono text-sm font-bold tracking-widest text-cyber-cyan" style={{ textShadow: '0 0 8px rgba(0,240,255,0.5)' }}>
                  SOLANA
                </span>
              </div>
            </div>

            {/* CONTRACT ADDRESS */}
            <div className="ft-contract mt-4">
              <div className="font-mono text-[9px] tracking-[0.3em] text-gray-500">CONTRACT ADDRESS</div>
              <div className="mt-1.5 flex items-center gap-2">
                <code className={`ft-addr flex-1 truncate rounded-sm border px-2.5 py-2 font-mono text-xs ${done ? 'is-done' : ''}`} style={{ borderColor: done ? 'rgba(0,240,255,0.7)' : 'rgba(255,0,168,0.3)' }}>
                  <span className="ft-addr-text">{CONTRACT}</span>
                  <span className="ft-addr-cursor" />
                </code>
                <button
                  onClick={handleCopy}
                  disabled={busy}
                  className={`ft-copy clip-cyber-sm flex items-center gap-1.5 border px-2.5 py-2 font-mono text-[10px] tracking-widest transition-all ${done ? 'is-done' : ''} ${busy ? 'is-busy' : ''}`}
                  aria-label="Copy contract address"
                >
                  <CopyButtonInner state={copyState} />
                </button>
              </div>
            </div>

            {/* boot log */}
            <div className="ft-log mt-4 border-t border-cyber-cyan/15 pt-3">
              {BOOT_LOG.map((line, i) => (
                <div key={i} className="ft-log-line font-mono text-[9px] leading-relaxed text-cyber-green/70">
                  {line}
                </div>
              ))}
            </div>

            {/* panel scanline */}
            <div className="ft-sys-scan" />
          </div>
        </div>
      </div>

      {/* ── Bottom — disclaimer + copyright ── */}
      <div className="ft-bottom relative z-10 mx-auto mt-10 max-w-3xl border-t border-cyber-cyan/10 pt-6 text-center">
        <p className="font-mono text-[10px] leading-relaxed text-gray-500">
          $CYBER is a meme coin with no intrinsic value, no expectation of profit, and no utility.
          This is not financial advice. Crypto is volatile and you may lose everything.
          Nothing here is affiliated with, endorsed by, or connected to CD Projekt Red, Studio Trigger,
          or the Cyberpunk franchise. We're just cybers who love the vibe. DYOR. Stay chrome.
        </p>
        <div className="mt-5 font-display text-sm font-bold tracking-widest text-cyber-yellow animate-flicker">
          $CYBER © 2077 — NIGHT CITY
        </div>
      </div>
    </footer>
  );
}

function CopyButtonInner({ state }: { state: CopyPhase }) {
  if (state === 'done') return (<><Check className="h-3.5 w-3.5" />COPIED</>);
  if (state === 'auth') return (<><span className="ft-spinner" />AUTH</>);
  if (state === 'verify') return (<><span className="ft-spinner" />VERIFY</>);
  if (state === 'encrypt') return (<><span className="ft-spinner" />ENCRYPT</>);
  return (<><Copy className="h-3.5 w-3.5" />COPY</>);
}

/* ═══════════════════════════════════════════════════════════════════
   STYLES — footer atmosphere, layout, system panel, micro-interactions
   ═══════════════════════════════════════════════════════════════════ */

function FooterStyles() {
  return (
    <style>{`
/* ── Root + atmosphere ── */
.ft-root {
  position: sticky;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
  background: #050507;
  color: #e8e8f0;
  padding: 90px 24px 50px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.ft-glow {
  position: absolute; inset: 0; opacity: 0; pointer-events: none;
  background:
    radial-gradient(ellipse 70% 60% at 20% 30%, rgba(255,0,168,0.10), transparent 60%),
    radial-gradient(ellipse 70% 60% at 80% 70%, rgba(0,240,255,0.12), transparent 60%),
    radial-gradient(ellipse 50% 40% at 50% 100%, rgba(255,230,0,0.06), transparent 70%);
}
.ft-grid {
  position: absolute; inset: 0; opacity: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(0,240,255,0.10) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,240,255,0.10) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at 50% 50%, black 25%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 50%, black 25%, transparent 80%);
  animation: ftGridMove 18s linear infinite;
}
@keyframes ftGridMove { 0% { background-position: 0 0; } 100% { background-position: 0 48px; } }

.ft-scanlines {
  position: absolute; inset: 0; pointer-events: none; opacity: 0.18;
  background: repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(0,0,0,0.22) 2px, rgba(0,0,0,0.22) 3px);
}

/* fog blobs */
.ft-fog { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.ft-fog-blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.5; }
.ft-fog-cyan { width: 420px; height: 420px; left: -80px; top: 10%; background: rgba(0,240,255,0.10); animation: ftFogDrift 14s ease-in-out infinite; }
.ft-fog-magenta { width: 380px; height: 380px; right: -60px; top: 40%; background: rgba(255,0,168,0.10); animation: ftFogDrift 18s ease-in-out infinite reverse; }
.ft-fog-yellow { width: 300px; height: 300px; left: 30%; bottom: -60px; background: rgba(255,230,0,0.06); animation: ftFogDrift 16s ease-in-out infinite; }
@keyframes ftFogDrift {
  0%, 100% { transform: translate(0,0) scale(1); opacity: 0.35; }
  50% { transform: translate(40px,-30px) scale(1.15); opacity: 0.6; }
}

/* binary streams */
.ft-binary { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.ft-bin {
  position: absolute; bottom: -20px; font-family: 'Share Tech Mono', monospace;
  font-size: 10px; color: rgba(0,240,255,0.18); white-space: pre;
  animation: ftBinRise linear infinite;
}
.ft-bin::before { content: '01001011 11010100'; }
@keyframes ftBinRise {
  0% { transform: translateY(0); opacity: 0; }
  10% { opacity: 0.25; } 90% { opacity: 0.25; }
  100% { transform: translateY(-100vh); opacity: 0; }
}

/* particles */
.ft-particles { position: absolute; inset: 0; pointer-events: none; }
.ft-particle {
  position: absolute; width: 2px; height: 2px; border-radius: 50%;
  background: rgba(0,240,255,0.55); box-shadow: 0 0 6px rgba(0,240,255,0.6);
  animation: ftParticleFloat ease-in-out infinite;
}
@keyframes ftParticleFloat {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
  50% { transform: translateY(-22px) translateX(8px); opacity: 0.8; }
}

/* noise */
.ft-noise {
  position: absolute; inset: 0; opacity: 0.04; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}

/* ── Watermark ── */
.ft-watermark {
  position: absolute; left: 50%; top: 52%; transform: translate(-50%, -50%);
  opacity: 0; pointer-events: none; z-index: 1;
  font-family: 'Orbitron', sans-serif; font-weight: 900;
  font-size: clamp(180px, 32vw, 520px); line-height: 0.85; letter-spacing: -0.04em;
  color: rgba(0,240,255,0.05);
  white-space: nowrap; user-select: none;
  text-shadow: 0 0 60px rgba(0,240,255,0.04);
}
.ft-watermark > span {
  display: inline-block;
  background: linear-gradient(180deg, rgba(0,240,255,0.07), rgba(255,0,168,0.03));
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ── HUD corners ── */
.ft-hud {
  position: absolute; width: 22px; height: 22px; pointer-events: none; z-index: 3;
  border-color: rgba(0,240,255,0.7); box-shadow: 0 0 10px rgba(0,240,255,0.5);
}
.ft-hud-tl { top: 70px; left: 24px; border-left: 2px solid; border-top: 2px solid; }
.ft-hud-tr { top: 70px; right: 24px; border-right: 2px solid; border-top: 2px solid; }
.ft-hud-bl { bottom: 24px; left: 24px; border-left: 2px solid; border-bottom: 2px solid; }
.ft-hud-br { bottom: 24px; right: 24px; border-right: 2px solid; border-bottom: 2px solid; }

/* ── Terminal bar ── */
.ft-termbar {
  position: relative; z-index: 10;
  display: flex; align-items: center; justify-content: space-between;
  max-width: 1200px; margin: 0 auto 48px;
  padding: 8px 14px;
  border: 1px solid rgba(0,240,255,0.22);
  background: rgba(8,10,18,0.55);
  font-family: 'Share Tech Mono', monospace; font-size: 10px; letter-spacing: 0.22em;
  color: rgba(0,240,255,0.7);
}
.ft-termbar-left { display: flex; align-items: center; gap: 8px; }
.ft-termbar-right { display: flex; align-items: center; gap: 8px; }
.ft-termbar-dot {
  width: 6px; height: 6px; border-radius: 50%; background: #39FF14;
  box-shadow: 0 0 6px #39FF14; animation: ftPulse 2s ease-in-out infinite;
}

/* ── Three-column layout ── */
.ft-grid-layout { max-width: 1200px; margin: 0 auto; display: grid; gap: 48px; }
.ft-grid-layout { grid-template-columns: 1fr; }
@media (min-width: 768px) {
  .ft-grid-layout { grid-template-columns: 1fr 1fr; gap: 40px; }
}
@media (min-width: 1024px) {
  .ft-grid-layout { grid-template-columns: 1.1fr 1fr 1.1fr; gap: 56px; }
}

.ft-col-left { max-width: 320px; }

/* section labels */
.ft-section-label {
  display: flex; align-items: center; gap: 10px;
  font-family: 'Share Tech Mono', monospace; font-size: 10px; letter-spacing: 0.3em;
  color: rgba(0,240,255,0.6);
}
.ft-label-bar { width: 24px; height: 1px; background: linear-gradient(90deg, rgba(0,240,255,0.7), transparent); }

/* ── Navigation links ── */
.ft-nav-link {
  position: relative; display: inline-flex; align-items: center; gap: 4px;
  font-family: 'Share Tech Mono', monospace; font-size: 12px; letter-spacing: 0.15em;
  color: #b0b0c0; padding: 2px 0;
  transition: color 0.25s ease, transform 0.25s cubic-bezier(0.16,1,0.3,1);
  will-change: transform;
}
.ft-nav-link::after {
  content: ''; position: absolute; left: 0; right: 100%; bottom: -2px; height: 1px;
  background: linear-gradient(90deg, rgba(0,240,255,0.9), transparent);
  transition: right 0.3s cubic-bezier(0.16,1,0.3,1);
}
.ft-nav-link:hover { color: #00F0FF; transform: translateX(4px); text-shadow: 0 0 8px rgba(0,240,255,0.6); }
.ft-nav-link:hover::after { right: 0; }
.ft-nav-bracket { color: rgba(0,240,255,0.4); transition: color 0.25s ease; }
.ft-nav-link:hover .ft-nav-bracket { color: #00F0FF; }

/* ── Social links ── */
.ft-social-link {
  position: relative; overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease;
}
.ft-social-link:hover { transform: translateY(-3px) rotate(-4deg); }
.ft-social-pulse {
  position: absolute; inset: 0; border-radius: inherit; pointer-events: none; opacity: 0;
  border: 1px solid rgba(0,240,255,0.6);
}
.ft-social-link:hover .ft-social-pulse { animation: ftHoloPulse 1.1s ease-out infinite; }
@keyframes ftHoloPulse {
  0% { opacity: 0; transform: scale(1); }
  40% { opacity: 0.7; }
  100% { opacity: 0; transform: scale(1.18); }
}

/* ── System panel ── */
.ft-sys-panel { box-shadow: 0 0 28px rgba(0,240,255,0.12), inset 0 0 28px rgba(0,240,255,0.05); }
.ft-sys-scan {
  position: absolute; left: 0; right: 0; top: 0; height: 2px; pointer-events: none; opacity: 0;
  background: linear-gradient(90deg, transparent, rgba(0,240,255,0.6), transparent);
}
.ft-sys-panel:hover .ft-sys-scan { animation: ftSysScan 1.6s linear; }
@keyframes ftSysScan {
  0% { transform: translateY(0); opacity: 0; }
  10% { opacity: 0.8; } 90% { opacity: 0.8; }
  100% { transform: translateY(360px); opacity: 0; }
}
.ft-status-dot {
  display: inline-block; width: 8px; height: 8px; border-radius: 50%;
  animation: ftPulse 1.8s ease-in-out infinite;
}
@keyframes ftPulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.25); opacity: 0.6; } }

/* contract address */
.ft-addr {
  position: relative; overflow: hidden;
  background: rgba(5,5,7,0.7); color: #FF00A8;
  text-shadow: 0 0 6px rgba(255,0,168,0.4);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.ft-addr.is-done { color: #00F0FF; border-color: rgba(0,240,255,0.7); box-shadow: 0 0 14px rgba(0,240,255,0.35); text-shadow: 0 0 6px rgba(0,240,255,0.5); }
.ft-addr::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(115deg, transparent 40%, rgba(255,0,168,0.10) 50%, transparent 60%);
  background-size: 200% 100%; animation: ftGlass 6s ease-in-out infinite;
  mix-blend-mode: screen;
}
@keyframes ftGlass { 0% { background-position: -120% 0; } 100% { background-position: 120% 0; } }
.ft-addr-cursor {
  display: inline-block; width: 7px; height: 12px; margin-left: 4px; vertical-align: -2px;
  background: #FF00A8; box-shadow: 0 0 6px #FF00A8;
  animation: ftCursorBlink 1s steps(2) infinite;
}
.ft-addr.is-done .ft-addr-cursor { background: #00F0FF; box-shadow: 0 0 6px #00F0FF; }
@keyframes ftCursorBlink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }

/* copy button */
.ft-copy {
  border-color: rgba(0,240,255,0.4); color: #00F0FF; background: rgba(8,10,18,0.7);
  position: relative; overflow: hidden; cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
}
.ft-copy:not(:disabled):hover { background: rgba(0,240,255,0.12); box-shadow: 0 0 14px rgba(0,240,255,0.35); }
.ft-copy.is-busy { border-color: rgba(255,230,0,0.6); color: #FFE600; background: rgba(255,230,0,0.08); cursor: progress; }
.ft-copy.is-done { border-color: rgba(57,255,20,0.7); color: #39FF14; background: rgba(57,255,20,0.12); box-shadow: 0 0 16px rgba(57,255,20,0.45); animation: ftCopyFlash 0.5s ease-out; }
@keyframes ftCopyFlash {
  0% { box-shadow: 0 0 0 rgba(57,255,20,0); }
  40% { box-shadow: 0 0 24px rgba(57,255,20,0.7); }
  100% { box-shadow: 0 0 16px rgba(57,255,20,0.45); }
}
.ft-copy::after {
  content: ''; position: absolute; left: -60%; top: 0; width: 40%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
  transform: skewX(-18deg); pointer-events: none;
}
.ft-copy:not(:disabled):hover::after { animation: ftCopyShine 0.9s ease; }
@keyframes ftCopyShine { 0% { left: -60%; } 100% { left: 120%; } }
.ft-spinner {
  width: 10px; height: 10px; border-radius: 50%;
  border: 2px solid rgba(255,230,0,0.3); border-top-color: #FFE600;
  animation: ftSpin 0.7s linear infinite; display: inline-block;
}
@keyframes ftSpin { to { transform: rotate(360deg); } }

/* reduced motion */
@media (prefers-reduced-motion: reduce) {
  .ft-grid, .ft-fog-blob, .ft-bin, .ft-particle, .ft-status-dot, .ft-termbar-dot,
  .ft-addr-cursor, .ft-spinner, .ft-sys-scan, .ft-social-pulse, .ft-watermark {
    animation: none !important;
  }
}
`}</style>
  );
}
