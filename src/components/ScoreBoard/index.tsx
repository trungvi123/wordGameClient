import { Table } from "react-bootstrap";
import {
  SportsScore,
  AccountCircle,
  MilitaryTech,
  Refresh,
} from "@mui/icons-material";
import classNames from "classnames/bind";

import { Fab } from "@mui/material";
import style from "./ScoreBoard.module.css";
import { useEffect, useState } from "react";
import wordApi from "../../api/wordApi";

interface IProps {
  showBoard: boolean;
}

interface ITopUser {
  email: string;
  maxScore: string;
}

const cx = classNames.bind(style);

export default function ScoreBoard(props: IProps) {
  const { showBoard } = props;
  const [topUsers, setTopUsers] = useState([]);
  const [refreshList, setRefreshList] = useState(false);

  useEffect(() => {
    const fectTopUser = async () => {
      const res: any = await wordApi.getTopUsers();
      setTopUsers(res.data);
    };
    fectTopUser();
  }, [refreshList]);

  return (
    <div
      className={cx("scoreBoard", { showBoard: showBoard ? showBoard : false })}
    >
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>
              <MilitaryTech></MilitaryTech>Rank
            </th>
            <th>
              <AccountCircle></AccountCircle> Player
            </th>
            <th>
              <SportsScore></SportsScore> Points
            </th>
          </tr>
        </thead>
        <tbody>
          {topUsers &&
            topUsers.map((e: ITopUser, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{e.email}</td>
                <td>{e.maxScore}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div>
        <Fab
          onClick={() => setRefreshList(!refreshList)}
          className={cx("floating-refresh")}
          size="small"
        >
          <Refresh />
        </Fab>
      </div>
    </div>
  );
}
