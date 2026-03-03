"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

const UserMenu = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        // console.log("ss", storedUser);
        if (storedUser && storedUser.mobile) {
          // ব্যাকএন্ডে মোবাইল নম্বর পাঠিয়ে ডাটা আনা হচ্ছে
          const res = await axiosInstance.get(`/users/${storedUser.mobile}`);
          setUser(res.data);
        }
      } catch (err) {
        console.error("Profile Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
    router.refresh();
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-base-200">
        <span className="loading loading-infinity loading-lg text-primary"></span>
      </div>
    );
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar online"
      >
        <div className="w-20 rounded-full border-2 border-primary">
          <Image
            src={user?.image || "https://i.ibb.co.com/jPvqvwG3"}
            alt="User Avatar"
            width={40}
            height={40}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="mt-3 z-1 p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-52 border border-base-300"
      >
        <li className="menu-title px-4 py-2 font-bold text-primary uppercase text-[10px] tracking-widest">
          {user?.username || "user"}
        </li>
        <div className="divider my-0 opacity-20"></div>
        <li>
          <Link href="/dashboard/profile" className="py-3 flex justify-between">
            প্রোফাইল
            <span className="badge badge-xs badge-primary">New</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/settings" className="py-3">
            সেটিংস
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="text-error font-bold py-3">
            লগ-আউট
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
