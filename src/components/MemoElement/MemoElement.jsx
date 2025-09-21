import { useState } from 'react';
import styles from './MemoElement.module.css';
export function MemoElement({
  showedValue,
  hiddenValue,
  isShow,
  id,
  gameStates,
}) {
  const isActive = false;
  const { setMemos, chosenPair, setChosenPair, isReset, setIsWin, memos } =
    gameStates;
  const activeClass = isReset ? false : isActive;
  function flipCard(id) {
    setMemos((prev) => {
      const updatedMemos = prev.map((memo) =>
        memo.id === id ? { ...memo, isShow: true } : memo
      );

      const shownCards = updatedMemos.filter((memo) => memo.isShow).length;
      if (shownCards === updatedMemos.length) {
        setIsWin(true);
      }

      return updatedMemos;
    });
  }
  function handlePair(hiddenValue, id) {
    setChosenPair((prev) => {
      const newPair = [...prev, [hiddenValue, id]];

      if (newPair.length === 2) {
        if (newPair[0][0] === newPair[1][0]) {
          // para dopasowana, resetujemy wybrane
          setChosenPair([]);
        } else {
          // para niedopasowana, ukrywamy karty po 0.8s
          setTimeout(() => {
            setMemos((prevMemos) =>
              prevMemos.map((memo) =>
                memo.id === newPair[0][1] || memo.id === newPair[1][1]
                  ? { ...memo, isShow: false }
                  : memo
              )
            );
            setChosenPair([]);
          }, 800);
        }
      }

      return newPair;
    });
  }
  const handleClick = () => {
    if (isShow || chosenPair.length >= 2) return;
    else {
      flipCard(id);
      handlePair(hiddenValue, id);
    }
  };
  return (
    <li
      onClick={() => {
        handleClick();
      }}
      className={`${styles.card}   ${isShow ? styles['card-show'] : ''} 
      ${activeClass ? styles.nonActive : ''}`}
    >
      {isShow ? hiddenValue : showedValue}
    </li>
  );
}
