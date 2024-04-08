import React from "react";
import close from "../../img/close.png";
import Image from "next/image";
import "@/app/css/popup.css";

export default function Popup({ message, handleClose }) {
  return (
    <div className="content-popup">
      <button onClick={handleClose} className="btt-popup">
        {" "}
        <Image src={close} alt="logo close" className="img-close" />
      </button>
      <div className="message-div">
        <p>{message}</p>
      </div>
    </div>
  );
}
