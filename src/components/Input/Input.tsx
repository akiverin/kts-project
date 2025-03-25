import React from "react";
import "./Input.scss";
import classNames from "classnames";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, afterSlot, onChange, className, ...props }: InputProps, ref) => {
    return (
      <div
        className={classNames(
          "input-container",
          className && className,
          afterSlot ? "input-container--icon" : "",
        )}
      >
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onChange(event.target.value)
          }
          {...props}
        />
        {afterSlot && afterSlot}
      </div>
    );
  },
);

export default Input;
