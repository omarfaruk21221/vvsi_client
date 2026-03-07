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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RevealText } from "@/component/Animations/RevealText";
import axiosInstance from "@/lib/axios";
import { FadeIn } from "@/component/Animations/FadeIn";
import { AnimatedButton } from "@/component/Animations/AnimatedBtn";
import Pagination from "@/component/Global/Pagination";
import Swal from "sweetalert2";
import CustomerViewModal from "@/component/Modals/CustomerViewModal";
import CustomerEditModal from "@/component/Modals/CustomerEditModal";
import CustomerListBanner from "@/component/Dashboard/CustomerListBanner";
import CustomerGrid from "@/component/Dashboard/CustomerGrid";
import CustomerTable from "@/component/Dashboard/CustomerTable";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchCustomers = async () => {
    try {
      const res = await axiosInstance.get("/customers");
      setCustomers(res.data);
    } catch (error) {
      console.error("ডাটা ফেচ এরর:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

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

  const filteredData = useMemo(() => {
    let result = customers.filter(
      (c) =>
        c.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        c.mobile?.includes(searchText) ||
        c.cust_id?.toString().includes(searchText),
    );
    return result.sort((a, b) =>
      sortOrder === "asc" ? a.cust_id - b.cust_id : b.cust_id - a.cust_id,
    );
  }, [customers, searchText, sortOrder]);

  const paginatedCustomers = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <FadeIn>
      <div className="p-4 md:p-8 min-h-screen">
        <style jsx global>{`
          .swal2-container {
            z-index: 999999 !important;
          }
        `}</style>
        <CustomerListBanner
          totalCustomers={customers.length}
          filteredCount={filteredData.length}
        />
        {/* ---search ,fillter and list style section ---  */}
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-8 bg-base-100 p-5 rounded-3xl shadow-sm border border-base-300">
            {/* ভিউ টগল বাটন */}
            <div className="flex items-center gap-4">
              <div className="flex bg-base-200 p-1 rounded-2xl gap-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`btn btn-sm rounded-xl border-none ${viewMode === "list" ? "btn-primary shadow-md" : "btn-ghost text-base-content/50"}`}
                >
                  <List />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`btn btn-sm rounded-xl border-none ${viewMode === "grid" ? "btn-primary shadow-md" : "btn-ghost text-base-content/50"}`}
                >
                  <Grid />
                </button>
              </div>
              {/* divider  */}
              <span className=" w-1 h-9 bg-primary/50 rounded-2xl"></span>
              {/* search section  */}
              <div className="relative w-full md:w-96 border-2 border-primary/30 rounded-2xl">
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
                className="btn btn-ghost bg-base-200 hover:bg-base-300 gap-2 rounded-2xl font-bold px-6"
              >
                <ArrowUpDown size={16} />{" "}
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
        {/* // ... রিটার্ন সেকশনের ভেতর ... */}
        {viewMode === "list" ? (
          <CustomerTable
            customers={paginatedCustomers}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={(c) => {
              setSelectedCustomer(c);
              document.getElementById("view_customer_modal").showModal();
            }}
          />
        ) : (
          <CustomerGrid
            customers={paginatedCustomers}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={(c) => {
              setSelectedCustomer(c);
              document.getElementById("view_customer_modal").showModal();
            }}
          />
        )}

        <Pagination
          totalItems={filteredData.length}
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
