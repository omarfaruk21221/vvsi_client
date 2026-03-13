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
} from "lucide-react";
import { FadeIn } from "@/component/Animations/FadeIn";
import { AnimatedButton } from "@/component/Animations/AnimatedBtn";
import WorkerListBanner from "@/component/Bannars/WorkerListBannar";
import axiosInstance from "@/lib/axios";
import Swal from "sweetalert2";
import Link from "next/link";
import Pagination from "@/component/Global/Pagination";
import UserViewModal from "@/component/Modals/CustomerViewModal";
import UserEditModal from "@/component/Modals/CustomerEditModal";
import WorkerTable from "./WorkerListTable";
import WorkerGrid from "./WorkerListGrid";
import SearchBar from "@/component/Global/SearchBar";

export default function WorkerList() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [viewMode, setViewMode] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const itemsPerPage = 10;

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
      const data = response.data.data || response.data;
      setWorkers(Array.isArray(data) ? data : []);
      setTotalItems(Number(response.data.totalCount || 0));
    } catch (error) {
      console.error("ডাটা লোড করতে সমস্যা হয়েছে:", error);
    } finally {
      setLoading(false);
    }
  }, [searchText, sortOrder, currentPage]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => fetchWorkers(), 500);
    return () => clearTimeout(delayDebounceFn);
  }, [fetchWorkers]);

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
        Swal.fire("ব্যর্থ!", "সার্ভারে সমস্যা হয়েছে", "error");
      }
    }
  };

  const handleView = (worker) => {
    setSelectedUser(worker);
    document.getElementById("view_customer_modal").showModal();
  };

  const handleEdit = (worker) => {
    setSelectedUser(worker);
    document.getElementById("edit_user_modal").showModal();
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

        {/* কন্ট্রোল বার */}
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          viewMode={viewMode}
          setViewMode={setViewMode}
          addLink="/dashboard/worker-application-list"
          addText="আবেদনের তালিকা"
          placeholder="নাম, মোবাইল বা আইডি দিয়ে খুঁজুন..."
          onSearchChange={() => setCurrentPage(1)}
        />
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
            <WorkerTable
              workers={workers}
              onDelete={handleDelete}
              onView={handleView}
              onEdit={handleEdit}
            />
          ) : (
            <WorkerGrid
              workers={workers}
              onDelete={handleDelete}
              onView={handleView}
              onEdit={handleEdit}
            />
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-base-100 rounded-[3rem] border-2 border-dashed border-base-300">
            <ContactRound size={80} className="opacity-10 mb-4 text-primary" />
            <p className="font-black text-xl opacity-20 uppercase tracking-widest text-base-content">
              কোনো ডাটা পাওয়া যায়নি
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

        <UserViewModal customer={selectedUser} />
        <UserEditModal customer={selectedUser} onSave={fetchWorkers} />
      </FadeIn>
    </div>
  );
}
