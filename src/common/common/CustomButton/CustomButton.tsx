import { Button, Tooltip } from "antd";
import "./CustomButton.scss";
import type { CustomButtonProps } from "./type";

const CustomButton = (prop: CustomButtonProps) => {
  const {
    title,
    className,
    disabled,
    onClick,
    tooltipTitle,
    block = false,
    icon,
    loading,
    suffix,
    href,
    iconStyles,
    htmlType
  } = prop;

  return (
    <Tooltip title={tooltipTitle}>
      <Button
        className={`custom-btn ${title ? "gap-1" : ""} p-0 ${className}  ${icon || suffix ? "flex items-center justify-center" : ""
          }`}
        style={{
          padding: title ? "" : "",
        }}
        disabled={disabled}
        onClick={onClick}
        block={block}
        loading={loading}
        href={href}
        htmlType={htmlType}
      // iconPosition={'end'}
      >
        {typeof icon === "string" ? (
          <div className={iconStyles}>
            <img src={icon} alt="icon" className="h-full w-full" />
          </div>
        ) : (
          icon || false
        )}
        {title}
        {suffix ? <img src={suffix} alt="icon" className="h-5 w-5" /> : false}
      </Button>
    </Tooltip>
  );
};

export default CustomButton;
