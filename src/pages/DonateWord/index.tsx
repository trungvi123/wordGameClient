import {
  Container,
  Form,
  Button,
  InputGroup,
  Col,
  Row,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { useState } from "react";

import style from "./DonateWord.module.css";
import Heading from "../../components/Heading";
import wordApi, { ICreateWord } from "../../api/wordApi";
import { useDispatch } from "react-redux";
import { setToast } from "../../redux/toastSlice";
import { Fab } from "@mui/material";
import { Email } from "@mui/icons-material";

const cx = classNames.bind(style);

function DonateWord() {
  const [message, setMessage] = useState<string>("");
  const [testWord, setTestWord] = useState<string>("");

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (data: any) => {
    const totalData: ICreateWord = {
      author: data.email,
      word: data.word,
      authorNote: message,
    };
    if (data.word.trim().length === 5) {
      const res: any = await wordApi.createPendingWord(totalData);

      if (res?.state === "success") {
        dispatch(
          setToast({
            type: "success",
            heading: "Cảm ơn bạn đã đóng góp",
            content:
              "Chúng tôi sẽ xem xét, thêm từ mà bạn đã đóng góp sớm nhất có thể",
            show: true,
          })
        );
      }
    }else {
      dispatch(
        setToast({
          type: "danger",
          heading: "Thông báo",
          content:
            "Vui lòng nhập từ có 5 kí tự!",
          show: true,
        })
      );
    }

    //  console.log(totalData);
  };

  const handleTestWord = async () => {
    if (testWord.length === 5) {
      const res: any = await wordApi.testWord({ word: testWord });

      if (res?.message === "already") {
        dispatch(
          setToast({
            type: "danger",
            heading: "Cảm ơn bạn đã đóng góp",
            content: "Từ này đã có trong cơ sở dữ liệu của chúng tôi",
            show: true,
          })
        );
      } else {
        dispatch(
          setToast({
            type: "success",
            heading: "Cảm ơn bạn đã đóng góp",
            content:
              "Wow!!! đây là một từ mới, bạn có thể đóng góp từ này vào cơ sở dữ liệu của chúng tôi",
            show: true,
          })
        );
      }
    } else {
      dispatch(
        setToast({
          type: "danger",
          heading: "Thông báo",
          content: "Bạn vui lòng đóng góp từ có 5 kí tự nhé!",
          show: true,
        })
      );
    }
  };

  return (
    <div className={cx('wrapper')}>
      <Heading type=""></Heading>
      <Container className={cx("d-word", "d-flex", "justify-content-center")}>
        <div className={cx("form-container", "w-75")}>
          <h2 className="mb-5">
            Nơi bạn có thể đóng góp vốn từ vựng tiếng Anh của bạn :3
          </h2>

          <Form >
            <Row className="align-items-center">
              <Col xs="auto">
                <Form.Control
                  value={testWord}
                  onChange={(e) => setTestWord(e.target.value)}
                  className="mb-2"
                  id="inlineFormInput"
                  placeholder="Your word"
                />
              </Col>

              <Col xs="auto">
                <Button onClick={handleTestWord} className="mb-2">
                  Kiểm tra
                </Button>
              </Col>
            </Row>
            <p className={cx('text-left','advise-mess')}>
              Cơ sở dữ liệu của chúng tôi có thể đã có từ vựng mà bạn muốn đóng
              góp, bạn nên kiểm tra từ trước khi gửi nhé!
            </p>
          </Form>

          <Form
            onSubmit={handleSubmit(submit)}
            className={cx("form-container__main")}
          >
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control
                type="text"
                spellCheck="false"
                placeholder="Email"
                {...register("email", {
                  required: true,

                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />
              {errors.email?.type === "required" && (
                <p className="text-danger">Vui lòng nhập email!</p>
              )}

              {errors.email?.type === "pattern" && (
                <p className="text-danger">
                  Email không hợp lệ, vui lòng kiểm tra lại!
                </p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formWord">
              <Form.Control
                type="text"
                spellCheck="false"
                placeholder="Your word"
                {...register("word", {
                  required: true,
                  
                  maxLength: 5,
                  minLength: 5,
                })}
              />
              {errors.word?.type === "required" && (
                <p className="text-danger">
                  Vui lòng nhập từ mà bạn muốn đóng góp!
                </p>
              )}
              {(errors.word?.type === "minLength" ||
                errors.word?.type === "maxLength") && (
                <p className="text-danger">Vui lòng nhập từ có 5 kí tự!</p>
              )}
            </Form.Group>

            <InputGroup>
              <Form.Control
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                as="textarea"
                spellCheck="false"
                aria-label="With textarea"
                placeholder="Lời nhắn của bạn (nếu có)"
              />
            </InputGroup>

            <Button
              variant="outline-primary"
              type="submit"
              className={cx("register", "w-100", "mt-3")}
            >
              Gửi
            </Button>
          </Form>
        </div>

        <OverlayTrigger
          placement={"right"}
          overlay={<Tooltip id={`tooltip-right`}>Contact me!</Tooltip>}
        >
          <Fab
            className={cx('floating-email')}
            color="info"
            href="mailto:itkhongxau@gmail.com"
          >
            <Email />
          </Fab>
        </OverlayTrigger>
      </Container>
    </div>
  );
}

export default DonateWord;
