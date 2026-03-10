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
  MapPin,
  Calendar,
  Fingerprint,
} from "lucide-react";

import { FadeIn } from "@/component/Animations/FadeIn";

import { AnimatedButton } from "@/component/Animations/AnimatedBtn";

import WorkerListBanner from "@/component/Bannars/WorkerListBannar";

import axiosInstance from "@/lib/axios";

import Swal from "sweetalert2";

import Link from "next/link";

import Pagination from "@/component/Global/Pagination";

import Image from "next/image";

export default function WorkerApplicationList() {
  const [workers, setWorkers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");

  const [sortOrder, setSortOrder] = useState("desc");

  const [viewMode, setViewMode] = useState("list");

  const [currentPage, setCurrentPage] = useState(1);

  const [totalItems, setTotalItems] = useState(0);

  const itemsPerPage = 10;

  const fetchApplications = useCallback(async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get("/users", {
        params: {
          status: "pending",

          search: searchText,

          sort: sortOrder,

          page: currentPage,

          limit: itemsPerPage,
        },
      });

      setWorkers(response.data.data || response.data);

      setTotalItems(
        Number(response.data.totalCount || response.data.length || 0),
      );
    } catch (error) {
      console.error("ডাটা লোড করতে সমস্যা হয়েছে:", error);
    } finally {
      setLoading(false);
    }
  }, [searchText, sortOrder, currentPage]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchApplications();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchApplications]);

  const handleStatusUpdate = async (id, newStatus) => {
    const result = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",

      text: `আবেদনটি ${newStatus === "active" ? "এপ্রুভ" : "বাতিল"} করতে চান?`,

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "হ্যাঁ",

      cancelButtonText: "না",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.patch(`/update_user/${id}`, { status: newStatus });

        Swal.fire("সফল!", `স্ট্যাটাস এখন ${newStatus}`, "success");

        if (response.status === 200 || response.status === 204) {
          await Swal.fire({
            title: "সফল!",

            text: `আবেদনটি সফলভাবে ${newStatus === "active" ? "এপ্রুভ" : "বাতিল"} করা হয়েছে।`,

            icon: "success",

            timer: 1500,

            showConfirmButton: false,
          });
        }

        fetchApplications();
      } catch (error) {
        Swal.fire("ব্যর্থ!", "সার্ভারে সমস্যা হয়েছে", "error");
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
                  placeholder="নাম, মোবাইল বা আইডি..."
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

              <Link
                href="/dashboard/worker-list"
                className="flex-1 md:flex-none"
              >
                <AnimatedButton className="btn btn-primary gap-2 rounded-2xl px-6 shadow-lg shadow-primary/20 border-none w-full">
                  <UserPlusIcon className="w-5 h-5" /> সকল কর্মচারী
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
              ডাটা লোড হচ্ছে...
            </p>
          </div>
        ) : workers.length > 0 ? (
          viewMode === "list" ? (
            /* টেবিল ভিউ */

            <div className="overflow-x-auto bg-base-100 rounded-[2.5rem] border border-base-300 shadow-xl">
              <table className="table w-full border-separate border-spacing-0">
                <thead className="bg-primary/25 text-primary">
                  <tr>
                    <th className="p-6 rounded-tl-[2.5rem]">আবেদনকারী</th>

                    <th>অভিভাবক</th>

                    <th>এনআইডি ও জন্ম</th>

                    <th>ঠিকানা</th>

                    <th>অবস্থান</th>

                    <th className="text-center rounded-tr-[2.5rem]">অ্যাকশন</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-base-200">
                  {workers.map((worker) => (
                    <tr
                      key={worker._id}
                      className="hover:bg-primary/20 transition-colors group"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="w-14 h-14 rounded-2xl ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all overflow-hidden">
                              <Image
                                width={100}
                                height={100}
                                alt={worker.name}
                                src={worker.image || "/avatar.png"}
                                className="object-cover"
                              />
                            </div>
                          </div>

                          <div>
                            <p className="font-black text-base text-base-content leading-none uppercase italic tracking-tighter group-hover:text-primary transition-colors">
                              {worker.name}
                            </p>

                            <span className="badge badge-sm badge-ghost font-bold mt-2 opacity-70 uppercase tracking-widest text-[9px]">
                              {worker.category}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="text-xs">
                        <p className="font-bold text-base-content/80 mb-1">
                          পিতা: {worker.fatherName}
                        </p>

                        <p className="opacity-60 italic">
                          মাতা: {worker.motherName}
                        </p>
                      </td>

                      <td className="text-xs">
                        <div className="flex items-center gap-1 font-mono font-bold text-primary mb-1">
                          <Fingerprint size={14} /> {worker.nidNumber}
                        </div>

                        <div className="flex items-center gap-1 opacity-60">
                          <Calendar size={14} /> {worker.dob}
                        </div>
                      </td>

                      <td>
                        <div className="flex items-start gap-1 text-xs mb-1">
                          <MapPin
                            size={14}
                            className="mt-0.5 text-secondary shrink-0"
                          />

                          <span className="truncate">{worker.address}</span>
                        </div>

                        <p className="text-xs font-black text-secondary ml-4">
                          {worker.mobile}
                        </p>
                      </td>

                      <td className="">
                        <span
                          className={`${worker.status == "pending" ? "bg-warning py-1 text-warning-content rounded-2xl px-4" : "bg-success text-success-content"}`}
                        >
                          {`${worker.status == "pending" ? "প্রসেসিং,,,," : "কর্মরত"}`}
                        </span>
                      </td>

                      <td>
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() =>
                              handleStatusUpdate(worker._id, "active")
                            }
                            className="btn btn-sm btn-success rounded-xl text-white gap-1 shadow-md hover:scale-105 transition-transform"
                          >
                            <CheckCircle2 size={16} /> গ্রহণ
                          </button>

                          <button
                            onClick={() =>
                              handleStatusUpdate(worker._id, "rejected")
                            }
                            className="btn btn-sm btn-ghost hover:bg-error/10 text-error rounded-xl transition-colors"
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
            /* গ্রিড ভিউ */

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {workers.map((worker) => (
                <div
                  key={worker._id}
                  className="bg-base-100 p-6 rounded-[2.5rem] border border-base-300 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4">
                    <div className="badge badge-warning font-black text-[10px] uppercase italic shadow-sm">
                      {worker.status === "active" ? "সক্রিয়" : "প্রসেসিং"}
                    </div>
                  </div>

                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative">
                      <Image
                        width={120}
                        height={120}
                        src={worker.image || "/avatar.png"}
                        className="w-28 h-28 rounded-[4xl object-cover ring-4 ring-primary/5 shadow-inner transition-transform group-hover:rotate-3 group-hover:scale-105"
                        alt={worker.name}
                      />

                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-base-100 text-sm font-bold px-4 py-1 rounded-full shadow-lg whitespace-nowrap">
                        {worker.category}
                      </div>
                    </div>

                    <div className="w-full pt-2">
                      <h3 className="font-black text-xl italic uppercase tracking-tighter text-base-content truncate">
                        {worker.name}
                      </h3>

                      <p className="text-xs font-black text-primary mb-4">
                        {worker.mobile}
                      </p>

                      <div className="bg-primary/5 rounded-4xl p-4 text-left text-[11px] space-y-2 border border-primary/10">
                        <p className="truncate flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                          <strong>পিতা:</strong> {worker.fatherName}
                        </p>

                        <p className="truncate flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                          <strong>ঠিকানা:</strong> {worker.address}
                        </p>

                        <p className="font-mono text-[10px] text-center pt-2 border-t border-primary/10 mt-2 opacity-70">
                          {worker.nidNumber}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full">
                      <button
                        onClick={() => handleStatusUpdate(worker._id, "active")}
                        className="btn btn-primary btn-sm flex-1 rounded-xl shadow-lg shadow-primary/20 font-bold"
                      >
                        এপ্রুভ
                      </button>

                      <button
                        onClick={() =>
                          handleStatusUpdate(worker._id, "rejected")
                        }
                        className="btn btn-ghost btn-sm flex-1 bg-base-200 rounded-xl font-bold"
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
          /* এমটি স্টেট */

          <div className="flex flex-col items-center justify-center py-24 bg-base-100 rounded-[3rem] border-2 border-dashed border-base-300">
            <ShieldUser size={80} className="opacity-10 mb-4 text-primary" />

            <p className="font-black text-xl opacity-20 uppercase tracking-[0.2em] text-base-content">
              কোনো আবেদন পাওয়া যায়নি
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
