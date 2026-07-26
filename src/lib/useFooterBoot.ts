import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Sticky reveal footer — "final terminal" boot sequence.
 *
 * Fires once when the footer scrolls into view. Orchestrates a staged
 * classified-system-coming-online reveal using only transform / opacity /
 * filter. Drives the SYSTEM STATUS text cycle
 * (INITIALIZING → LINK ESTABLISHED → VERIFYING NETWORK → SYSTEM ONLINE),
 * the boot log, the watermark parallax + periodic glitch, and leaves the
 * continuous CSS atmosphere running. Reuses the global gsap + ScrollTrigger
 * setup from useSmoothScroll.
 */
export function useFooterBoot(rootRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const q = <T extends HTMLElement>(s: string) => Array.from(root.querySelectorAll<T>(s));
      const glow = root.querySelector<HTMLElement>('.ft-glow');
      const grid = root.querySelector<HTMLElement>('.ft-grid');
      const watermark = root.querySelector<HTMLElement>('.ft-watermark');
      const hud = q<HTMLElement>('.ft-hud');
      const termbar = root.querySelector<HTMLElement>('.ft-termbar');
      const logo = root.querySelector<HTMLElement>('.ft-logo');
      const tagline = root.querySelector<HTMLElement>('.ft-tagline');
      const desc = root.querySelector<HTMLElement>('.ft-desc');
      const buyBtn = root.querySelector<HTMLElement>('.ft-buy');
      const navLabel = root.querySelector<HTMLElement>('.ft-nav-label');
      const navLinks = q<HTMLElement>('.ft-nav a');
      const socLabel = root.querySelector<HTMLElement>('.ft-social-label');
      const socLinks = q<HTMLElement>('.ft-social a');
      const sysPanel = root.querySelector<HTMLElement>('.ft-sys-panel');
      const statusVal = root.querySelector<HTMLElement>('.ft-status-value');
      const statusDot = root.querySelector<HTMLElement>('.ft-status-dot');
      const logLines = q<HTMLElement>('.ft-log-line');
      const net = root.querySelector<HTMLElement>('.ft-net');
      const contract = root.querySelector<HTMLElement>('.ft-contract');
      const bottom = root.querySelector<HTMLElement>('.ft-bottom');

      const setStatus = (text: string, color: string) => {
        if (statusVal) statusVal.textContent = text;
        if (statusDot) {
          statusDot.style.background = color;
          statusDot.style.boxShadow = `0 0 10px ${color}`;
        }
      };

      if (reduce) {
        gsap.set(
          [glow, grid, watermark, hud, termbar, logo, tagline, desc, buyBtn, navLabel, navLinks, socLabel, socLinks, sysPanel, net, contract, bottom, logLines],
          { opacity: 1, y: 0, x: 0, scale: 1, filter: 'none' },
        );
        setStatus('SYSTEM ONLINE', '#39FF14');
        return;
      }

      gsap.set([glow, grid, watermark], { opacity: 0 });
      gsap.set(hud, { opacity: 0, scale: 0.6 });
      gsap.set(termbar, { opacity: 0, y: -12 });
      gsap.set([logo, tagline, desc, buyBtn, navLabel, navLinks, socLabel, socLinks, sysPanel, net, contract, bottom], { opacity: 0, y: 22 });
      gsap.set(logLines, { opacity: 0, x: -10 });
      if (statusVal) statusVal.textContent = '';

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 85%', once: true },
      });

      tl
        // 1. ambient glow + grid + watermark fade in
        .to(glow, { opacity: 1, duration: 1.0, ease: 'power2.out' })
        .to(grid, { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.7')
        .to(watermark, { opacity: 1, duration: 1.2, ease: 'power2.out' }, '-=0.8')
        // 2. terminal bar + HUD corners activate
        .to(termbar, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.6')
        .to(hud, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(2)' }, '-=0.4')
        // 3. LEFT — logo, tagline, description, buy
        .to(logo, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .to(tagline, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
        .to(desc, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.25')
        .to(buyBtn, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
        // 4. CENTER — nav + socials
        .to(navLabel, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.25')
        .to(navLinks, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power3.out' }, '-=0.2')
        .to(socLabel, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.25')
        .to(socLinks, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power3.out' }, '-=0.2')
        // 5. RIGHT — system panel boots
        .to(sysPanel, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.35')
        // status cycle
        .call(() => setStatus('INITIALIZING...', '#FFE600'))
        .to(logLines[0], { opacity: 1, x: 0, duration: 0.3 }, '-=0.1')
        .call(() => setStatus('LINK ESTABLISHED', '#00F0FF'), undefined, '+=0.6')
        .to(logLines[1], { opacity: 1, x: 0, duration: 0.3 }, '-=0.1')
        .call(() => setStatus('VERIFYING NETWORK', '#FF00A8'), undefined, '+=0.7')
        .to(logLines[2], { opacity: 1, x: 0, duration: 0.3 }, '-=0.1')
        .call(() => setStatus('SYSTEM ONLINE', '#39FF14'), undefined, '+=0.7')
        .to(logLines[3], { opacity: 1, x: 0, duration: 0.3 }, '-=0.1')
        // network + contract
        .to(net, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.25')
        .to(contract, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.25')
        // 6. bottom — disclaimer + copyright
        .to(bottom, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.25');

      // watermark parallax — drifts as the footer reveals
      gsap.to(watermark, {
        yPercent: -16,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom bottom', scrub: 0.5 },
      });

      // periodic watermark RGB glitch
      let glitchTimer: number | undefined;
      const runGlitch = () => {
        const tlg = gsap.timeline();
        tlg
          .to(watermark, { x: -6, filter: 'drop-shadow(3px 0 0 rgba(255,0,168,0.5))', duration: 0.07, ease: 'none' })
          .to(watermark, { x: 5, filter: 'drop-shadow(-3px 0 0 rgba(0,240,255,0.5))', duration: 0.07, ease: 'none' })
          .to(watermark, { x: 0, filter: 'none', duration: 0.12, ease: 'power2.out' });
        glitchTimer = window.setTimeout(runGlitch, 5000 + Math.random() * 3000);
      };
      glitchTimer = window.setTimeout(runGlitch, 3200);

      return () => {
        if (glitchTimer) clearTimeout(glitchTimer);
      };
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}
