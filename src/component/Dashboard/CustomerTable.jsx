import React from "react";
import Image from "next/image";
import { Eye, Edit, Trash2, User2Icon } from "lucide-react";
import { FadeIn } from "../Animations/FadeIn";

export default function CustomerTable({ customers, onEdit, onDelete, onView }) {
  return (
    <FadeIn className="overflow-x-auto w-full bg-base-100 shadow-xl border border-base-100 rounded-3xl">
      <table className="table w-full rounded-xl shadow-md shadow-primary overflow-hidden">
        <thead className="bg-primary/50 rounded-xl">
          <tr className="border-b-2 border-secondary/50 text-primary">
            <th>আইডি</th>
            <th>গ্রাহকের তথ্য</th>
            <th>অভিভাবক</th>
            <th>ঠিকানা ও মোবাইল</th>
            <th>এনআইডি/জন্ম তারিখ</th>
            <th className="text-center">অ্যাকশন</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer._id}
              className="hover:bg-primary/15 transition-all duration-500 ease-linear group hover:shadow-inner hover:translate-x-1 border-b-2 border-primary/15"
            >
              {/* ১. কাস্টমার আইডি */}
              <td className="font-black text-primary">#{customer.cust_id}</td>

              {/* ২. গ্রাহকের নাম, ছবি এবং রোল (Role) */}
              <td>
                <div className="flex items-center gap-4">
                  <div className="avatar shadow-md rounded-2xl overflow-hidden ring-2 ring-base-200 group-hover:ring-primary/20 transition-all">
                    <div className="h-12 w-12 bg-base-300 flex items-center justify-center">
                      {/* মডেল অনুযায়ী image এখন details এর ভেতরে */}
                      {customer.details?.image ? (
                        <Image
                          src={customer.details.image}
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
                    {/* মডেল অনুযায়ী category এর বদলে role ব্যবহার করা হয়েছে */}
                    <div
                      className={`text-[10px] badge font-bold uppercase ${
                        customer.role === "হকার"
                          ? "badge-accent"
                          : customer.role === "সেলসম্যান"
                            ? "badge-info"
                            : "badge-ghost"
                      }`}
                    >
                      {customer.role || "সাধারণ"}
                    </div>
                  </div>
                </div>
              </td>

              {/* ৩. অভিভাবকের তথ্য (details অবজেক্ট থেকে) */}
              <td className="text-xs">
                <p className="font-semibold text-base-content/70">
                  পিতা: {customer.details?.fatherName || "N/A"}
                </p>
                <p className="opacity-60">
                  মাতা: {customer.details?.motherName || "N/A"}
                </p>
              </td>

              {/* ৪. ঠিকানা ও মোবাইল */}
              <td>
                <div className="text-xs font-medium truncate max-w-40 mb-1">
                  {customer.details?.address || "ঠিকানা নেই"}
                </div>
                <div className="badge badge-sm badge-secondary font-bold px-2">
                  {customer.mobile}
                </div>
              </td>

              {/* ৫. এনআইডি এবং জন্ম তারিখ (details অবজেক্ট থেকে) */}
              <td className="text-xs">
                <p className="font-bold text-base-content/80">
                  {customer.details?.dob || "তারিখ নেই"}
                </p>
                <p className="font-mono opacity-50">
                  {customer.details?.nidNumber || "NID নেই"}
                </p>
              </td>

              {/* ৬. অ্যাকশন বাটনসমূহ */}
              <td>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onView(customer)}
                    className="btn btn-square btn-ghost btn-sm text-info hover:bg-info/10"
                    title="দেখুন"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => onEdit(customer)}
                    className="btn btn-square btn-ghost btn-sm text-warning hover:bg-warning/10"
                    title="এডিট"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(customer._id)}
                    className="btn btn-square btn-ghost btn-sm text-error hover:bg-error/10"
                    title="ডিলিট"
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
  );
}
