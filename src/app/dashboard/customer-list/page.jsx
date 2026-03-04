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

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
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

        <section className="relative overflow-hidden rounded-xl bg-linear-to-br from-primary via-primary/90 to-secondary shadow-2xl">
          <div className="absolute top-[-10%] right-[-5%] w-40 h-40 bg-base-content/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-20%] left-[-5%] w-40h-40 bg-base-content/30 rounded-full blur-3xl"></div>

          <div className="relative p-4 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-3 mb-4 bg-accent/20 text-accent-content backdrop-blur-md px-6 py-2 rounded-full border border-accent">
                <Users size={18} className="text-base-100" />
                <span className="text-base-100 text-xs font-black uppercase tracking-[0.2em]">
                  গ্রাহক ব্যবস্থাপনা
                </span>
              </div>

              <RevealText className="text-2xl md:text-4xl font-black text-base-100 tracking-tighter leading-none py-3 pr-10">
                গ্রাহকের তালিকা
              </RevealText>

              <RevealText className="text-base-300/50 text-xs md:text-base-300 font-medium max-w-md">
                আপনার ব্যবসার সকল নিবন্ধিত গ্রাহকদের তথ্য এখানে দেখুন এবং
                পরিচালনা করুন।
              </RevealText>
            </div>
            {/* show total customer & filter data */}
            <FadeIn>
              <div className="hidden lg:flex items-center gap-10 border-2 bg-accent/20 border-accent p-4 rounded-2xl">
                <div className="text-center">
                  <p className="text-4xl font-black text-base-100">
                    {customers.length}
                  </p>
                  <p className="text-xs text-base-300 uppercase font-bold tracking-widest mt-1">
                    মোট গ্রাহক
                  </p>
                </div>
                <div className="h-12 w-1 bg-accent rounded-full"></div>
                <div className="text-center">
                  <p className="text-4xl font-black text-base-100">
                    {filteredData.length}
                  </p>
                  <p className="text-xs text-base-300 uppercase font-bold tracking-widest mt-1">
                    ফিল্টার্ড
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-8 bg-base-100 p-5 rounded-3xl shadow-sm border border-base-300">
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

        <FadeIn className="overflow-x-auto w-full bg-base-100 rounded-[2.5rem] shadow-xl border border-base-300 mb-6">
          <table className="table w-full border-separate border-spacing-y-2">
            <thead className="bg-base-200/50">
              <tr className="border-none">
                <th className="rounded-l-2xl">আইডি</th>
                <th>গ্রাহকের তথ্য</th>
                <th>অভিভাবক</th>
                <th>ঠিকানা ও মোবাইল</th>
                <th>এনআইডি/জন্ম তারিখ</th>
                <th className="text-center rounded-r-2xl">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.map((customer) => (
                <tr
                  key={customer._id}
                  className="hover:bg-primary/5 transition-all group"
                >
                  <td className="font-black text-primary">
                    #{customer.cust_id}
                  </td>
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="avatar shadow-md rounded-2xl overflow-hidden ring-2 ring-base-200 group-hover:ring-primary/20 transition-all">
                        <div className="h-12 w-12 bg-base-300 flex items-center justify-center">
                          {customer.image ? (
                            <Image
                              src={customer.image}
                              alt="IMG"
                              width={48}
                              height={48}
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <User2Icon className="p-3 opacity-20 text-primary" />
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-base-content group-hover:text-primary transition-colors">
                          {customer.name}
                        </div>
                        <div className="text-[10px] badge badge-ghost font-bold uppercase opacity-60">
                          {customer.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-xs">
                    <p className="font-semibold text-base-content/70">
                      পিতা: {customer.fatherName}
                    </p>
                    <p className="opacity-60">মাতা: {customer.motherName}</p>
                  </td>
                  <td>
                    <div className="text-xs font-medium truncate max-w-[150px] mb-1">
                      {customer.address}
                    </div>
                    <div className="badge badge-sm badge-secondary font-bold px-2">
                      {customer.mobile}
                    </div>
                  </td>
                  <td className="text-xs">
                    <p className="font-bold text-base-content/80">
                      {customer.dob}
                    </p>
                    <p className="font-mono opacity-50">{customer.nidNumber}</p>
                  </td>
                  <td>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedCustomer(customer);
                          document
                            .getElementById("view_customer_modal")
                            .showModal();
                        }}
                        className="btn btn-square btn-ghost btn-sm text-info hover:bg-info/10"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(customer)}
                        className="btn btn-square btn-ghost btn-sm text-warning hover:bg-warning/10"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(customer._id)}
                        className="btn btn-square btn-ghost btn-sm text-error hover:bg-error/10"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </FadeIn>

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
