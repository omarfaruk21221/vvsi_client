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

  // প্যাগিনেশন স্টেট
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axiosInstance.get("/customers");
      setCustomers(res.data);
    } catch (error) {
      console.error("ডাটা ফেচ করতে সমস্যা হয়েছে:", error);
    }
  };

  // সার্চ এবং সর্টিং লজিক
  const filteredData = useMemo(() => {
    let result = customers.filter((customer) => {
      const search = searchText.toLowerCase();
      return (
        customer.name?.toLowerCase().includes(search) ||
        customer.mobile?.includes(search) ||
        customer.cust_id?.toString().includes(search)
      );
    });

    result.sort((a, b) => {
      const idA = parseInt(a.cust_id) || 0;
      const idB = parseInt(b.cust_id) || 0;
      return sortOrder === "asc" ? idA - idB : idB - idA;
    });

    return result;
  }, [customers, searchText, sortOrder]);

  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  // view customer deails
  const handleView = (customer) => {
    setSelectedCustomer(customer);
    document.getElementById("view_customer_modal").showModal();
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    document.getElementById("edit_customer_modal").showModal();
  };

  const handleDelete = async (id) => {
    console.log(id);

    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এটি ডিলিট করলে আর ফিরে পাওয়া যাবে না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "হ্যাঁ, ডিলিট করুন!",
      cancelButtonText: "বাতিল",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/delete_customer/${id}`);
          Swal.fire(
            "ডিলিট হয়েছে!",
            "গ্রাহকের তথ্য মুছে ফেলা হয়েছে।",
            "success",
          );
          fetchCustomers();
        } catch (error) {
          Swal.fire("ব্যর্থ!", "মুছতে সমস্যা হয়েছে।", "error");
        }
      }
    });
  };

  return (
    <div className="p-4 md:p-10 bg-base-200 min-h-screen">
      <RevealText className="text-xl md:text-3xl lg:text-4xl font-bold text-center text-primary py-5 tracking-wide">
        আমাদের কাস্টোমারের তালিকা
      </RevealText>

      <FadeIn>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-base-100 p-5 rounded-[1.5rem] shadow-sm border border-base-300">
          <div className="relative w-full md:w-96">
            <SearchIcon className="absolute left-3 top-3.5 h-4 w-4 text-primary" />
            <input
              type="search"
              placeholder="নাম, মোবাইল বা আইডি দিয়ে খুঁজুন..."
              className="input input-bordered w-full pl-10 bg-base-200 focus:border-primary rounded-xl font-medium"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="btn btn-outline gap-2 rounded-xl border-base-300 hover:bg-primary"
            >
              <ArrowUpDown size={16} />
              {sortOrder === "asc" ? "পুরাতন আগে" : "নতুন আগে"}
            </button>

            <Link href="/dashboard/add-customer">
              <AnimatedButton className="btn btn-accent gap-2 rounded-xl shadow-lg shadow-accent/20">
                <UserPlusIcon className="w-5 h-5" /> নতুন গ্রাহক যোগ করুন
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </FadeIn>

      <div className="overflow-x-auto w-full bg-base-100 rounded-[2rem] shadow-xl border border-base-300">
        <table className="table w-full">
          <thead className="bg-base-200/50">
            <tr className="text-sm text-base-content/70 border-b-base-300">
              <th>আইডি</th>
              <th>গ্রাহকের তথ্য</th>
              <th>অভিভাবক</th>
              <th>ঠিকানা ও মোবাইল</th>
              <th>এনআইডি/জন্ম তারিখ</th>
              <th className="text-center">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-200">
            {paginatedCustomers.map((customer) => (
              <tr
                key={customer._id}
                className="hover:bg-base-200/30 transition-colors"
              >
                <td className="font-black text-primary">#{customer.cust_id}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar mask mask-squircle h-12 w-12 bg-base-300">
                      {customer.image ? (
                        <Image
                          src={customer.image}
                          alt="গ্রাহক"
                          width={48}
                          height={48}
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <User2Icon className="p-3 opacity-20" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold">{customer.name}</div>
                      <div className="text-[10px] badge badge-outline opacity-70 font-bold uppercase">
                        {customer.category}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-xs">
                  <p className="opacity-80">পিতা: {customer.fatherName}</p>
                  <p className="opacity-80">মাতা: {customer.motherName}</p>
                </td>
                <td>
                  <div className="text-xs max-w-[150px] truncate">
                    {customer.address}
                  </div>
                  <div className="text-xs font-bold text-secondary mt-1">
                    {customer.mobile}
                  </div>
                </td>
                <td className="text-xs">
                  <p>{customer.dob}</p>
                  <p className="font-mono opacity-60">{customer.nidNumber}</p>
                </td>
                <td>
                  <div className="flex justify-center gap-1">
                    <button
                      onClick={() => handleView(customer)}
                      className="btn btn-square btn-ghost btn-xs text-info tooltip"
                      data-tip="দেখুন"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleEdit(customer)}
                      className="btn btn-square btn-ghost btn-xs text-warning tooltip"
                      data-tip="সম্পাদন"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(customer._id)}
                      className="btn btn-square btn-ghost btn-xs text-error tooltip"
                      data-tip="মুছুন"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div className="p-20 text-center opacity-30 font-bold text-xl">
            কোনো তথ্য খুঁজে পাওয়া যায়নি
          </div>
        )}
      </div>

      <Pagination
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* মোডাল কম্পোনেন্টসমূহ */}
      <CustomerViewModal customer={selectedCustomer} />
      <CustomerEditModal
        customer={selectedCustomer}
        fetchCustomers={fetchCustomers}
      />
    </div>
  );
}
