"use client";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import {
  User,
  Phone,
  ShieldCheck,
  Calendar,
  Camera,
  EditIcon,
  User2Icon,
  UserCog,
  PhoneCall,
  LocationEdit,
  CardSimIcon,
  Cake,
} from "lucide-react";
import Image from "next/image";
import ProfileEditModal from "@/component/Modals/ProfileEditModal";
import Swal from "sweetalert2";
import DetailsCard from "@/component/Global/DetailsCard";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.mobile) {
        const res = await axiosInstance.get(`/users/${storedUser.mobile}`);
        setUser(res.data);
      }
    } catch (err) {
      console.error("Profile Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    if (user) {
      document.getElementById("edit_User_modal").showModal();
    }
  };

  const onUpdateSave = async (updatedData) => {
    try {
      const res = await axiosInstance.patch(
        `/users/${user.mobile}`,
        updatedData,
      );

      if (res.status === 200 || res.status === 204) {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const newUser = { ...storedUser, ...updatedData };
        localStorage.setItem("user", JSON.stringify(newUser));

        Swal.fire({
          title: "সফল!",
          text: "আপনার প্রোফাইল আপডেট করা হয়েছে।",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });

        fetchProfile();
        document.getElementById("edit_User_modal").close();
        fetchProfile();
      }
    } catch (error) {
      console.error("Update Error:", error);
      //   Swal.fire("ব্যর্থ!", "সার্ভারে আপডেট করা সম্ভব হয়নি।", "error");
      Swal.fire({
        title: "ব্যর্থ!!",
        text: "সার্ভারে আপডেট করা সম্ভব হয়নি।",
        icon: "error",
        confirmButtonColor: "#3085d6",
        customClass: {
          container: "z-999999",
        },
      });
    }
  };
  console.log("Active user", user);
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-base-200">
        <span className="loading loading-infinity loading-lg text-primary"></span>
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-10 bg-error/10 rounded-3xl border border-error">
          <h1 className="text-2xl font-bold text-error">
            ইউজার ডাটা পাওয়া যায়নি!
          </h1>
          <p className="opacity-60 text-sm">অনুগ্রহ করে আবার লগইন করুন।</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen p-4 md:p-8 flex justify-center items-start bg-base-200/30">
      <div className="max-w-5xl w-full">
        <div className="relative bg-base-100 rounded-[3rem] shadow-2xl overflow-hidden border border-base-300">
          <div className="h-44 bg-linear-to-r from-primary to-secondary flex items-center justify-end px-12">
            <h2 className="text-primary/30 text-6xl font-black uppercase tracking-tighter select-none">
              আমার প্রোফাইল
            </h2>
          </div>

          <div className="relative px-8 pb-10">
            <div className="flex flex-col md:flex-row items-end gap-6 -mt-20">
              <div className="relative group">
                <div className="w-36 h-36 md:w-44 md:h-44 rounded-[2.5rem] overflow-hidden border-8 border-base-100 shadow-2xl bg-base-300">
                  <Image
                    src={user.image || "https://i.ibb.co.com/jPvqvwG3"}
                    alt="User Profile"
                    width={200}
                    height={200}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -top-4 -right-4 z-10">
                  <span className="badge badge-secondary badge-lg py-4 px-6 font-black uppercase shadow-xl border-none">
                    {user.category || "সাধারণ"}
                  </span>
                </div>
                <button className="absolute bottom-3 right-3 p-3 bg-primary text-white rounded-2xl shadow-lg hover:rotate-12 transition-all">
                  <Camera size={20} />
                </button>
              </div>

              <div className="flex-1 pb-2">
                <h1 className="text-4xl font-black text-base-content uppercase tracking-tight">
                  {user?.name || "নাম নেই "}
                </h1>
                <p className="text-sm font-bold text-primary flex items-center gap-2 opacity-80">
                  <ShieldCheck size={18} /> {user?.status || "প্রসেসিং"}
                </p>
              </div>

              <div className="pb-2">
                <button
                  onClick={handleEditProfile}
                  className="btn btn-warning btn-md rounded-2xl gap-3 font-black px-8 shadow-lg shadow-warning/20 hover:scale-105 transition-all"
                >
                  <EditIcon size={18} /> এডিট প্রোফাইল
                </button>
              </div>
            </div>

            <div className="divider my-10 opacity-30"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DetailsCard
                iconClass={
                  "bg-secondary/10 text-secondary group-hover:bg-secondary "
                }
                icon={<User2Icon size={20} />}
                tittle={"পিতার নাম"}
                tittleClass=""
                value={user.fatherName}
              />
              <DetailsCard
                iconClass={
                  "bg-secondary/10 text-warning group-hover:bg-warning "
                }
                icon={<UserCog size={20} />}
                tittle={"মাতার নাম"}
                value={user.motherName}
              />
              <DetailsCard
                iconClass={
                  "bg-green-100 text-green-500 group-hover:bg-green-500 "
                }
                icon={<PhoneCall size={20} />}
                tittle={"মোবাইল"}
                tittleClass=""
                value={user.mobile}
              />
              <DetailsCard
                iconClass={
                  "bg-amber-900/40 text-amber-900 group-hover:bg-amber-900 "
                }
                icon={<LocationEdit size={20} />}
                tittle={"ঠিকানা"}
                tittleClass=""
                value={user.address}
              />
              <DetailsCard
                iconClass={"bg-sky-900/40 text-sky-900 group-hover:bg-sky-900 "}
                icon={<CardSimIcon size={20} />}
                tittle={"NID নম্বর"}
                tittleClass=""
                value={user.nidNumber}
              />
              <DetailsCard
                iconClass={"bg-sky-500/40 text-sky-500 group-hover:bg-sky-500 "}
                icon={<Cake size={20} />}
                tittle={"জন্ম তারিখ"}
                tittleClass=""
                value={user.dob}
              />
              <DetailsCard
                iconClass={"bg-accent/10 text-accent group-hover:bg-accent"}
                icon={<Calendar size={20} />}
                tittle={"নিয়োগের তারিখ"}
                tittleClass=""
                value={
                  user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("bn-BD")
                    : "N/A"
                }
              />
            </div>
          </div>

          <div className="bg-primary/10 p-10 flex flex-wrap justify-around items-center gap-8 border-t border-base-300">
            <div className="text-center">
              <p className="text-3xl font-black text-primary">৳ ৪৫০.০০</p>
              <p className="text-xs uppercase font-bold opacity-50 tracking-widest">
                আজকের মোট বিক্রি
              </p>
            </div>
            <div className="hidden md:block w-1 h-12 bg-secondary/75 rounded-2xl"></div>
            <div className="text-center">
              <p className="text-3xl font-black text-secondary">১২ জন</p>
              <p className="text-xs uppercase font-bold opacity-50 tracking-widest">
                আপনার কাস্টমার
              </p>
            </div>
            <div className="hidden md:block w-1 h-12 bg-secondary/75 rounded-2xl"></div>
            <div className="text-center">
              <p className="text-3xl font-black text-accent pb-2 ">
                {user?.status || "প্রসেসিং"}
              </p>
              <p className="text-xs uppercase font-bold opacity-50 tracking-widest">
                অ্যাকাউন্ট স্ট্যাটাস
              </p>
            </div>
          </div>
        </div>
      </div>

      <ProfileEditModal user={user} onSave={onUpdateSave} />
    </div>
  );
}
