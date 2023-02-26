import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  minusPosition,
  plusRow,
  setBoard,
  setEnterClick,
} from "../../redux/boardSlice";
import { IRootState } from "../interface";
import Key from "../Key";
import "./KeyBoard.css";

function KeyBoard() {
  const keyBoard: string[] = [
    "Q W E R T Y U I O P",
    "A S D F G H J K L",
    "Z X C V B N M",
  ];

  const position = useSelector((state: IRootState) => state.board.position);
  const board = useSelector((state: IRootState) => state.board.board);
  const currentRow = useSelector((state: IRootState) => state.board.currentRow);

  const dispatch = useDispatch();
  const correctWord: string = "EARLY";

  const clickBack = () => {
    if (Math.floor((position - 1) / 5) < currentRow) return; // chỉ xóa trên dòng chưa bấm enter

    const newBoard = [...board];
    newBoard[position - 1] = "";

    dispatch(setBoard(newBoard));
    dispatch(minusPosition());
  };

  const clickEnter = () => {
    if (Math.floor(position / 5) > currentRow) {
      // chỉ bấm enter khi nhập đủ 5 kí tự
      if (
        correctWord ===
        board[position - 5] +
          board[position - 4] +
          board[position - 3] +
          board[position - 2] +
          board[position - 1]
      ) {
        // đúng
        // alert('Chính xác')
      }
      dispatch(plusRow());
      dispatch(setEnterClick());
    }
    // console.log("dang o vi tri ", position - (5 + 5 * (currentRow - 1)) - 1);
  };

  return (
    <div className="keyBoard">
      {keyBoard.map((e, idx) => {
        return (
          <div className="row" key={idx}>
            {idx === 2 && (
              <span className="letter-row" onClick={clickEnter}>
                Enter
              </span>
            )}

            {e.split(" ").map((char, idx) => {
              return (
                <div className="char-row" key={idx}>
                  <Key char={char}></Key>
                  {char === "M" && <span onClick={clickBack}> Back </span>}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default KeyBoard;
