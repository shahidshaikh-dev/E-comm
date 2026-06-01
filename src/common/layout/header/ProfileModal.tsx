import React from "react";
import { CustomModal } from "../../common/CustomModal/CustomModal";
import CustomButton from "../../common/CustomButton/CustomButton";

interface ProfileModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  open,
  onCancel,
  onConfirm,
}) => {
  return (
    <CustomModal
      open={open}
      onCancel={onCancel}
      title="Are you sure you want to logout? You will need to login again to access your account.
"
      width={520}
      footer={false}
    >
      <div className="text-center px-2 py-2">
        <div className="flex justify-center gap-6">
          {/* CANCEL BUTTON */}
          <CustomButton
            title="Cancel"
            onClick={onCancel}
            className="w-[200px] h-12.25 px-5 py-4 rounded-md flex items-center justify-center gap-1 small-primary outlined text-gray-700 hover:!text-black"
          />

          {/* CONFIRM BUTTON */}
          <CustomButton
            title="Logout"
            onClick={onConfirm}
            className="w-[200px] small-primary h-12.25 px-5 py-4 rounded-md flex items-center justify-center gap-1  filled font-semibold border-none!"
          />
        </div>
      </div>
    </CustomModal>
  );
};

export default ProfileModal;
