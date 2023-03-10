import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import {
  Wallpaper,
  MilitaryTech,
  Info,
  EmojiEvents,
} from "@mui/icons-material";
import jwtDecode from "jwt-decode";

import ScoreBoard from "../../components/ScoreBoard";
import Board from "../../components/Board";
import Heading from "../../components/Heading";
import KeyBoard from "../../components/KeyBoard";
import BackgrClip from "../../components/BackgrClip";
import wordApi, { upms } from "../../api/wordApi";
import InforWord from "../../components/InforWord";
import { IRootState } from "../../components/interface";
import { setAuthor, setAuthorNote, setWord } from "../../redux/boardSlice";
import "./Home.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

interface wtoken {
  w: string;
  author: string;
  authorNote: string;
}

function Home() {
  const [indxBg, setIndxBg] = useState<number>(0);
  const [showBoard, setShowBoard] = useState<boolean>(false);
  const [showInforWord, setShowInforWord] = useState<boolean>(false);

  const getWord = useSelector((state: IRootState) => state.board.getWord);
  const crrrow = useSelector((state: IRootState) => state.board.currentRow);

  const ls = useSelector((state: IRootState) => state.board.ls);
  const ms = useSelector((state: IRootState) => state.board.ms);
  const _id = useSelector((state: IRootState) => state.auth.id);

  const dispatch = useDispatch();

  const handleChangeBg = () => {
    if (indxBg === 8) {
      setIndxBg(0);
    } else {
      setIndxBg(indxBg + 1);
    }
  };

  useEffect(() => {
    const getWord = async () => {
      const res: any = await wordApi.getWord();
      if (res.state === "success") {
        let tk = res.wtoken.replace("fghjawawpznd", "");
        tk = tk.replace("SizurTePdhkzvE", "");
        const word: wtoken = jwtDecode(tk);
        dispatch(setWord(word.w.toUpperCase()));
        dispatch(setAuthor(word.author));
        dispatch(setAuthorNote(word.authorNote));
      }
    };
    getWord();
  }, [getWord]);

  useEffect(() => {
    if (ms > 0 && crrrow > 0) {
      const getCk = async () => {
        const res: any = await wordApi.getCookie();
        if (res.state === "success") {
          const updt = async () => {
            const payload: upms = {
              _id,
              score: ms,
            };
            await wordApi.upms(payload);
          };
          updt();
        }
      };
      getCk();
    }
  }, [ms]);

  return (
    <div className="h-100">
      <Heading type="transparent"></Heading>
      <div className="currentScore">
        <h3>Scores: {ls}</h3>
        <EmojiEvents fontSize="large" />
      </div>
      <Board></Board>
      <KeyBoard></KeyBoard>
      <InforWord showInfor={showInforWord}></InforWord>
      <ScoreBoard showBoard={showBoard}></ScoreBoard>
      <BackgrClip indexBg={indxBg}></BackgrClip>

      <OverlayTrigger
        placement={"right"}
        overlay={<Tooltip id={`tooltip-right`}>Rank</Tooltip>}
      >
        <Fab
          className="floating-btn1"
          color="info"
          onClick={() => setShowBoard(!showBoard)}
        >
          <MilitaryTech />
        </Fab>
      </OverlayTrigger>

      <OverlayTrigger
        placement={"right"}
        overlay={<Tooltip id={`tooltip-right`}>Change the background</Tooltip>}
      >
        <Fab className="floating-btn2" color="info" onClick={handleChangeBg}>
          <Wallpaper />
        </Fab>
      </OverlayTrigger>

      <OverlayTrigger
        placement={"left"}
        overlay={<Tooltip id={`tooltip-left`}>Information of the word</Tooltip>}
      >
        <Fab
          className="floating-btn3"
          color="info"
          onClick={() => setShowInforWord(!showInforWord)}
        >
          <Info />
        </Fab>
      </OverlayTrigger>
    </div>
  );
}

export default Home;
