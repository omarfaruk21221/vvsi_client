"use client";
import React, { useEffect, useState, useMemo } from "react";
import {
  Edit,
  Trash2,
  Eye,
  User2Icon,
  UserPlusIcon,
  SearchIcon,
  ArrowUpDown,
  Users,
  List,
  Grid,
  ContactRound,
} from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { FadeIn } from "@/component/Animations/FadeIn";
import { AnimatedButton } from "@/component/Animations/AnimatedBtn";
import Pagination from "@/component/Global/Pagination";
import Swal from "sweetalert2";
// আপডেট করা কম্পোনেন্ট নামসমূহ
import UserViewModal from "@/component/Modals/CustomerViewModal";
import UserEditModal from "@/component/Modals/CustomerEditModal";
import UserListBanner from "@/component/Bannars/CustomerListBanner";
import UserGrid from "@/component/Dashboard/CustomerGrid";
import UserTable from "@/component/Dashboard/CustomerTable";
import WorkerListBanner from "@/component/Bannars/WorkerListBannar";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ইউজার ডাটা ফেচ করা
  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error("ইউজার ডাটা ফেচ করতে সমস্যা হয়েছে:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // এডিট হ্যান্ডলার
  const handleEdit = (user) => {
    setSelectedUser(user);
    const modal = document.getElementById("edit_user_modal");
    if (modal) modal.showModal();
  };

  // আপডেট সেভ হ্যান্ডলার
  const handleSaveUpdate = async (updatedData) => {
    const modal = document.getElementById("edit_user_modal");
    try {
      const response = await axiosInstance.patch(
        `/update_user/${selectedUser._id}`,
        updatedData,
      );
      if (response.status === 200) {
        await Swal.fire({
          title: "সফল!",
          text: "ইউজারের তথ্য আপডেট করা হয়েছে।",
          icon: "success",
          target: modal,
        });
        fetchUsers();
        modal.close();
      }
    } catch (error) {
      Swal.fire({
        title: "ব্যর্থ!",
        text: "সার্ভারে সমস্যা হয়েছে।",
        icon: "error",
        target: modal,
      });
    }
  };

  // ডিলিট হ্যান্ডলার
  const handleDelete = async (id) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এটি ডিলিট করলে আর ফিরে পাওয়া যাবে না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "হ্যাঁ, ডিলিট করুন",
      cancelButtonText: "বাতিল",
      customClass: { container: "z-[999999]" },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/delete_user/${id}`);
          fetchUsers();
          Swal.fire({
            title: "ডিলিট হয়েছে!",
            text: "ইউজার প্রোফাইলটি সফলভাবে মুছে ফেলা হয়েছে।",
            icon: "success",
            customClass: { container: "z-[999999]" },
          });
        } catch (e) {
          console.error(e);
        }
      }
    });
  };

  // সার্চ এবং সর্টিং ফিল্টার
  const filteredUsers = useMemo(() => {
    let result = users.filter(
      (u) =>
        u.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        u.mobile?.includes(searchText) ||
        u.user_id?.toString().includes(searchText), // cust_id এর বদলে user_id
    );
    return result.sort((a, b) =>
      sortOrder === "asc" ? a.user_id - b.user_id : b.user_id - a.user_id,
    );
  }, [users, searchText, sortOrder]);

  // পেজিনেশন লজিক
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <FadeIn>
      <div className="p-4 md:p-8 min-h-screen bg-base-200/30">
        <style jsx global>{`
          .swal2-container {
            z-index: 999999 !important;
          }
        `}</style>

        <WorkerListBanner
          icon={<ContactRound size={32} className="text-primary" />}
          title1={"কর্মচারীদের "}
          title2={" তালিকা"}
          totalCustomers={users.length}
          filteredCount={filteredUsers.length}
        />

        {/* সার্চ এবং কন্ট্রোল সেকশন */}
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-8 bg-base-100 p-5 rounded-3xl shadow-sm border border-base-300">
            <div className="flex items-center gap-4">
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
              <span className="w-1 h-9 bg-primary/20 rounded-full hidden md:block"></span>
              <div className="relative w-full md:w-96">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                <input
                  type="search"
                  placeholder="নাম, মোবাইল বা আইডি দিয়ে খুঁজুন..."
                  className="input input-bordered w-full pl-12 bg-base-200/50 border-none rounded-2xl font-medium focus:ring-2 ring-primary/20 transition-all"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="btn btn-ghost bg-base-200 hover:bg-base-300 gap-2 rounded-2xl font-bold px-6 border-none"
              >
                <ArrowUpDown size={16} />
                {sortOrder === "asc" ? "পুরাতন আগে" : "নতুন আগে"}
              </button>
              <Link href="/dashboard/add-user">
                <AnimatedButton className="btn btn-primary gap-2 rounded-2xl px-6 shadow-lg shadow-primary/20 border-none">
                  <UserPlusIcon className="w-5 h-5" /> নতুন ইউজার
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* ডাটা প্রদর্শন (টেবিল বা গ্রিড) */}
        {viewMode === "list" ? (
          <UserTable
            customers={paginatedUsers} // আপনার চাইল্ড কম্পোনেন্ট প্রপস 'customers' হলে এটিই রাখুন
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={(u) => {
              setSelectedUser(u);
              document.getElementById("view_customer_modal").showModal();
            }}
          />
        ) : (
          <UserGrid
            customers={paginatedUsers}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={(u) => {
              setSelectedUser(u);
              document.getElementById("view_customer_modal").showModal();
            }}
          />
        )}

        {/* পেজিনেশন এবং মোডাল */}
        <div className="mt-8">
          <Pagination
            totalItems={filteredUsers.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

        <UserViewModal customer={selectedUser} />
        <UserEditModal customer={selectedUser} onSave={handleSaveUpdate} />
      </div>
    </FadeIn>
  );
}
