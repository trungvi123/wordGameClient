import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState,useContext } from "react";
import { Fab } from "@mui/material";
import {
  Wallpaper,
  MilitaryTech,
  Info,
  EmojiEvents,
  Lightbulb,
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
import { setAuthor, setAuthorNote } from "../../redux/boardSlice";
import "./Home.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Guild from "../../components/Guild";
import wordContext from '../../storeContext/WordContext.js'


interface wtoken {
  w: string;
  author: string;
  authorNote: string;
}

function Home() {
  const [indxBg, setIndxBg] = useState<number>(0);

  const [showBoard, setShowBoard] = useState<boolean>(false);
  const [showInforWord, setShowInforWord] = useState<boolean>(false);
  const [showGuild, setShowGuild] = useState<boolean>(false);

  const getWord = useSelector((state: IRootState) => state.board.getWord);
  const crrrow = useSelector((state: IRootState) => state.board.currentRow);

  const ls = useSelector((state: IRootState) => state.board.ls);
  const ms = useSelector((state: IRootState) => state.board.ms);
  const _id = useSelector((state: IRootState) => state.auth.id);

  const wordContextt = useContext(wordContext)

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

      if (res && res.state === "success") {
        let tk = res.wtoken.replace("fghjawawpznd", "");
        tk = tk.replace("SizurTePdhkzvE", "");
        const word: wtoken = jwtDecode(tk);
        wordContextt.setWord(word.w.toUpperCase())
        dispatch(setAuthor(word.author));
        dispatch(setAuthorNote(word.authorNote));
      }
    };
    getWord();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ms]);


  return (
    <div style={{ height: "100vh" }}>
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
      <Guild showGuild={showGuild}></Guild>
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
      <OverlayTrigger
        placement={"left"}
        overlay={<Tooltip id={`tooltip-left`}>Guild</Tooltip>}
      >
        <Fab
          className="floating-btn4"
          color="info"
          onClick={() => setShowGuild(!showGuild)}
        >
          <Lightbulb />
        </Fab>
      </OverlayTrigger>
    </div>
  );
}

export default Home;
