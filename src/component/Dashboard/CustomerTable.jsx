import React from "react";
import Image from "next/image";
import { Eye, Edit, Trash2, User2Icon } from "lucide-react";
import { FadeIn } from "../Animations/FadeIn";

export default function CustomerTable({ customers, onEdit, onDelete, onView }) {
  return (
    <FadeIn className=" overflow-x-auto w-full bg-base-100 shadow-xl border border-base-100 ">
      <table className="table w-full rounded-xl shadow-md shadow-primary overflow-hidden  ">
        <thead className="bg-primary/50 rounded-xl ">
          <tr className="border-b-2 border-secondary/50 text-primary">
            <th className="">আইডি</th>
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
              className="hover:bg-primary/15 
    transition-all 
    duration-500 
    ease-linear
    group 
    hover:shadow-inner 
    hover:translate-x-1 border-b-2 border-primary/15 "
            >
              <td className="font-black text-primary">#{customer.cust_id}</td>
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
                <div className="text-xs font-medium truncate max-w-20 mb-1">
                  {customer.address}
                </div>
                <div className="badge badge-sm badge-secondary font-bold px-2">
                  {customer.mobile}
                </div>
              </td>
              <td className="text-xs">
                <p className="font-bold text-base-content/80">{customer.dob}</p>
                <p className="font-mono opacity-50">{customer.nidNumber}</p>
              </td>
              <td>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onView(customer)}
                    className="btn btn-square btn-ghost btn-sm text-info hover:bg-info/10"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => onEdit(customer)}
                    className="btn btn-square btn-ghost btn-sm text-warning hover:bg-warning/10"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(customer._id)}
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
  );
}
