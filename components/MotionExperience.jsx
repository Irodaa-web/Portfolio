'use client';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export default function MotionExperience() {
  const [intro, setIntro] = useState(true);
  const [paused, setPaused] = useState(false);
  const glow = useRef(null);
  const progress = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) setIntro(false);
    const timeout = window.setTimeout(() => setIntro(false), 2100);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? 'paused' : 'on';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    const art = document.querySelector('.hero-art');
    let moveFrame = 0;
    let scrollFrame = 0;
    function reset() {
      art?.style.removeProperty('--tilt-x');
      art?.style.removeProperty('--tilt-y');
      if (glow.current) glow.current.style.opacity = '0';
    }
    function move(event) {
      if (paused || reduced.matches || !finePointer.matches) return;
      cancelAnimationFrame(moveFrame);
      moveFrame = requestAnimationFrame(() => {
        if (glow.current) {
          glow.current.style.transform = `translate3d(${event.clientX - 180}px, ${event.clientY - 180}px, 0)`;
          glow.current.style.opacity = '.6';
        }
        if (art) {
          const box = art.getBoundingClientRect();
          const x = Math.max(-1, Math.min(1, (event.clientX - box.left - box.width / 2) / box.width));
          const y = Math.max(-1, Math.min(1, (event.clientY - box.top - box.height / 2) / box.height));
          art.style.setProperty('--tilt-x', `${-y * 6}deg`);
          art.style.setProperty('--tilt-y', `${x * 8}deg`);
        }
      });
    }
    function scroll() {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if (progress.current) progress.current.style.transform = `scaleX(${total > 0 ? Math.min(1, window.scrollY / total) : 0})`;
      });
    }
    function preferencesChanged() { reset(); }
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', reset);
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', scroll);
    reduced.addEventListener('change', preferencesChanged);
    reset(); scroll();
    return () => {
      cancelAnimationFrame(moveFrame); cancelAnimationFrame(scrollFrame);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', reset);
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', scroll);
      reduced.removeEventListener('change', preferencesChanged);
      reset(); delete document.documentElement.dataset.motion;
    };
  }, [paused]);

  return <>
    {intro && !paused && <div className="intro-screen" aria-hidden="true"><div className="intro-content"><span className="intro-bracket">&lt;</span><span className="intro-name">iroda<span>.</span></span><span className="intro-bracket">/&gt;</span><p>G‘OYALAR KODGA AYLANADIGAN JOY</p><div className="intro-line"/></div><span className="intro-caption">WELCOME TO MY DIGITAL SPACE</span></div>}
    <div ref={glow} className="cursor-glow" aria-hidden="true"/>
    <div ref={progress} className="reading-progress" aria-hidden="true"/>
    <button type="button" className="motion-toggle" aria-label={paused ? 'Animatsiyalarni yoqish' : 'Animatsiyalarni to‘xtatish'} aria-pressed={paused} onClick={() => { setPaused(v => !v); setIntro(false); }}>{paused ? <Play size={14}/> : <Pause size={14}/>}<span>{paused ? 'Harakatni yoqish' : 'Harakatni to‘xtatish'}</span></button>
  </>;
}

export function HeroAtmosphere() {
  return <div className="hero-atmosphere" aria-hidden="true"><div className="aurora aurora-a"/><div className="aurora aurora-b"/><div className="hero-grid"/>{Array.from({ length: 12 }, (_, i) => <span key={i} className="code-particle" style={{ '--x': `${(i * 29 + 7) % 96}%`, '--y': `${(i * 19 + 11) % 88}%`, '--duration': `${12 + i % 5 * 3}s`, '--delay': `${-i * 2}s` }}>{['{ }', '</>', '+', '01'][i % 4]}</span>)}</div>;
}
