import React from "react";
import Style from "./FloatButton.module.scss";
import { CSSProperties } from "react";

interface ButtonProps {
  onClick: () => void;
  style?: CSSProperties;
}

const FloatButton: React.FunctionComponent<ButtonProps> = ({ onClick }) => {
  return (
    <button className={Style.float_button} onClick={onClick}>
      <svg
        stroke="black"
        fill="black"
        stroke-width="0"
        viewBox="0 0 24 24"
        height="2em"
        width="2em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11 8.414L11 18 13 18 13 8.414 17.293 12.707 18.707 11.293 12 4.586 5.293 11.293 6.707 12.707z"></path>
      </svg>
    </button>
  );
};

export default FloatButton;
