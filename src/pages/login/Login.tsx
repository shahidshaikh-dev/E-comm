import CustomInput from "../../common/common/customInput/CustomInput";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import CustomButton from "../../common/common/CustomButton/CustomButton";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const email = data.email.trim().toLowerCase();

      const registeredUser = users.find(
        (u: any) => u.email === email
      );

      if (!registeredUser) {
        toast.error("User not found. Please sign up first.");
        setIsLoading(false);
        return;
      }

      if (registeredUser.password !== data.password) {
        toast.error("Invalid email or password");
        setIsLoading(false);
        return;
      }

      dispatch(
        setCredentials({
          user: registeredUser,
          token: "fake-token-123",
        })
      );

      toast.success("Login successful");
      navigate("/products");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <img
        src="/images/e-comm bg.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex items-center justify-center gap-52 py-16">
        <div className="bg-white p-6 shadow-lg w-[360px]">
          <div className="mb-5">
            <p className="text-2xl font-bold">Welcome Back!</p>
            <p className="text-sm text-gray-500 mt-1">
              Sign in to continue
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            {/* EMAIL */}
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              }}
              render={({ field }) => (
                <CustomInput
                  wrapperClass="smallInput"
                  placeholder="E-mail ID"
                  type="text"
                  value={field.value}
                  onChange={(e: any) =>
                    field.onChange(e.target.value.trimStart())
                  }
                  errors={errors.email?.message}
                />
              )}
            />

          {/* PASSWORD */}
<Controller
  name="password"
  control={control}
  rules={{
    required: "Password is required",

    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },

    maxLength: {
      value: 64,
      message: "Password cannot exceed 64 characters",
    },

    validate: {
      hasUppercase: (value) =>
        /[A-Z]/.test(value) ||
        "Password must contain at least 1 uppercase letter",

      hasLowercase: (value) =>
        /[a-z]/.test(value) ||
        "Password must contain at least 1 lowercase letter",

      hasNumber: (value) =>
        /\d/.test(value) ||
        "Password must contain at least 1 number",

      hasSpecialCharacter: (value) =>
        /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]`~]/.test(value) ||
        "Password must contain at least 1 special character",

      noSpaces: (value) =>
        !/\s/.test(value) ||
        "Password cannot contain spaces",
    },
  }}
  render={({ field }) => (
    <CustomInput
      wrapperClass="smallInput"
      placeholder="Password"
      type="password"
      value={field.value}
      onChange={(e: any) =>
        field.onChange(e.target.value)
      }
      errors={errors.password?.message}
    />
  )}
/>

            <CustomButton
              title={isLoading ? "Logging in..." : "Login"}
              htmlType="submit"
              disabled={!isValid || isLoading}
              className="w-full small-primary filled bg-black! text-white! mt-4"
            />
          </form>

          <div className="mt-4 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <span
              className="cursor-pointer text-black font-medium hover:underline"
              onClick={() => navigate("/signUp")}
            >
              Sign up
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
