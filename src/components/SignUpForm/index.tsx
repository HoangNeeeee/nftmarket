"use client";
import React, { useState } from "react";

import UserIcon from "@/assets/icons/ic_user.svg";
import Hopthu from "@/assets/icons/ic_hopthu.svg";
import KeyIcon from "@/assets/icons/ic_khoa.svg";
import Image from "next/image";
import { WSInput } from "../WSInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup
  .object({
    Username: yup.string().required(),
    Email: yup.string().email("Invalid email format").required("Required!"),
    Password: yup
      .string()
      .required()
      .min(8, "Password must be 8 characters long")
      .matches(/[A-Z]/, "Password requires an uppercase letter"),
    ComfirmPassword: yup
      .string()
      .oneOf([yup.ref("Password")], "Password Not Match"),
  })
  .required();

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => console.log(data);
  return (
    <div className="mt-10 mb-20 flex flex-col w-80">
      <div className="bg-white rounded-2xl flex flex-row px-4 h-11 justify-center">
        <Image src={UserIcon} alt="user-icon" width={20} height={20} />
        <WSInput placeholder="Username" {...register("Username")} />
      </div>

      <p className="text-red-500">{errors.Username?.message}</p>

      <div className="bg-white rounded-2xl flex flex-row px-4 h-11 justify-center mt-4">
        <Image src={Hopthu} alt="user-icon" width={20} height={20} />
        <WSInput placeholder="Email Address" {...register("Email")} />
      </div>
      <p className="text-red-500">{errors.Email?.message}</p>

      <div className="bg-white rounded-2xl flex flex-row px-4 h-11 justify-center mt-4">
        <Image src={KeyIcon} alt="user-icon" width={20} height={20} />
        <WSInput placeholder="Password" password {...register("Password")} />
      </div>
      <p className="text-red-500">{errors.Password?.message}</p>

      <div className="bg-white rounded-2xl flex flex-row px-4 h-11 justify-center mt-4">
        <Image src={KeyIcon} alt="user-icon" width={20} height={20} />
        <WSInput
          placeholder="Comfirm Password"
          password
          {...register("ComfirmPassword")}
        />
      </div>
      <p className="text-red-500">{errors.ComfirmPassword?.message}</p>

      <button
        className="rounded-2xl bg-[#A259FF] mt-7 h-11 font-sans font-semibold not-italic text-white"
        onClick={handleSubmit(onSubmit)}
      >
        Create Account
      </button>
    </div>
  );
};
