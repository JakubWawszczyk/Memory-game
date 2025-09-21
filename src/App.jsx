import { useState } from 'react';
import styles from './App.module.css';
import { MemoElement } from './components/MemoElement/MemoElement';
import icons from './data/icons';
import { initialMemos } from './data/memos';

function App() {
  // STATES
  const [isWin, setIsWin] = useState(false);
  const [memos, setMemos] = useState(initialMemos);
  const [randomIcons, setRandomIcons] = useState(randomizeIcons(icons));
  const [chosenPair, setChosenPair] = useState([]);
  const [isReset, setIsReset] = useState(false);

  // FUNCTION: shuffle icons
  function randomizeIcons(arr) {
    const copy = [...arr];
    const shuffled = [];

    while (copy.length > 0) {
      const randomIndex = Math.floor(Math.random() * copy.length);
      const [ico] = copy.splice(randomIndex, 1);
      shuffled.push(ico);
    }

    return shuffled;
  }

  return (
    <div className={styles.container}>
      <ul className={styles.memos}>
        {/* Render cards */}
        {memos.map(({ id, showedValue, isShow }) => (
          <MemoElement
            key={id}
            id={id}
            hiddenValue={randomIcons[id - 1]}
            showedValue={showedValue}
            isShow={isShow}
            gameStates={{
              setMemos,
              setChosenPair,
              chosenPair,
              isReset,
              setIsWin,
              memos,
            }}
          />
        ))}
      </ul>

      {/* Win message */}
      {isWin && <p className={styles.wonMessege}>Wygrałeś 🎉!</p>}

      {/* Reset button */}
      <button
        onClick={() => {
          setMemos(initialMemos);
          setRandomIcons(randomizeIcons(icons));
          setChosenPair([]);
          setIsReset(true);
          setIsWin(false);
        }}
        className={styles.reset}
      >
        Zresetuj
      </button>
    </div>
  );
}

export default App;
