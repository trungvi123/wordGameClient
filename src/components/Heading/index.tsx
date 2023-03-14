import classNames from "classnames/bind";
import { useState } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

import { Link } from "react-router-dom";
import authApi, { dataSignIn, dataSignUp } from "../../api/authApi";
import { setEmail, setId, setInitial, setIsAdmin, setWordContributed } from "../../redux/authSlice";
import { setMs } from "../../redux/boardSlice";
import { setToast } from "../../redux/toastSlice";
import { IRootState } from "../interface";

import style from "./Heading.module.css";

interface IProps {
  type: string;
}

const cx = classNames.bind(style);

function Heading(props: IProps) {
  const { type } = props;
  const [signIn, setSignIn] = useState(true);
  const [checkConfirm, setConfirm] = useState(true);
  
  const dispatch = useDispatch();

  const currentEmail = useSelector((e: IRootState) => e.auth.email);
  const isAdmin = useSelector((e: IRootState) => e.auth.isAdmin);
  const ms = useSelector((e: IRootState) => e.board.ms);

  const currentId = useSelector((e: IRootState) => e.auth.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (data: any) => {
    if (signIn) {
      // sign in
      const payload: dataSignIn = {
        email: data.email,
        password: data.pass,
      };

      const signInApi: any = await authApi.signIn(payload);

      if (signInApi) {
        localStorage.setItem(
          "gameToken",
          JSON.stringify(signInApi?.accessToken || "")
        );
    
        dispatch(setMs(signInApi?.ms));
        dispatch(setWordContributed(signInApi?.wordContributed));
        dispatch(setEmail(signInApi?.email));
        dispatch(setId(signInApi?._id));
        dispatch(
          setToast({
            type: "success",
            heading: "Đăng nhập thành công",
            content: `Xin chào ${signInApi?.email}`,
            show: true,
          })
        );
        const user: any = jwt_decode(signInApi?.accessToken || "");
        if (user?.isAdmin === true) {
          dispatch(setIsAdmin(true));
        } else {
          dispatch(setIsAdmin(false));
        }
      } else {
        dispatch(
          setToast({
            type: "danger",
            heading: "Thông báo",
            content: "Đăng nhập không thành công, vui lòng kiểm tra lại!",
            show: true,
          })
        );
      }
    } else {
      //sign up

      if (data.pass === data.pass2) {
        const payload: dataSignUp = {
          email: data.email,
          password: data.pass,
          confirmPassword: data.pass2,
        };
        const signUpApi: any = await authApi.signUp(payload);
        if (signUpApi?.state === "success") {
          dispatch(
            setToast({
              type: "success",
              heading: "Thông báo",
              content: "Đăng ký thành công",
              show: true,
            })
          );
        }
      } else {
        setConfirm(false);
      }
    }
  };

  const handleLogOut = () => {
    dispatch(setInitial());
    dispatch(
      setToast({
        type: "success",
        heading: "Thông báo",
        content: "Đăng xuất thành công",
        show: true,
      })
    );
  };

  return (
    <div
      className={cx("heading", { heading_transparent: type === "transparent" })}
    >
      <nav className={cx("heading-nav")}>
        <div className={cx("heading-nav__left")}>
          <Link className={cx("heading-link")} to={"/"}>
            Home
          </Link>
          <Link className={cx("heading-link")} to={"/dword"}>
            Contribute
          </Link>
          {isAdmin && (
            <Link className={cx("heading-link")} to={"/management"}>
              Management
            </Link>
          )}
        </div>
        <div className={cx("heading-nav__right")}>
          <Dropdown className={cx("signIn-dropdown")}>
            <Dropdown.Toggle className={cx("signIn-btn")} id="dropdown-basic">
              {!currentEmail && !currentId ? "Sign In" : currentEmail}
            </Dropdown.Toggle>

            {!currentEmail && !currentId && (
              <Dropdown.Menu>
                <div className="m-3">
                  <h5 className={cx("p-3")}>
                    {signIn ? "Sign In" : "Sign Up"}
                  </h5>
                  <Form
                    onSubmit={handleSubmit(submit)}
                    className={cx("form-container__main")}
                  >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        className={cx("inputField")}
                        type="text"
                        spellCheck="false"
                        placeholder="Email"
                        {...register("email", {
                          required: true,
                          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          maxLength: 20,
                        })}
                      />
                      {errors.email?.type === "required" && (
                        <p className="text-danger ml-2">Vui lòng nhập email!</p>
                      )}

                      {errors.email?.type === "maxLength" && (
                        <p className="text-danger">
                          Email của bạn quá dài, vui lòng thử lại!
                        </p>
                      )}

                      {errors.email?.type === "pattern" && (
                        <p className="text-danger ml-2">
                          Email không hợp lệ, vui lòng kiểm tra lại!
                        </p>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicWord">
                      <Form.Control
                        type="password"
                        spellCheck="false"
                        className={cx("inputField")}
                        placeholder="Password"
                        {...register("pass", {
                          required: true,
                           minLength:5
                        })}
                      />
                      {errors.pass?.type === "required" && (
                        <p className="text-danger ml-2">
                          Vui lòng nhập mật khẩu!
                        </p>
                      )}
                      {errors.pass?.type === "minLength" && (
                        <p className="text-danger ml-2">
                          Vui lòng nhập mật khẩu có ít nhất 5 kí tự!
                        </p>
                      )}
                    </Form.Group>

                    {!signIn && (
                      <Form.Group className="mb-3" controlId="formBasicWord2">
                        <Form.Control
                          type="password"
                          spellCheck="false"
                          className={cx("inputField")}
                          placeholder="Confirm password"
                          {...register("pass2", {
                            required: true,
                          })}
                        />
                        {errors.pass2?.type === "required" && (
                          <p className={cx("text-danger")}>
                            Vui lòng nhập mật khẩu!
                          </p>
                        )}
                        {!checkConfirm && (
                          <p className="text-danger">
                            Mật khẩu không trùng khớp!
                          </p>
                        )}
                      </Form.Group>
                    )}

                    <p
                      onClick={() => setSignIn(!signIn)}
                      className={cx("changeStatus")}
                    >
                      {signIn ? "Sign Up?" : "Sign In?"}{" "}
                    </p>

                    <div
                      className={cx(
                        "d-flex",
                        "justify-content-center",
                        "w-100"
                      )}
                    >
                      <Button
                        variant="outline-primary"
                        type="submit"
                        className={cx("register", "w-75", "mt-3")}
                      >
                        {signIn ? "Sign In" : "Sign Up"}
                      </Button>
                    </div>
                  </Form>
                </div>
              </Dropdown.Menu>
            )}
            {currentEmail && currentId && (
              <Dropdown.Menu>
                <div className={cx("p-2")}>
                  <Dropdown.ItemText>
                    <b>Điểm cao nhất: {ms}</b>
                  </Dropdown.ItemText>

                  <Link
                    to={"/myWord"}
                    className={cx(
                      "heading-link",
                      "heading-link__dropdown",
                      "p-2",
                      "w-100"
                    )}
                  >
                    Các từ đã đóng góp
                  </Link>

                  <Dropdown.Divider />
                  <div
                    className={cx("heading-link__dropdown", "p-2")}
                    onClick={handleLogOut}
                  >
                    Đăng xuất
                  </div>
                </div>
              </Dropdown.Menu>
            )}
          </Dropdown>
        </div>
      </nav>
    </div>
  );
}

export default Heading;
