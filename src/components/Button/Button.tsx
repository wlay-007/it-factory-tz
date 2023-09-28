import React from "react";
import Style from "./Button.module.scss";

interface ButtonProps {
  onClick: () => void;
}

const Button: React.FunctionComponent<ButtonProps> = ({ onClick }) => {
  return (
    <button className={Style.load_more_btn} onClick={onClick}>
      Load More
    </button>
  );
};

export default Button;
