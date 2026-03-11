"use client";
import axiosInstance from "@/lib/axios";
import { useEffect, useState, useCallback } from "react";
import {
  ShieldCheck,
  EditIcon,
  User2Icon,
  UserCog,
  PhoneCall,
  MapPin,
  Cake,
  CreditCard,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import ProfileEditModal from "@/component/Modals/ProfileEditModal";
import Swal from "sweetalert2";
import DetailsCard from "@/component/Global/DetailsCard";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      // /me এপিআই সরাসরি টোকেন থেকে ডাটা নিয়ে আসবে
      const res = await axiosInstance.get("/me");
      if (res.data) {
        setUser(res.data);
      }
    } catch (err) {
      console.error("Profile Fetch Error:", err);
      if (err.response?.status !== 401) {
        // লগইন না থাকলে বারবার অ্যালার্ট দিবে না
        Swal.fire({
          icon: "error",
          title: "ত্রুটি",
          text: err.response?.data?.message || "প্রোফাইল লোড করা সম্ভব হয়নি",
        });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-base-200">
        <span className="loading loading-infinity loading-lg text-primary"></span>
      </div>
    );

  if (!user)
    return (
      <div className="text-center p-20 flex flex-col items-center gap-4">
        <p className="text-xl font-bold">ইউজার ডাটা পাওয়া যায়নি!</p>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-primary"
        >
          আবার চেষ্টা করুন
        </button>
      </div>
    );

  const { details = {}, name, mobile, image, role, status, createdAt } = user;

  return (
    <div className="min-h-screen p-4 md:p-8 flex justify-center">
      <div className="max-w-5xl w-full space-y-8">
        <div className="bg-base-100 rounded-[3rem] shadow-2xl overflow-hidden border border-base-300">
          <div className="h-44 bg-gradient-to-r from-primary to-secondary flex items-center justify-end px-12 relative">
            <h2 className="text-white/20 text-5xl font-black uppercase tracking-tighter hidden md:block">
              My Profile
            </h2>
          </div>

          <div className="px-8 pb-10">
            <div className="flex flex-col md:flex-row items-end gap-6 -mt-20">
              <div className="relative group">
                <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-8 border-base-100 shadow-2xl">
                  <Image
                    src={image || "https://i.ibb.co/jPvqvwG3"}
                    alt={name}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -top-2 -right-2">
                  <span className="badge badge-secondary p-4 font-bold uppercase">
                    {role}
                  </span>
                </div>
              </div>

              <div className="flex-1 pb-2 text-center md:text-left">
                <h1 className="text-4xl font-black text-base-content uppercase">
                  {name}
                </h1>
                <p className="text-primary font-bold flex items-center justify-center md:justify-start gap-2">
                  <ShieldCheck size={18} /> {status}
                </p>
              </div>

              <div className="pb-2">
                <button
                  onClick={() =>
                    document.getElementById("edit_User_modal").showModal()
                  }
                  className="btn btn-warning rounded-2xl gap-2 font-bold px-8"
                >
                  <EditIcon size={18} /> এডিট প্রোফাইল
                </button>
              </div>
            </div>

            <div className="divider my-10 opacity-30"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DetailsCard
                icon={<User2Icon size={20} />}
                tittle="পিতার নাম"
                value={details.fatherName || "দেওয়া হয়নি"}
                iconClass="bg-blue-100 text-blue-600"
              />
              <DetailsCard
                icon={<UserCog size={20} />}
                tittle="মাতার নাম"
                value={details.motherName || "দেওয়া হয়নি"}
                iconClass="bg-pink-100 text-pink-600"
              />
              <DetailsCard
                icon={<PhoneCall size={20} />}
                tittle="মোবাইল"
                value={mobile}
                iconClass="bg-green-100 text-green-600"
              />
              <DetailsCard
                icon={<MapPin size={20} />}
                tittle="ঠিকানা"
                value={details.address || "দেওয়া হয়নি"}
                iconClass="bg-orange-100 text-orange-600"
              />
              <DetailsCard
                icon={<Cake size={20} />}
                tittle="জন্ম তারিখ"
                value={details.dob || "দেওয়া হয়নি"}
                iconClass="bg-purple-100 text-purple-600"
              />
              <DetailsCard
                icon={<CreditCard size={20} />}
                tittle="NID নম্বর"
                value={details.nidNumber || "দেওয়া হয়নি"}
                iconClass="bg-slate-100 text-slate-600"
              />
              <DetailsCard
                icon={<Calendar size={20} />}
                tittle="যোগদানের তারিখ"
                value={
                  createdAt
                    ? new Date(createdAt).toLocaleDateString("bn-BD")
                    : "জানা নেই"
                }
                iconClass="bg-teal-100 text-teal-600"
              />
            </div>
          </div>

          <div className="p-8 bg-base-200/50">
            <h3 className="text-2xl font-black text-primary mb-6 flex items-center gap-2">
              <CreditCard /> পরিচয়পত্র (NID)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="text-sm font-bold opacity-60 uppercase tracking-widest">
                  সামনের অংশ
                </p>
                <div className="relative aspect-video rounded-3xl overflow-hidden border-4 border-white shadow-lg bg-white">
                  <Image
                    src={
                      details.nidPdfFornt ||
                      "https://i.ibb.co/mrgsh0vY/nid-placeholder.png"
                    }
                    alt="NID Front"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-bold opacity-60 uppercase tracking-widest">
                  পিছনের অংশ
                </p>
                <div className="relative aspect-video rounded-3xl overflow-hidden border-4 border-white shadow-lg bg-white">
                  <Image
                    src={
                      details.nidPdfBackpart ||
                      "https://i.ibb.co/mrgsh0vY/nid-placeholder.png"
                    }
                    alt="NID Back"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProfileEditModal user={user} onSave={fetchProfile} />
    </div>
  );
}
