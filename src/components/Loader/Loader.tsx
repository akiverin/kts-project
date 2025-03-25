import React from "react";
import "./Loader.scss";
import classNames from "classnames";

export type LoaderProps = {
  /** Размер */
  size?: "s" | "m" | "l";
  /** Дополнительный класс */
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size, className }: LoaderProps) => {
  return (
    <div
      className={classNames(
        "loader",
        size === "s" && "loader--small",
        size === "m" && "loader--medium",
        className && className,
      )}
    >
      <div className="loader__circle"></div>
    </div>
  );
};

export default Loader;
