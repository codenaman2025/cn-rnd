import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, loginSchema } from "./LoginSignupSchema";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";

export const LSForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { signup, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
  });

  const onSubmit = (data) => {
    try {
      if (isLogin) {
        const loggedInUser = login(data); 
        if (loggedInUser.role === "hiring_manager") {
          navigate("/hiring_manager");
        } else {
          navigate("/job_seeker");
        }
      }
       else {
        signup(data);
        alert("Signup successful! Please login.");
        setIsLogin(true);
      }
      reset();
    } catch (err) {
      alert(err.message);
    }
  };

  const roleValue = watch("role");

  const inputClass =
    "w-full border border-gray-300 rounded-md !px-3 !py-2 focus:outline-none focus:ring focus:border-blue-500 !mt-1";
  const errorClass = "text-red-500 text-sm !mt-1";

  return (
    <div className="max-w-md !mx-auto !mt-10 bg-white !p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold !mb-4">
        {isLogin ? "Login" : "Sign Up"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {!isLogin && (
          <div>
            <input
              {...register("name")}
              placeholder="Full Name"
              className={inputClass}
            />
            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </div>
        )}

        <div>
          <input
            {...register("email")}
            placeholder="Email"
            className={inputClass}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className={inputClass}
          />
          {errors.password && (
            <p className={errorClass}>{errors.password.message}</p>
          )}
        </div>

        {!isLogin && (
          <div>
            <select {...register("role")} className={inputClass}>
              <option value="">-- Select Role --</option>
              <option value="job_seeker">Job Seeker</option>
              <option value="hiring_manager">Hiring Manager</option>
            </select>
            {errors.role && <p className={errorClass}>{errors.role.message}</p>}
          </div>
        )}

        {!isLogin && roleValue === "job_seeker" && (
          <div>
            <input type="file" {...register("resume")} className={inputClass} />
            {errors.resume && (
              <p className={errorClass}>{errors.resume.message}</p>
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white !py-2 rounded-md cursor-pointer !mt-1"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <p className="!mt-4 text-center text-gray-600">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          className="text-blue-500 hover:underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
};
export default LSForm;