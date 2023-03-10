import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import wordApi from "../../api/wordApi";

import {
  minusPosition,
  plusRow,
  setBoard,
  setEnterClick,
  setGetWord,
  setInitialBoard,
  setLs,
  setMs,
} from "../../redux/boardSlice";
import { setToast } from "../../redux/toastSlice";
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
  const ls = useSelector((state: IRootState) => state.board.ls);
  const ms = useSelector((state: IRootState) => state.board.ms);
  const word = useSelector((state: IRootState) => state.board.word);

  const iduser = useSelector((state: IRootState) => state.auth.id);

  const dispatch = useDispatch();
  let correctWord: string = word;

  const clickBack = () => {
    if (Math.floor((position - 1) / 5) < currentRow) return; // chỉ xóa trên dòng chưa bấm enter

    const newBoard = [...board];
    newBoard[position - 1] = "";

    dispatch(setBoard(newBoard));
    dispatch(minusPosition());
  };

  const clickEnter = async () => {
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
        dispatch(setLs(ls + 10));
        if (ls + 10 >= ms) {
          // neu diem hien tai cong 10 lon hon diem cao nhat thi cap nhat lai diem cao nhat luon
          dispatch(setMs(ls + 10));
        }
        dispatch(
          setToast({
            type: "success",
            heading: "Wow!!",
            content: "Câu trả lời chính xác, bạn được thêm 10 điểm",
            show: true,
          })
        );

        setTimeout(() => {
          dispatch(setInitialBoard());
        }, 2000);
        dispatch(setGetWord());

        // const result = await wordApi.upls({ _id: iduser, ls });
        // if (ls > ms) {
        // const res = await wordApi.upms({ _id: iduser, ms });
        // }
      } else {
        if (currentRow === 5) {
          dispatch(
            setToast({
              type: "danger",
              heading: "Tiếc quá :((",
              content:
                "Bạn đã hết lượt đoán, điểm của bạn sẽ được chúng tôi lưu lại",
              show: true,
            })
          );
          dispatch(setInitialBoard());
        }
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
          <div className="keyBoard-container" key={idx}>
            {idx === 2 && (
              <span className="letter-row" onClick={clickEnter}>
                Enter
              </span>
            )}

            {e.split(" ").map((char, idx) => {
              return (
                <div className="char-row" key={idx}>
                  <Key char={char}></Key>
                  {char === "M" && (
                    <span className="key-btn" onClick={clickBack}>
                      {" "}
                      Back{" "}
                    </span>
                  )}
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
