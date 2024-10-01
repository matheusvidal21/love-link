"use client"

import React, { useState } from 'react';
import styles from './Door.module.scss';
import TextMorph from '../TextMorph/TextMorph';

const Door = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpread, setIsSpread] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [showTextMorph, setShowTextMorph] = useState(false);

  const enter = () => {
    if (hasEntered) return; // Evita múltiplos cliques após a entrada
    setIsOpen(true);
    setIsSpread(true);

    setTimeout(() => {
      setHasEntered(true);
      // Após a transição, exibimos o TextMorph
      setShowTextMorph(true);
    }, 500); // Ajuste o tempo conforme necessário
  };

  return (
    <div className={`${styles.container} ${hasEntered ? styles.entered : ''}`}>
      {!showTextMorph && (
        <div
          className={`${styles.jamb} ${isSpread ? styles.spread : ''}`}
          onClick={enter}
        >
          <div className={`${styles.side} ${styles.side1}`}></div>
          <div className={`${styles.side} ${styles.side2}`}></div>
          <div className={`${styles.side} ${styles.side3}`}></div>
          <div className={`${styles.side} ${styles.side4}`}></div>
          <div
            className={`${styles.door} ${styles.crack} ${isOpen ? styles.open : ''}`}
          >
            <div className={styles.knob}></div>
            <div className={styles.porthole}></div>
          </div>
        </div>
      )}
      {showTextMorph && <TextMorph />}
    </div>
  );
};

export default Door;
