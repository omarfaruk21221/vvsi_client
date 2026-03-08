"use client";
import Gradian from "@/component/Global/Gradian";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";

export default function users() {
  const [user, setuser] = useState();
  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/customers");
      setuser(res.data);
    } catch (error) {
      console.error("ডাটা ফেচ করতে সমস্যা হয়েছে:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  console.log("users Info", user);
  return <Gradian>afkjasdh</Gradian>;
}
