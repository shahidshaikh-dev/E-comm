import CustomInput from "../../common/common/customInput/CustomInput";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import CustomButton from "../../common/common/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignUpForm>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  const onSubmit = async (data: SignUpForm) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const email = data.email.trim().toLowerCase();

      // ❗ check duplicate user
      const alreadyExists = users.find(
        (u: any) => u.email === email
      );

      if (alreadyExists) {
        toast.error("User already exists");
        setIsLoading(false);
        return;
      }

      const newUser = {
        id: Date.now(),
        email,
        password: data.password,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);
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

      <div className="relative z-10 flex items-center justify-center py-16">
        <div className="bg-white p-6 shadow-lg w-[360px]">
          <div className="mb-5">
            <p className="text-2xl font-bold">Create Account</p>
            <p className="text-sm text-gray-500 mt-1">
              Sign up to start shopping
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

            {/* PASSWORD (STRONG VALIDATION) */}
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                validate: {
                  hasNumber: (value) =>
                    /\d/.test(value) ||
                    "Password must contain at least 1 number",

                  hasLetter: (value) =>
                    /[a-zA-Z]/.test(value) ||
                    "Password must contain at least 1 letter",

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

            {/* CONFIRM PASSWORD */}
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Confirm password is required",
                validate: (value) =>
                  value === passwordValue || "Passwords do not match",
              }}
              render={({ field }) => (
                <CustomInput
                  wrapperClass="smallInput"
                  placeholder="Confirm Password"
                  type="password"
                  value={field.value}
                  onChange={(e: any) =>
                    field.onChange(e.target.value)
                  }
                  errors={errors.confirmPassword?.message}
                />
              )}
            />

            <CustomButton
              title={isLoading ? "Creating Account..." : "Sign Up"}
              htmlType="submit"
              disabled={!isValid || isLoading}
              className="w-full mt-4 !bg-black !text-white !h-10"
            />
          </form>

          <div className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <span
              className="cursor-pointer text-black font-medium hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
