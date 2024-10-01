import React, { useEffect, useRef, useState } from 'react';
import styles from './TextMorph.module.scss';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import("@/components/MapComponent/MapComponent"), { ssr: false });

const TextMorph = () => {
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);
  const [showStoryWithMap, setShowStoryWithMap] = useState(false);

  const texts = [
    "Cada história",
    "de amor",
    "merece ser",
    "contada...",
    "E a nossa",
    "não poderia",
    "ser diferente.",
  ];

  const morphTime = 1.1;
  const cooldownTime = 0.25;

  let textIndex = texts.length - 1;
  let time = new Date();
  let morph = 0;
  let cooldown = cooldownTime;

  useEffect(() => {
    const elts = {
      text1: text1Ref.current!,
      text2: text2Ref.current!
    };

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex++;
        }

        doMorph();
      } else {
        doCooldown();
      }
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;

      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    };

    const setMorph = (fraction: number) => {
      elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      fraction = 1 - fraction;
      elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      elts.text1.textContent = texts[textIndex % texts.length];
      elts.text2.textContent = texts[(textIndex + 1) % texts.length];
    };

    const doCooldown = () => {
      morph = 0;

      elts.text2.style.filter = '';
      elts.text2.style.opacity = '100%';

      elts.text1.style.filter = '';
      elts.text1.style.opacity = '0%';
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleNext = () => {
    setShowStoryWithMap(true);
  };

  if (showStoryWithMap) {
    return <MapComponent />;
  }

  return (
    <>
      <div id={styles.container}>
        <span id={styles.text1} ref={text1Ref}></span>
        <span id={styles.text2} ref={text2Ref}></span>
      </div>
      <svg id={styles.filters}>
        <defs>
          <filter id="threshold">
            <feColorMatrix in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140" />
          </filter>
        </defs>
      </svg>
      <div className={styles['button-container']}>
        <button className={styles['next-button']} onClick={handleNext}>Avançar</button>
      </div>
    </>
  );
};

export default TextMorph;
