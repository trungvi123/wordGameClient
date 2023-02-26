import { useSelector, useDispatch } from "react-redux";
import { setBoard, plusPosition } from "../../redux/boardSlice";

import { IRootState } from "../interface";

import "./Key.css";

interface IProps {
  char: string;
}

function Key(props: IProps) {
  const { char } = props;
  const board = useSelector((state: IRootState) => state.board.board);
  const position = useSelector((state: IRootState) => state.board.position);
  const currentRow = useSelector((state: IRootState) => state.board.currentRow);

  const dispatch = useDispatch();

  const chooseChar = () => {
    // phải bấm enter khi đủ 5 từ vd position = 5 | 10 | 15 ... thì mới nhập tiếp đc
    if (position >= 30) return;
    if (Math.floor(position / 5) <= currentRow) {
      const newBoard = [...board];
      newBoard[position] = char;
      dispatch(setBoard(newBoard));
      dispatch(plusPosition());
    }
  };

  return (
    <div className="char" onClick={chooseChar}>
      {char}
    </div>
  );
}

export default Key;
