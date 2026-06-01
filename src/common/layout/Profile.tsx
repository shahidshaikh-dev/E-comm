import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { setCredentials } from "../../store/slices/authSlice";

import CustomButton from "../../common/common/CustomButton/CustomButton";
import CustomInput from "../../common/common/customInput/CustomInput";

function BackIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.token);

  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(user?.password || "");

  const initial = (email || "U")[0].toUpperCase();

  const handleSave = () => {
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    try {
      // 🔥 STEP 1: update USERS DB in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const updatedUsers = users.map((u: any) =>
        u.id === user.id
          ? { ...u, email: email.trim(), password }
          : u
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // 🔥 STEP 2: update Redux session
      const updatedUser = {
        ...user,
        email: email.trim(),
        password,
      };

      dispatch(
        setCredentials({
          user: updatedUser,
          token,
        })
      );

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <CustomButton
            title={<BackIcon />}
            onClick={() => navigate(-1)}
            className="extra-small-primary outline w-10 h-10 rounded-full flex items-center justify-center"
          />

          <h1 className="text-2xl font-semibold tracking-tight">
            Profile
          </h1>

          <div className="w-10" />
        </div>

        {/* PROFILE CARD */}
        <div className="flex flex-col md:flex-row gap-8 p-8 rounded-2xl bg-gray-50 border border-black/5">

          {/* AVATAR */}
          <div className="w-28 h-28 rounded-full bg-black text-white flex items-center justify-center text-4xl font-bold">
            {initial}
          </div>

          {/* INPUTS */}
          <div className="flex-1 space-y-5">

            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Email Address
              </label>

              <CustomInput
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                placeholder="Enter email"
                type="email"
                className="smallInput"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Password
              </label>

              <CustomInput
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                placeholder="Enter password"
                type="password"
                className="smallInput"
              />
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col gap-3">
            <CustomButton
              title="Save Changes"
              onClick={handleSave}
              className="small-primary filled"
            />

            <CustomButton
              title="Back to Shopping"
              onClick={() => navigate("/products")}
              className="small-primary outline"
            />
          </div>
        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="p-6 rounded-xl border border-black/5 hover:border-black/20 transition">
            <p className="text-xs uppercase tracking-wider text-gray-400">
              Email
            </p>
            <p className="mt-2 text-sm font-medium break-all">{email}</p>
          </div>

          <div className="p-6 rounded-xl border border-black/5 hover:border-black/20 transition">
            <p className="text-xs uppercase tracking-wider text-gray-400">
              User ID
            </p>
            <p className="mt-2 text-sm font-medium">{user?.id}</p>
          </div>

          <div className="p-6 rounded-xl border border-black/5 hover:border-black/20 transition">
            <p className="text-xs uppercase tracking-wider text-gray-400">
              Account Status
            </p>
            <p className="mt-2 text-sm font-semibold text-green-600">
              Active
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
