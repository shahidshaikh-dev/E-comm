/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "antd";
import { useEffect, useState } from "react";
import "./CustomInput.scss";

type CustomInputProps = {
  placeholder?: string;
  className?: string;
  type?: string;
  label?: string;
  name?: string;
  value: any;
  onChange?: any;
  onFocus?: any;
  onBlur?: any;
  errors?: any;
  containerClass?: string;
  id?: string;
  prefix?: any;
  disabled?: boolean;
  wrapperClass?: string;
  verified?: boolean;
  inputWrapperClassname?: string;
  inputClass?: string;
  suffix?: any;
  maxLength?: any;
  uppercase?: boolean;
  required?: boolean;
  onKeyDown?: any;
  onWheel?: any;
};

const CustomInput = (props: CustomInputProps) => {
  const {
    placeholder,
    type,
    value,
    onChange,
    onFocus,
    onBlur,
    label,
    errors,
    id,
    prefix,
    disabled,
    wrapperClass,
    verified,
    inputWrapperClassname,
    inputClass,
    suffix,
    maxLength,
    uppercase,
    onKeyDown,
    required,
  } = props;

  const [focused, setFocused] = useState(!!prefix);

  const handleFocus = () => setFocused(true);

  const handleBlur = () => {
    if (!value && !prefix) setFocused(false);
  };

  useEffect(() => {
    if (value) handleFocus();
  }, [value]);

  return (
    <div
      className={`custom-common-input ${wrapperClass || ""} ${
        uppercase ? "uppercase-input" : ""
      }`}
    >
      <div
        className={`input-container ${inputWrapperClassname || ""} ${
          focused && value ? "flex" : "relative"
        } ${disabled ? "disabled" : ""} ${
          errors ? "error" : verified ? "verified" : ""
        }`}
      >
        {type === "password" ? (
          <Input.Password
            className={`input-field ${inputClass || ""}`}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={onChange}
            id={id}
            prefix={prefix}
            suffix={suffix}
            onFocus={() => {
              handleFocus();
              onFocus?.();
            }}
            onBlur={() => {
              handleBlur();
              onBlur?.();
            }}
          />
        ) : type === "otp" ? (
          <Input.OTP
            className={`input-field ${inputClass || ""}`}
            disabled={disabled}
            value={value}
            length={4}
            onChange={onChange}
            id={id}
          />
        ) : (
          <Input
            className={`input-field no-spin ${inputClass || ""}`}
            placeholder={placeholder}
            disabled={disabled}
            type={type}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            maxLength={maxLength}
            prefix={prefix}
            suffix={suffix}
            onFocus={() => {
              handleFocus();
              onFocus?.();
            }}
            onBlur={() => {
              handleBlur();
              onBlur?.();
            }}
          />
        )}

        {label && (
          <label
            htmlFor={id}
            className={`input-label ${
              focused && value ? "label-focused" : ""
            } ${errors ? "label-error" : ""}`}
          >
            {label}
            {required && <span className="error-text-color ml-1">*</span>}
          </label>
        )}
      </div>

      {errors && <div className="error-message">{errors}</div>}
    </div>
  );
};

export default CustomInput;
