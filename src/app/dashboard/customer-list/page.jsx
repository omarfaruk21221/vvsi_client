"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  UserPlusIcon,
  SearchIcon,
  ArrowUpDown,
  List,
  Grid,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { FadeIn } from "@/component/Animations/FadeIn";
import { AnimatedButton } from "@/component/Animations/AnimatedBtn";
import Pagination from "@/component/Global/Pagination";
import Swal from "sweetalert2";
import CustomerViewModal from "@/component/Modals/CustomerViewModal";
import CustomerEditModal from "@/component/Modals/CustomerEditModal";
import CustomerListBanner from "@/component/Bannars/CustomerListBanner";
import CustomerGrid from "@/component/Dashboard/CustomerGrid";
import CustomerTable from "@/component/Dashboard/CustomerTable";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true); // লোডিং স্টেট
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0); // মোট ডাটার সংখ্যা
  const itemsPerPage = 10;

  // ব্যাকেন্ড থেকে ডাটা ফেচ করা (সার্ভার সাইড ফিল্টারিং ও পেজিনেশন)
  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/customers", {
        params: {
          search: searchText,
          sort: sortOrder,
          page: currentPage,
          limit: itemsPerPage,
        },
      });

      // ব্যাকেন্ড রেসপন্স অনুযায়ী ডাটা সেট করা
      setCustomers(res.data.data || res.data);
      setTotalCount(res.data.totalCount || 0);
    } catch (error) {
      console.error("ডাটা ফেচ এরর:", error);
    } finally {
      setLoading(false);
    }
  }, [searchText, sortOrder, currentPage]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCustomers();
    }, 500); // সার্চের জন্য ৫০০মি.সে. ডিবউন্স

    return () => clearTimeout(delayDebounce);
  }, [fetchCustomers]);

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    const modal = document.getElementById("edit_customer_modal");
    if (modal) {
      modal.showModal();
    }
  };

  const handleSaveUpdate = async (updatedData) => {
    const modal = document.getElementById("edit_customer_modal");
    try {
      const response = await axiosInstance.patch(
        `/update_customer/${selectedCustomer._id}`,
        updatedData,
      );
      if (response.status === 200) {
        await Swal.fire({
          title: "সফল!",
          text: "তথ্য আপডেট করা হয়েছে।",
          icon: "success",
          target: modal,
        });
        fetchCustomers();
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

  const handleDelete = async (id) => {
    Swal.fire({
      title: "নিশ্চিত?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ডিলিট",
      customClass: { container: "z-[999999]" },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/delete_customer/${id}`);
          fetchCustomers();
          Swal.fire({
            title: "ডিলিট হয়েছে!",
            icon: "success",
            customClass: { container: "z-[999999]" },
          });
        } catch (e) {
          console.error(e);
        }
      }
    });
  };

  return (
    <FadeIn>
      <div className="p-4 md:p-8 min-h-screen">
        <style jsx global>{`
          .swal2-container {
            z-index: 999999 !important;
          }
        `}</style>

        <CustomerListBanner
          totalCustomers={totalCount} // ব্যাকেন্ড থেকে আসা মোট সংখ্যা
          filteredCount={customers.length}
        />

        <div className="sticky top-5 z-30 backdrop-blur-md">
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-8  bg-primary/30 p-5 rounded-4xl shadow-sm border border-base-300  top-0">
              <div className="flex items-center gap-4">
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
                <span className="w-1 h-9 bg-primary/50 rounded-2xl"></span>
                <div className="relative w-full md:w-96 border-2 border-primary/30 rounded-2xl">
                  <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                  <input
                    type="search"
                    placeholder="নাম, মোবাইল বা আইডি দিয়ে খুঁজুন..."
                    className="input input-bordered w-full pl-12 bg-base-200/50 border-none rounded-2xl font-medium focus:ring-2 ring-primary/20 transition-all"
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                  className="btn btn-ghost bg-base-200 hover:bg-base-300 gap-2 rounded-2xl font-bold px-6"
                >
                  <ArrowUpDown size={16} />
                  {sortOrder === "asc" ? "পুরাতন আগে" : "নতুন আগে"}
                </button>
                <Link href="/dashboard/add-customer">
                  <AnimatedButton className="btn btn-primary gap-2 rounded-2xl px-6 shadow-lg shadow-primary/20 border-none">
                    <UserPlusIcon className="w-5 h-5" /> নতুন গ্রাহক
                  </AnimatedButton>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary opacity-20" />
            <p className="mt-4 font-bold opacity-20 uppercase tracking-widest">
              ডাটা লোড হচ্ছে...
            </p>
          </div>
        ) : customers.length > 0 ? (
          viewMode === "list" ? (
            <CustomerTable
              customers={customers}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={(c) => {
                setSelectedCustomer(c);
                document.getElementById("view_customer_modal").showModal();
              }}
            />
          ) : (
            <CustomerGrid
              customers={customers}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={(c) => {
                setSelectedCustomer(c);
                document.getElementById("view_customer_modal").showModal();
              }}
            />
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-base-100 rounded-[3rem] border-2 border-dashed border-base-300">
            <p className="font-black text-xl opacity-20 uppercase tracking-widest">
              কোনো গ্রাহক পাওয়া যায়নি
            </p>
          </div>
        )}

        <Pagination
          totalItems={totalCount}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <CustomerViewModal customer={selectedCustomer} />
        <CustomerEditModal
          customer={selectedCustomer}
          onSave={handleSaveUpdate}
        />
      </div>
    </FadeIn>
  );
}
