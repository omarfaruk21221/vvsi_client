"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  ArrowUpDown,
  Grid,
  List,
  SearchIcon,
  ContactRound,
  UserPlusIcon,
  Loader2,
  MapPin,
  Calendar,
  Fingerprint,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { FadeIn } from "@/component/Animations/FadeIn";
import { AnimatedButton } from "@/component/Animations/AnimatedBtn";
import WorkerListBanner from "@/component/Bannars/WorkerListBannar";
import axiosInstance from "@/lib/axios";
import Swal from "sweetalert2";
import Link from "next/link";
import Pagination from "@/component/Global/Pagination";
import Image from "next/image";
import UserViewModal from "@/component/Modals/CustomerViewModal";
import UserEditModal from "@/component/Modals/CustomerEditModal";

export default function AccepetWorkerList() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [viewMode, setViewMode] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const itemsPerPage = 10;

  // ব্যাকএন্ড থেকে ডাটা ফেচ করা (সার্চ, সর্ট এবং পেজিনেশন সহ)
  const fetchWorkers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/users", {
        params: {
          status: "active",
          search: searchText,
          sort: sortOrder,
          page: currentPage,
          limit: itemsPerPage,
        },
      });

      // API রেসপন্স অনুযায়ী ডাটা সেট করা
      const data = response.data.data || response.data;
      setWorkers(Array.isArray(data) ? data : []);
      setTotalItems(Number(response.data.totalCount || data.length || 0));
    } catch (error) {
      console.error("ডাটা লোড করতে সমস্যা হয়েছে:", error);
      setWorkers([]);
    } finally {
      setLoading(false);
    }
  }, [searchText, sortOrder, currentPage]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchWorkers();
    }, 500); // সার্চিং পারফরম্যান্সের জন্য ৫০০ মি.সে. ডিবাইন্স
    return () => clearTimeout(delayDebounceFn);
  }, [fetchWorkers]);

  // ডিলিট হ্যান্ডলার
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এটি ডিলিট করলে আর ফিরে পাওয়া যাবে না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "হ্যাঁ, ডিলিট করুন",
      cancelButtonText: "বাতিল",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/delete_user/${id}`);
        Swal.fire("সফল!", "প্রোফাইলটি মুছে ফেলা হয়েছে।", "success");
        fetchWorkers();
      } catch (e) {
        Swal.fire("ব্যর্থ!", "সার্ভারে সমস্যা হয়েছে", "error");
      }
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-base-200/50">
      <FadeIn>
        <WorkerListBanner
          icon={<ContactRound size={40} className="text-primary" />}
          title1={"কর্মরত"}
          title2={"কর্মচারী তালিকা"}
          count={totalItems}
        />

        {/* কন্ট্রোল বার (সার্চ ও সর্ট) */}
        <div className="sticky top-5 z-30 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 my-8 bg-primary/10 p-5 rounded-[2.5rem] shadow-sm border border-primary/20">
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="flex bg-base-300 p-1 rounded-2xl gap-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`btn btn-sm rounded-xl border-none ${viewMode === "list" ? "btn-primary shadow-md" : "btn-ghost text-base-content/50"}`}
                >
                  <List size={18} />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`btn btn-sm rounded-xl border-none ${viewMode === "grid" ? "btn-primary shadow-md" : "btn-ghost text-base-content/50"}`}
                >
                  <Grid size={18} />
                </button>
              </div>
              <span className="hidden md:block w-1 h-8 bg-primary/20"></span>
              <div className="relative w-full md:w-80">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-60" />
                <input
                  type="search"
                  placeholder="নাম বা মোবাইল দিয়ে খুঁজুন..."
                  className="input input-bordered w-full pl-12 bg-base-100 border-none rounded-2xl font-medium focus:ring-2 ring-primary/20 transition-all shadow-inner"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            <div className="flex gap-3 w-full lg:w-auto">
              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="btn btn-ghost bg-base-100 hover:bg-base-200 gap-2 rounded-2xl font-bold px-6 shadow-sm flex-1 md:flex-none"
              >
                <ArrowUpDown size={16} />
                {sortOrder === "asc" ? "পুরাতন" : "নতুন"}
              </button>
              <Link href="/dashboard/add-user" className="flex-1 md:flex-none">
                <AnimatedButton className="btn btn-primary gap-2 rounded-2xl px-6 shadow-lg shadow-primary/20 border-none w-full">
                  <UserPlusIcon className="w-5 h-5" /> নতুন কর্মচারী
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </div>

        {/* ডাটা রেন্ডারিং */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-12 h-12 text-primary animate-spin opacity-20" />
            <p className="mt-4 font-bold opacity-30 animate-pulse">
              লোড হচ্ছে...
            </p>
          </div>
        ) : workers.length > 0 ? (
          viewMode === "list" ? (
            <div className="overflow-x-auto bg-base-100 rounded-[2.5rem] border border-base-300 shadow-xl">
              <table className="table w-full border-separate border-spacing-0">
                <thead className="bg-primary/25 text-primary">
                  <tr>
                    <th className="p-6 rounded-tl-[2.5rem]">কর্মচারী</th>
                    <th>এনআইডি ও মোবাইল</th>
                    <th>ঠিকানা</th>
                    <th>ক্যাটাগরি</th>
                    <th className="text-center rounded-tr-[2.5rem]">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-200">
                  {workers.map((worker) => (
                    <tr
                      key={worker._id}
                      className="hover:bg-primary/5 transition-colors group"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="w-14 h-14 rounded-2xl ring-2 ring-primary/10 overflow-hidden">
                              <Image
                                width={60}
                                height={60}
                                alt={worker.name}
                                src={worker.image || "/avatar.png"}
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div>
                            <p className="font-black text-base uppercase italic tracking-tighter group-hover:text-primary transition-colors">
                              {worker.name}
                            </p>
                            <p className="text-[10px] opacity-60">
                              ID: {worker.user_id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="text-xs">
                        <div className="flex items-center gap-1 font-mono font-bold text-primary mb-1">
                          <Fingerprint size={14} /> {worker.nidNumber}
                        </div>
                        <div className="font-black text-secondary">
                          {worker.mobile}
                        </div>
                      </td>
                      <td className="text-xs max-w-[200px]">
                        <div className="flex items-start gap-1">
                          <MapPin
                            size={14}
                            className="mt-0.5 text-secondary shrink-0"
                          />
                          <span className="truncate">{worker.address}</span>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-sm badge-ghost font-bold uppercase text-[9px] tracking-widest">
                          {worker.category}
                        </span>
                      </td>
                      <td>
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedUser(worker);
                              document
                                .getElementById("view_customer_modal")
                                .showModal();
                            }}
                            className="btn btn-sm btn-circle btn-ghost text-info hover:bg-info/10"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedUser(worker);
                              document
                                .getElementById("edit_user_modal")
                                .showModal();
                            }}
                            className="btn btn-sm btn-circle btn-ghost text-warning hover:bg-warning/10"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(worker._id)}
                            className="btn btn-sm btn-circle btn-ghost text-error hover:bg-error/10"
                          >
                            <Trash2 size={18} />
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
                  className="bg-base-100 p-6 rounded-[2.5rem] border border-base-300 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden text-center"
                >
                  <div className="relative inline-block mb-4">
                    <Image
                      width={120}
                      height={120}
                      src={worker.image || "/avatar.png"}
                      className="w-28 h-28 rounded-[3rem] object-cover ring-4 ring-primary/5 transition-transform group-hover:scale-105"
                      alt={worker.name}
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg whitespace-nowrap uppercase tracking-widest">
                      {worker.category}
                    </div>
                  </div>
                  <h3 className="font-black text-xl italic uppercase tracking-tighter text-base-content truncate">
                    {worker.name}
                  </h3>
                  <p className="text-xs font-black text-primary mb-4">
                    {worker.mobile}
                  </p>
                  <div className="flex gap-2 w-full pt-4 border-t border-base-200">
                    <button
                      onClick={() => {
                        setSelectedUser(worker);
                        document
                          .getElementById("view_customer_modal")
                          .showModal();
                      }}
                      className="btn btn-sm btn-ghost flex-1 text-info font-bold bg-info/5 rounded-xl"
                    >
                      ভিউ
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUser(worker);
                        document.getElementById("edit_user_modal").showModal();
                      }}
                      className="btn btn-sm btn-ghost flex-1 text-warning font-bold bg-warning/5 rounded-xl"
                    >
                      এডিট
                    </button>
                    <button
                      onClick={() => handleDelete(worker._id)}
                      className="btn btn-sm btn-ghost flex-1 text-error font-bold bg-error/5 rounded-xl"
                    >
                      ডিলিট
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-base-100 rounded-[3rem] border-2 border-dashed border-base-300">
            <ContactRound size={80} className="opacity-10 mb-4 text-primary" />
            <p className="font-black text-xl opacity-20 uppercase tracking-[0.2em]">
              কোনো ডাটা পাওয়া যায়নি
            </p>
          </div>
        )}

        {/* পেজিনেশন */}
        <div className="mt-12 flex justify-center">
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

        {/* মোডালসমূহ */}
        <UserViewModal customer={selectedUser} />
        <UserEditModal customer={selectedUser} onSave={fetchWorkers} />
      </FadeIn>
    </div>
  );
}
