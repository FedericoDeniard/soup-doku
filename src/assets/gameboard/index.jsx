import React from "react";
import "./index.css";

const Board = ({ rows, columns, cells, answer, onCellClick, isSelected }) => {
  const mapNumberToNote = (number) => {
    switch (number) {
      case 1:
        return "C";
      case 2:
        return "C#";
      case 3:
        return "D";
      case 4:
        return "D#";
      case 5:
        return "E";
      case 6:
        return "F";
      case 7:
        return "F#";
      case 8:
        return "G";
      case 9:
        return "G#";
      case 10:
        return "A";
      case 11:
        return "A#";
      case 12:
        return "B";
      default:
        return "";
    }
  };

  const Cell = ({ value, index }) => {
    const isAnswer = answer.includes(index);
    const isSelectedClass = isSelected.includes(index) ? "selected" : "";
    const displayedValue = value !== "" ? mapNumberToNote(value) : "";

    return (
      <td className="cell">
        <input
          className={`input ${
            isAnswer ? "answer" : "random"
          } ${isSelectedClass}`}
          readOnly={true}
          disabled={false}
          type="text"
          value={displayedValue}
          onClick={() => onCellClick(index)}
        />
      </td>
    );
  };

  const rowsArray = [];
  for (let i = 0; i < rows; i++) {
    rowsArray.push(
      <tr key={`row-${i}`}>
        {Array(columns)
          .fill()
          .map((_, index) => (
            <Cell
              key={`cell-${i}-${index}`}
              value={cells[i * columns + index]}
              index={i * columns + index}
              onCellClick={onCellClick}
            />
          ))}
      </tr>
    );
  }

  return (
    <table className="board">
      <tbody>{rowsArray}</tbody>
    </table>
  );
};

export default Board;
