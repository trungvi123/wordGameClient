import { useSelector } from "react-redux";
import { IRootState } from "../interface";

import Square from "../Square";
import './Board.css'

function Board() {
  const board = useSelector((state: IRootState) => state.board.board);

  return (
    <div className="board-container">
        <div className="board">
          {board.map((e,index) => {
            return <Square key={index} value={e} squareInd={index}></Square>;
          })}
        </div>
    </div>
  );
}

export default Board;
