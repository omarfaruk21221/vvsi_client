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
import CustomerTable from "@/app/dashboard/customer-list/CustomerTable";
import CustomerGrid from "./CustomerGrid";
import SearchBar from "@/component/Global/SearchBar";

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
          totalCustomers={totalCount}
          filteredCount={customers.length}
        />

        {/* Contral bar  */}

        <FadeIn>
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            viewMode={viewMode}
            setViewMode={setViewMode}
            addLink="/dashboard/add-customer"
            addText="নতুন গ্রাহক "
            placeholder="নাম, মোবাইল বা আইডি দিয়ে খুঁজুন..."
            onSearchChange={() => setCurrentPage(1)}
          />
        </FadeIn>

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
