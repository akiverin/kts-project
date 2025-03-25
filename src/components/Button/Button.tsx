import React from "react";
import "./Button.scss";
import classNames from "classnames";
import Loader from "../Loader";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  className,
  loading = false,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        "button",
        className && className,
        loading && "button--loading",
      )}
      disabled={loading}
      {...props}
    >
      {loading && <Loader className="button__loader" size="s" />}
      {children}
    </button>
  );
};

export default Button;
