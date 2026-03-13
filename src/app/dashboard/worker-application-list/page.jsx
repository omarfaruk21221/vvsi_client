"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  ArrowUpDown,
  Grid,
  List,
  SearchIcon,
  ShieldUser,
  UserPlusIcon,
  Loader2,
} from "lucide-react";
import { FadeIn } from "@/component/Animations/FadeIn";
import { AnimatedButton } from "@/component/Animations/AnimatedBtn";
import WorkerListBanner from "@/component/Bannars/WorkerListBannar";
import axiosInstance from "@/lib/axios";
import Swal from "sweetalert2";
import Link from "next/link";
import Pagination from "@/component/Global/Pagination";
import WorkerApplicationTable from "@/app/dashboard/worker-application-list/WorkerApplicationTable";
import WorkerApplicationGrid from "@/app/dashboard/worker-application-list/WorkerApplicationGrid";

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
      setWorkers(response.data.data || []);
      setTotalItems(Number(response.data.totalCount || 0));
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
    const statusLabel = newStatus === "active" ? "এপ্রুভ" : "বাতিল";
    const result = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: `আবেদনটি ${statusLabel} করতে চান?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ",
      cancelButtonText: "না",
      confirmButtonColor: newStatus === "active" ? "#22c55e" : "#ef4444",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.patch(`/update_user/${id}`, {
          status: newStatus,
        });
        if (response.status === 200 || response.status === 204) {
          Swal.fire({
            title: "সফল!",
            text: `আবেদনটি সফলভাবে ${statusLabel} করা হয়েছে।`,
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          fetchApplications();
        }
      } catch (error) {
        Swal.fire("ব্যর্থ!", "সার্ভারে সমস্যা হয়েছে।", "error");
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

        {/* Filter Section */}
        <div className="sticky top-5 z-30 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 my-8 bg-base-100 p-5 rounded-[2.5rem] shadow-sm border border-base-300">
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="flex bg-base-200 p-1 rounded-2xl gap-1">
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
              <span className="hidden md:block w-[1px] h-8 bg-base-300"></span>
              <div className="relative w-full md:w-80">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary opacity-60" />
                <input
                  type="search"
                  placeholder="নাম বা মোবাইল..."
                  className="input input-bordered w-full pl-12 bg-base-200 border-none rounded-2xl font-medium focus:ring-2 ring-primary/20 transition-all"
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
                <ArrowUpDown size={16} />{" "}
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

        {/* Content Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-12 h-12 text-primary animate-spin opacity-20" />
            <p className="mt-4 font-bold opacity-30 animate-pulse">
              ডাটা লোড হচ্ছে...
            </p>
          </div>
        ) : workers.length > 0 ? (
          viewMode === "list" ? (
            <WorkerApplicationTable
              workers={workers}
              onStatusUpdate={handleStatusUpdate}
            />
          ) : (
            <WorkerApplicationGrid
              workers={workers}
              onStatusUpdate={handleStatusUpdate}
            />
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-base-100 rounded-[3rem] border-2 border-dashed border-base-300">
            <ShieldUser size={80} className="opacity-10 mb-4 text-primary" />
            <p className="font-black text-xl opacity-20 uppercase tracking-widest text-base-content">
              কোনো আবেদন পাওয়া যায়নি
            </p>
          </div>
        )}

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
