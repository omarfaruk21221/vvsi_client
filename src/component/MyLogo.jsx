"use client";
import Image from "next/image";
import React from "react";
import logo from "./../../public/catoon.png";

export default function MyLogo() {
  return (
    <div className=" flex items-center">
      <Image src={logo} alt="Bhai Bhai Logo" width={70} height={70} />
      <h1>
        <span className="text-2xl font-bold text-primary">ভাই ভাই</span> <br />
        <span className="text-lg text-secondary font-bold">সুপার আইসক্রিম</span>
      </h1>
    </div>
  );
}
