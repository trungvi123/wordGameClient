import Table from "react-bootstrap/Table";
import {
  AccountCircle,Description
} from "@mui/icons-material";
import classNames from "classnames/bind";
import style from "./InforWord.module.css";
import { useSelector } from "react-redux";
import { IRootState } from "../interface";

interface IProps {
  showInfor: boolean;
}

const cx = classNames.bind(style);

function InforWord(props: IProps) {
  const { showInfor } = props;

  const author = useSelector((state:IRootState)=>state.board.author)
  const authorNote = useSelector((state:IRootState)=>state.board.authorNote)



  return (
    <div
      className={cx("inforWord", {
        showInforWord: showInfor ? showInfor : false,
      })}
    >
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th><AccountCircle></AccountCircle> Author</th>
            <th><Description></Description> Author Note</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{author}</td>
            <td>{authorNote}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default InforWord;
