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
  ListCollapse,
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
import SearchBar from "@/component/Global/SearchBar";

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

        {/* Search filter grid table bar  */}
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          viewMode={viewMode}
          setViewMode={setViewMode}
          // btnIcon={<ListCollapse size={20} />}
          addLink="/dashboard/worker-list"
          addText="কর্মচারী তালিকা"
          placeholder="নাম, মোবাইল বা আইডি দিয়ে খুঁজুন..."
          onSearchChange={() => setCurrentPage(1)}
        />

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
