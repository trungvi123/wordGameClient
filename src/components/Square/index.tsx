import { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { IRootState } from "../interface";

import style from "./Square.module.css";
import WordContext from "../../storeContext/WordContext";

const cx = classNames.bind(style);
interface IProps {
  value: string;
  squareInd: number;
}

function Square(props: IProps) {
  const { value, squareInd } = props;

  // Redux State

  const position = useSelector((state: IRootState) => state.board.position);
  const currentRow = useSelector((state: IRootState) => state.board.currentRow);

  // use Context
  const wordContextt = useContext(WordContext);

  // State
  const [correct, setCorrect] = useState<boolean>(false);
  const [almost, setAlmost] = useState<boolean>(false);
  const [wrong, setWrong] = useState<boolean>(false);

  let correctWord: string = wordContextt.word;
  let arrCorrectWord: string[] = [];

  for (var i = 0; i < correctWord.length; i++) {
    arrCorrectWord.push(correctWord[i]);
  }

  useEffect(() => {
    const charIndex: number = position - (5 + 5 * (currentRow - 1)) - 1; // vị trí của kí tự vừa nhập
    if (arrCorrectWord[charIndex] === value) {
      setCorrect(true);
    } else if (!correct && value !== "" && arrCorrectWord.includes(value)) {
      setAlmost(true);
    } else if (!correct && value !== "" && !arrCorrectWord.includes(value)) {
      setWrong(true);
    }
    return () => {
      setAlmost(false);
      setWrong(false);
      setCorrect(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div
      className={cx("square", {
        correct: correct && Math.floor(squareInd / 5) < currentRow,
        almost: almost && Math.floor(squareInd / 5) < currentRow,
        wrong: wrong && Math.floor(squareInd / 5) < currentRow,
      })}
    >
      {value}
    </div>
  );
}

export default Square;
