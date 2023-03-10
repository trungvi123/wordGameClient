import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../../redux/toastSlice";
import { IRootState } from "../interface";
import "./Toast.css";
function ToastComp() {
  //   const [position, setPosition] = useState('top-start');


  const dispatch = useDispatch()
  const toast = useSelector((e:IRootState)=>e.toast)
  
  const closeToast = ()=> {
    dispatch(setToast({
      ...toast,
      show:false
    }))
  }

  return (
    <ToastContainer position="top-end" className="p-3 mt-5">
      <Toast onClose={closeToast} show={toast.show} autohide delay={5000}  bg={toast.type}>
        <Toast.Header>
          <strong className="me-auto">{toast.heading}</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body className="text-white">{toast.content}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastComp;
