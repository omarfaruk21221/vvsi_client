"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  ArrowUpDown,
  Grid,
  List,
  SearchIcon,
  ShieldUser,
  UserPlusIcon,
  CheckCircle2,
  XCircle,
  Briefcase,
  Loader2,
} from "lucide-react";
import { FadeIn } from "@/component/Animations/FadeIn";
import { AnimatedButton } from "@/component/Animations/AnimatedBtn";
import WorkerListBanner from "@/component/Bannars/WorkerListBannar";
import axiosInstance from "@/lib/axios";
import Swal from "sweetalert2";
import Link from "next/link";
import Pagination from "@/component/Global/Pagination";

export default function WorkerApplicationList() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [viewMode, setViewMode] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 8;

  // ব্যাকেন্ড থেকে ডাটা ফেচ করা (Server-side handling)
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      // API এন্ডপয়েন্টে কুয়েরি প্যারামিটার পাঠানো হচ্ছে
      const response = await axiosInstance.get("/users", {
        params: {
          status: "প্রসেসিং", // শুধুমাত্র 'প্রসেসিং' ডাটা ফিল্টার হবে ব্যাকেন্ডে
          search: searchText,
          sort: sortOrder,
          page: currentPage,
          limit: itemsPerPage,
        },
      });

      // আপনার ব্যাকেন্ডের রেসপন্স ফরম্যাট অনুযায়ী সেট করুন
      // যদি ডাটা সরাসরি অ্যারে হয় তবে: setWorkers(response.data);
      // আর যদি অবজেক্টে কাউন্ট থাকে তবে:
      setWorkers(response.data.data || response.data);
      setTotalItems(response.data.totalCount || response.data.length);
    } catch (error) {
      console.error("ডাটা লোড করতে সমস্যা হয়েছে:", error);
    } finally {
      setLoading(false);
    }
  }, [searchText, sortOrder, currentPage]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchApplications();
    }, 500); // সার্চের জন্য ডিবউন্স

    return () => clearTimeout(delayDebounceFn);
  }, [fetchApplications]);

  // স্ট্যাটাস আপডেট (Accept/Active)
  const handleStatusUpdate = async (id, newStatus) => {
    const result = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: `আবেদনটি ${newStatus === "active" ? "এপ্রুভ" : "বাতিল"} করতে চান?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--fallback-p,oklch(var(--p)))",
      confirmButtonText: "হ্যাঁ",
      cancelButtonText: "না",
      target: "#edit_user_modal", // যদি মোডালের ভেতর থেকে কল হয়
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.patch(`/update_user/${id}`, { status: newStatus });
        Swal.fire("সফল!", `স্ট্যাটাস এখন ${newStatus}`, "success");
        fetchApplications();
      } catch (error) {
        Swal.fire("ব্যর্থ!", "সার্ভারে সমস্যা হয়েছে", "error");
      }
    }
  };

  // ক্যাটাগরি পরিবর্তন হ্যান্ডলার
  const handleChangeCategory = async (id, currentCategory) => {
    const { value: newCategory } = await Swal.fire({
      title: "ক্যাটাগরি পরিবর্তন করুন",
      input: "select",
      inputOptions: {
        Junior: "Junior",
        Senior: "Senior",
        Expert: "Expert",
        Premium: "Premium",
      },
      inputValue: currentCategory || "Junior",
      showCancelButton: true,
      confirmButtonColor: "var(--fallback-p,oklch(var(--p)))",
    });

    if (newCategory) {
      try {
        await axiosInstance.patch(`/update_user/${id}`, {
          category: newCategory,
        });
        fetchApplications();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-base-200/50">
      <FadeIn>
        <WorkerListBanner
          icon={<ShieldUser size={40} className="text-primary" />}
          title1={"কর্মচারীদের"}
          title2={"আবেদন"}
          count={totalItems}
        />

        {/* কন্ট্রোল বার */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 my-8 bg-base-100 p-5 rounded-[2rem] shadow-sm border border-base-300">
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="flex bg-base-200 p-1.5 rounded-2xl gap-1">
              <button
                onClick={() => setViewMode("list")}
                className={`btn btn-sm rounded-xl border-none ${viewMode === "list" ? "btn-primary shadow-md" : "btn-ghost text-base-content/40"}`}
              >
                <List size={18} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`btn btn-sm rounded-xl border-none ${viewMode === "grid" ? "btn-primary shadow-md" : "btn-ghost text-base-content/40"}`}
              >
                <Grid size={18} />
              </button>
            </div>

            <div className="relative w-full md:w-80">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-50" />
              <input
                type="search"
                placeholder="নাম বা মোবাইল দিয়ে খুঁজুন..."
                className="input input-bordered w-full pl-12 bg-base-200/50 border-none rounded-2xl font-medium focus:ring-2 ring-primary/20 transition-all text-base-content"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setCurrentPage(1); // সার্চ করলে প্রথম পেজে ফেরত যাবে
                }}
              />
            </div>
          </div>

          <div className="flex gap-3 w-full lg:w-auto">
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="btn btn-ghost bg-base-200 hover:bg-base-300 gap-2 rounded-2xl font-bold px-6 border-none"
            >
              <ArrowUpDown size={16} />
              {sortOrder === "asc" ? "পুরাতন আগে" : "নতুন আগে"}
            </button>
            <Link href="/dashboard/worker-list">
              <AnimatedButton className="btn btn-primary gap-2 rounded-2xl px-6 shadow-lg shadow-primary/20 border-none">
                <UserPlusIcon className="w-5 h-5" /> সকল কর্মচারী
              </AnimatedButton>
            </Link>
          </div>
        </div>

        {/* লোডিং এবং কন্টেন্ট সেকশন */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-12 h-12 text-primary animate-spin opacity-20" />
            <p className="mt-4 font-bold opacity-30 animate-pulse">
              ডাটা লোড হচ্ছে...
            </p>
          </div>
        ) : workers.length > 0 ? (
          viewMode === "list" ? (
            <div className="overflow-x-auto bg-base-100 rounded-[2rem] border border-base-300 shadow-sm">
              <table className="table table-zebra w-full">
                <thead className="bg-base-200/50 text-base-content/70">
                  <tr className="border-none">
                    <th className="p-5">আবেদনকারী</th>
                    <th>ক্যাটাগরি</th>
                    <th>মোবাইল</th>
                    <th className="text-center">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {workers.map((worker) => (
                    <tr
                      key={worker._id}
                      className="border-base-200 hover:bg-base-200/30 transition-colors"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="w-12 h-12 rounded-2xl bg-base-300">
                              <img
                                src={worker.image || "/avatar.png"}
                                alt={worker.name}
                              />
                            </div>
                          </div>
                          <div>
                            <p className="font-black text-base text-base-content leading-none uppercase italic italic tracking-tighter">
                              {worker.name}
                            </p>
                            <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest mt-1">
                              ID: {worker.user_id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            handleChangeCategory(worker._id, worker.category)
                          }
                          className="badge badge-outline border-primary/30 text-primary font-bold hover:bg-primary hover:text-primary-content transition-all cursor-pointer p-3"
                        >
                          <Briefcase size={12} className="mr-1" />{" "}
                          {worker.category || "General"}
                        </button>
                      </td>
                      <td className="font-bold opacity-70 text-base-content">
                        {worker.mobile}
                      </td>
                      <td>
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() =>
                              handleStatusUpdate(worker._id, "active")
                            }
                            className="btn btn-sm btn-success rounded-xl text-white gap-1 shadow-lg shadow-success/10"
                          >
                            <CheckCircle2 size={16} /> গ্রহণ
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(worker._id, "rejected")
                            }
                            className="btn btn-sm btn-ghost hover:bg-error/10 text-error rounded-xl"
                          >
                            <XCircle size={16} /> বাতিল
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {workers.map((worker) => (
                <div
                  key={worker._id}
                  className="bg-base-100 p-6 rounded-[2.5rem] border border-base-300 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4">
                    <div className="badge badge-warning font-black text-[10px] uppercase tracking-tighter italic shadow-sm">
                      প্রসেসিং
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative">
                      <img
                        src={worker.image || "/avatar.png"}
                        className="w-24 h-24 rounded-[2rem] object-cover ring-4 ring-base-200 shadow-inner"
                      />
                      <button
                        onClick={() =>
                          handleChangeCategory(worker._id, worker.category)
                        }
                        className="absolute -bottom-2 -right-2 btn btn-circle btn-xs btn-primary shadow-lg border-none"
                      >
                        <Edit3 size={10} />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-black text-xl italic uppercase tracking-tighter leading-none text-base-content">
                        {worker.name}
                      </h3>
                      <p className="text-xs opacity-50 font-bold mt-1 tracking-widest">
                        {worker.mobile}
                      </p>
                    </div>
                    <div className="flex gap-2 w-full pt-2">
                      <button
                        onClick={() => handleStatusUpdate(worker._id, "active")}
                        className="btn btn-primary btn-sm flex-1 rounded-xl shadow-lg shadow-primary/20"
                      >
                        এপ্রুভ
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(worker._id, "rejected")
                        }
                        className="btn btn-ghost btn-sm flex-1 bg-base-200 rounded-xl"
                      >
                        বাতিল
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-base-100 rounded-[3rem] border-2 border-dashed border-base-300">
            <ShieldUser size={60} className="opacity-10 mb-4" />
            <p className="font-black text-xl opacity-20 uppercase tracking-widest text-base-content">
              কোনো পেন্ডিং আবেদন নেই
            </p>
          </div>
        )}

        {/* পেজিনেশন */}
        <div className="mt-10">
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </FadeIn>
    </div>
  );
}

const Edit3 = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);
