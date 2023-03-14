import { Table } from "react-bootstrap";
import classNames from "classnames/bind";
import { Lightbulb } from "@mui/icons-material";

import { Fab } from "@mui/material";
import style from "./Guild.module.css";

interface IProps {
  showGuild: boolean;
}

const cx = classNames.bind(style);

export default function Guild(props: IProps) {
  const { showGuild } = props;

  return (
    <div className={cx("guild", { showGuild: showGuild ? showGuild : false })}>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>
              <Lightbulb></Lightbulb> Guild
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="d-flex align-items-center">
              <div className={cx("squareColor","m-1", "green")}></div> đúng kí tự
              và vị trí
            </td>
          </tr>
          <tr>
            <td className="d-flex align-items-center">
              <div className={cx("squareColor","m-1", "yellow")}></div> đúng kí tự
              nhưng sai vị trí
            </td>
          </tr>
          <tr>
            <td className="d-flex align-items-center">
              <div className={cx("squareColor","m-1", "gray")}></div> không có kí
              tự này
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
