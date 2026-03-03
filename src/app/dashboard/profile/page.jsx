"use client";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import {
  User,
  Phone,
  ShieldCheck,
  Calendar,
  LogOut,
  Camera,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Profile() {
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

  if (!user)
    return (
      <div className="text-center p-20 max-w-2xl rounded-2xl text-4xl text-error">
        ইউজার ডাটা পাওয়া যায়নি!
      </div>
    );

  return (
    <div className="min-h-screen  rounded p-4 md:p-8 flex justify-center items-start">
      <div className="max-w-11/12 w-full">
        {/* Profile Card Container */}
        <div className="relative bg-base-100 rounded-[2.5rem] shadow-2xl overflow-hidden border border-base-300">
          {/* Top Banner (Gradient) */}
          <div className="h-40 bg-linear-to-r from-primary to-secondary opacity-90">
            <p className="text-sm font-bold text-primary flex items-center gap-2">
              <ShieldCheck size={16} /> {user.role || "user"} Account
            </p>
          </div>

          {/* User Image & Basic Info */}
          <div className="relative px-8 pb-8">
            <div className="flex flex-col md:flex-row items-end gap-6 -mt-16">
              <div className="relative group">
                {/* ইমেজ কন্টেইনার */}
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden border-8 border-base-100 shadow-xl bg-base-300">
                  <Image
                    src={user.image || "https://i.ibb.co.com/jPvqvwG3"}
                    alt="User"
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="absolute -top-3 -right-6 z-10">
                  <p className="uppercase w-fit px-4 py-1 rounded-2xl shadow-lg shadow-secondary/40 bg-secondary text-secondary-content font-bold text-sm md:text-base">
                    {user.role || "user"}
                  </p>
                </div>

                <button className="absolute bottom-2 right-2 p-2 bg-primary text-white rounded-xl shadow-lg hover:scale-110 transition-transform z-10">
                  <Camera size={18} />
                </button>
              </div>

              <div className="flex-1 pb-2">
                <h1 className="text-3xl font-black text-base-content uppercase tracking-tighter">
                  {user.username}
                </h1>
                <p className="text-sm font-bold text-primary flex items-center gap-2">
                  <ShieldCheck size={16} /> {user.role || "user"} Account
                </p>
              </div>

              <div className="pb-2">
                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-error rounded-2xl gap-2 font-bold px-6"
                >
                  <LogOut size={18} /> লগ-আউট
                </button>
              </div>
            </div>

            <div className="divider opacity-50 my-8"></div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Info Box 1 */}
              <div className="p-6 bg-base-200/50 rounded-[2rem] border border-base-300 hover:border-primary/30 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-primary/10 text-primary rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black opacity-40 tracking-widest">
                      Username
                    </p>
                    <p className="text-lg font-bold text-base-content">
                      {user.username}
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Box 2 */}
              <div className="p-6 bg-base-200/50 rounded-[2rem] border border-base-300 hover:border-secondary/30 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-secondary/10 text-secondary rounded-2xl group-hover:bg-secondary group-hover:text-white transition-all">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black opacity-40 tracking-widest">
                      Mobile Number
                    </p>
                    <p className="text-lg font-bold text-base-content">
                      {user.mobile}
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Box 3 */}
              <div className="p-6 bg-base-200/50 rounded-[2rem] border border-base-300 hover:border-accent/30 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-accent/10 text-accent rounded-2xl group-hover:bg-accent group-hover:text-white transition-all">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black opacity-40 tracking-widest">
                      Joined Date
                    </p>
                    <p className="text-lg font-bold text-base-content">
                      {new Date(user.createdAt).toLocaleDateString("bn-BD")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats/Footer */}
          <div className="bg-base-200 p-8 flex justify-around items-center text-center">
            <div>
              <p className="text-2xl font-black text-primary">৳ ৪৫০.০০</p>
              <p className="text-[10px] uppercase font-bold opacity-50">
                আজকের সেল
              </p>
            </div>
            <div className="w-[1px] h-10 bg-base-300"></div>
            <div>
              <p className="text-2xl font-black text-secondary">১২ জন</p>
              <p className="text-[10px] uppercase font-bold opacity-50">
                মোট কাস্টমার
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
