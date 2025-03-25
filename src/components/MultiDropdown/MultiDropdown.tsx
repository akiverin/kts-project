import React, { useEffect, useRef, useState } from "react";
import Input from "../Input";
import "./MultiDropdown.scss";
import classNames from "classnames";
import Text from "../Text";
import ArrowDownIcon from "../icons/ArrowDownIcon";

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled = false,
  getTitle,
}: MultiDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFilterText(value.length ? getTitle(value) : "");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setFilterText("");
    } else {
      setFilterText(value.length ? getTitle(value) : "");
    }
  }, [isOpen, value, getTitle, setFilterText]);

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen(true);
    if (!isOpen) {
      setFilterText("");
    }
  };

  const handleOptionClick = (option: Option, event: React.MouseEvent) => {
    const isSelected = value.some((item) => item.key === option.key);
    if (isSelected) {
      onChange(value.filter((item) => item.key !== option.key));
    } else {
      onChange([...value, option]);
    }
  };

  const handleInputChange = (inputValue: string) => {
    setFilterText(inputValue);
    setIsOpen(true);
  };

  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().startsWith(filterText.toLowerCase()),
  );

  return (
    <div
      ref={dropdownRef}
      className={classNames("multi-dropdown", className, {
        "multi-dropdown--disabled": disabled,
      })}
    >
      <div className="multi-dropdown__input" onClick={toggleDropdown}>
        <Input
          className={classNames(
            "multi-dropdown__input-field",
            isOpen && "multi-dropdown__input-field--focus",
          )}
          value={filterText}
          placeholder={filterText}
          onChange={handleInputChange}
          disabled={disabled}
          afterSlot={<ArrowDownIcon color="secondary" />}
        />
      </div>

      {isOpen && !disabled && (
        <div className="multi-dropdown__menu">
          {filteredOptions.map((option: Option) => (
            <div
              key={option.key}
              className={classNames("multi-dropdown__option", {
                "multi-dropdown__option--selected": value.some(
                  (v: Option) => v.key === option.key,
                ),
              })}
              onClick={(e) => handleOptionClick(option, e)}
            >
              <Text view="p-16">{option.value}</Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
