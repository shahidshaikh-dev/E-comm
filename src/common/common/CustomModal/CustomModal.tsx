import { Modal } from "antd";
import React from "react";

interface CustomModalProps {
  open?: boolean;
  width?: number;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  title?: React.ReactNode | string;
  children?: React.ReactNode;
  onCancel?: () => void;
  onOk?: () => void;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  footer?: React.ReactNode | null;
  styles?: any;
  wrapClassName?: string;
  className?: string;
}

export const CustomModal = ({
  open,
  width = 600,
  closable = true,
  closeIcon,
  title,
  onCancel,
  onOk,
  okText,
  cancelText,
  children,
  footer = null,
  styles,
  wrapClassName = "",
  className = "",
}: CustomModalProps) => {
  return (
    <Modal
      open={open}
      centered
      width={width}
      closable={closable}
      closeIcon={closeIcon}
      title={title}
      onCancel={onCancel}
      onOk={onOk}
      okText={okText}
      cancelText={cancelText}
      footer={footer}
      wrapClassName={wrapClassName}
      className={`mt-6 flex mx-auto ${className}`}
      styles={styles}
    >
      {children}
    </Modal>
  );
};
