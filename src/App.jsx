import { useEffect, useState } from "react";
import "./App.css";
import Board from "./assets/gameboard";

function App() {
  const [rows, setRows] = useState(5);
  const [columns, setColumns] = useState(5);
  const [cells, setCells] = useState(Array(rows * columns).fill(""));
  const [answer, setAnswer] = useState([]);
  const [isSelected, setIsSelected] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const [countDown, setCountDown] = useState(3);

  useEffect(() => {
    setChords();
  }, []);

  const handleClick = (index) => {
    setIsSelected((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((item) => item !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  const setChords = () => {
    //  Horizontal
    let unvailableNumbers = [];
    let unvailableCell = rows - 2;
    while (unvailableCell < cells.length) {
      unvailableNumbers.push(unvailableCell);
      unvailableCell += columns;
    }
    const length = unvailableNumbers.length;
    for (let i = 0; i < length; i++) {
      unvailableNumbers.push(unvailableNumbers[i] + 1);
    }

    let randomNumber;
    while (
      unvailableNumbers.includes(
        (randomNumber = Math.floor(Math.random() * (cells.length + 1)))
      )
    );
    let fillCells = [...cells];
    let initialNumber = Math.ceil(Math.random() * 12);
    fillCells[randomNumber] = initialNumber;
    let third = (initialNumber + 4) % 12 || 12;
    let fifth = (initialNumber + 7) % 12 || 12;
    fillCells[randomNumber + 1] = third;
    fillCells[randomNumber + 2] = fifth;

    //  Horizontal
    unvailableNumbers = [];
    fillCells.forEach((cell, index) => {
      if (cell !== "") {
        unvailableNumbers.push(index);
      }
    });
    for (let i = cells.length; i >= cells.length - columns * 2; i--) {
      unvailableNumbers.push(i);
    }
    randomNumber = "";
    while (
      unvailableNumbers.includes(
        (randomNumber = Math.floor(Math.random() * (cells.length + 1)))
      ) ||
      unvailableNumbers.includes(randomNumber + columns) ||
      unvailableNumbers.includes(randomNumber + columns * 2)
    );
    initialNumber = Math.ceil(Math.random() * 12);
    fillCells[randomNumber] = initialNumber;
    third = (initialNumber + 4) % 12 || 12;
    fifth = (initialNumber + 7) % 12 || 12;
    fillCells[randomNumber + columns] = third;
    fillCells[randomNumber + columns * 2] = fifth;
    let filledCells = [];
    fillCells.forEach((cell, index) => {
      if (cell !== "") {
        filledCells.push(index);
      }
    });
    setAnswer(filledCells);

    for (let i = 0; i < cells.length; i++) {
      if (!filledCells.includes(i)) {
        fillCells[i] = Math.ceil(Math.random() * 12);
      }
    }
    setCells(fillCells);
  };

  const checkDoku = () => {
    const isCorrect = answer.every((value) => isSelected.includes(value));
    const isCorrectLength = isSelected.length === answer.length;
    if (isCorrect && isCorrectLength) {
      setIsWon(true);
      setCells(Array(rows * columns).fill(""));
      setAnswer([]);
      setIsSelected([]);
      setCountDown(3);
      const intervalID = setInterval(() => {
        setCountDown((prevCount) => {
          if (prevCount === 1) {
            clearInterval(intervalID);
            setIsWon(false);
          }
          return prevCount - 1;
        });
      }, 1000);
    }
  };

  useEffect(() => {
    if (answer.length === 0) {
      setChords();
    }
  }, [isWon]);

  return (
    <>
      <div className="board-container">
        <h1>Sopa de acordes</h1>
        <div className="chord-type">Tipo de acorde: Mayor</div>
        {isWon ? (
          `Ganaste ${countDown}`
        ) : (
          <>
            <Board
              rows={rows}
              columns={columns}
              cells={cells}
              answer={answer}
              onCellClick={handleClick}
              isSelected={isSelected}
            />
            <button onClick={checkDoku} className="check">
              Check
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
