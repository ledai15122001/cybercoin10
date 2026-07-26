import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * HowToBuy — acquisition-terminal boot sequence.
 *
 * Fires once when the section scrolls into view. Orchestrates a staged
 * "operating system powering on" reveal using only transform / opacity /
 * filter (no layout animations, no bounce). Reuses the global gsap +
 * ScrollTrigger setup established in useSmoothScroll. The continuous AI
 * float + periodic RGB glitch are started here too and run forever after.
 */
export function useHowToBuyBoot(rootRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const q = (sel: string) => gsap.utils.toArray<HTMLElement>(root.querySelectorAll(sel));

      // ── Initial hidden states ────────────────────────────────────────
      const title = q('.htb-title');
      const subtitle = q('.htb-subtitle');
      const divider = q('.htb-divider');
      const opFrame = q('.op-frame');
      const opRadar = q('.op-radar');
      const opHex = q('.op-hexgrid');
      const opBin = q('.op-binary');
      const opScan = q('.op-scanlines');
      const opParts = q('.op-particles');
      const opHolo = q('.op-holo-circle');
      const opStatus = q('.htb-op-status');
      const ct = q('.ct-wrap');
      const nc1 = root.querySelectorAll<HTMLElement>('.nc-wrap')[0];
      const nodes = q('.an-node');
      const nc2 = root.querySelectorAll<HTMLElement>('.nc-wrap')[1];
      const mfLine = root.querySelector<HTMLElement>('.mf-line');
      const mfMods = q('.mf-module');

      if (reduce) {
        gsap.set(
          [title, subtitle, divider, opFrame, opRadar, opHex, opBin, opScan, opParts, opHolo, opStatus, ct, nc1, nodes, nc2, mfMods],
          { opacity: 1, y: 0, x: 0, scaleY: 1, filter: 'none' },
        );
        return;
      }

      gsap.set([title, subtitle, opStatus, ct, nc1, nodes, nc2, mfMods], { opacity: 0, y: 24 });
      gsap.set(divider, { opacity: 0, scaleX: 0, transformOrigin: 'center center' });
      gsap.set([opRadar, opHex, opBin, opScan, opParts, opHolo], { opacity: 0 });
      gsap.set(opFrame, { opacity: 0, scale: 0.94, filter: 'blur(14px) brightness(0.4)' });
      gsap.set(mfLine, { scaleY: 0, transformOrigin: 'top center', opacity: 0 });
      gsap.set(mfMods, { y: 30, opacity: 0 });

      // ── Boot timeline ────────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 78%',
          once: true,
        },
      });

      tl // 1. Title fades upward
        .to(title, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        // 2. Subtitle appears
        .to(subtitle, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.25')
        // divider draws in
        .to(divider, { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2')
        // 3. AI hologram powers on
        .to(opFrame, { opacity: 1, scale: 1, filter: 'blur(0px) brightness(1)', duration: 0.9, ease: 'power2.out' }, '-=0.1')
        // 4. HUD rings activate (radar / hex / binary / scanlines / particles / holo circles)
        .to([opRadar, opHex], { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.5')
        .to([opScan, opBin], { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.35')
        .to([opParts, opHolo], { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.35')
        // operator status panel
        .to(opStatus, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
        // 6. Contract terminal boots
        .to(ct, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.25')
        .to(nc1, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.15')
        // 7. Access nodes appear one by one
        .to(nodes, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', stagger: 0.12 }, '-=0.1')
        .to(nc2, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.1')
        // 8. Neural data line draws downward
        .to(mfLine, { opacity: 1, scaleY: 1, duration: 0.7, ease: 'power2.inOut' }, '-=0.05')
        // 10. Mission modules reveal sequentially
        .to(mfMods, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.14 }, '-=0.35');

      // ── Continuous AI animations (run forever after boot) ────────────
      const portrait = root.querySelector<HTMLElement>('.op-portrait');
      const aiTweens: gsap.core.Tween[] = [];

      if (portrait) {
        // Floating 6–10px, smooth yoyo, no bounce
        aiTweens.push(
          gsap.to(portrait, {
            y: -8,
            duration: 3.4,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 1.2,
          }),
        );
      }

      // Periodic RGB glitch on the portrait wrapper — short, controlled
      const opFrameEl = root.querySelector<HTMLElement>('.op-frame');
      let glitchTimer: number | undefined;
      if (opFrameEl) {
        const runGlitch = () => {
          const tlg = gsap.timeline();
          tlg
            .to(opFrameEl, { x: -3, filter: 'drop-shadow(2px 0 0 rgba(255,0,168,0.7))', duration: 0.06, ease: 'none' })
            .to(opFrameEl, { x: 3, filter: 'drop-shadow(-2px 0 0 rgba(0,240,255,0.7))', duration: 0.06, ease: 'none' })
            .to(opFrameEl, { x: 0, filter: 'drop-shadow(0 0 0 transparent)', duration: 0.1, ease: 'power2.out' });
          glitchTimer = window.setTimeout(runGlitch, 3500 + Math.random() * 2500);
        };
        glitchTimer = window.setTimeout(runGlitch, 2600);
      }

      return () => {
        aiTweens.forEach((t) => t.kill());
        if (glitchTimer) clearTimeout(glitchTimer);
      };
    }, root);

    return () => ctx.revert();
  }, [rootRef]);
}
