import React from "react";
import Image from "next/image";
import { Fingerprint, MapPin, Eye, Edit, Trash2 } from "lucide-react";
import { FadeIn } from "@/component/Animations/FadeIn";

export default function WorkerListTable({ workers, onDelete, onView, onEdit }) {
  return (
    <FadeIn className="overflow-x-auto bg-transparent rounded-4xl border border-base-300 shadow-sm">
      <table className="table w-full rounded-xl shadow-md shadow-primary overflow-hidden">
        <thead className="bg-primary/50 rounded-xl">
          <tr className="border-b-2 border-secondary/50 text-primary">
            <th className="">আইডি</th>
            <th className="">কর্মচারী</th>
            <th>এনআইডি ও মোবাইল</th>
            <th>ঠিকানা</th>
            <th>ক্যাটাগরি</th>
            <th className="text-center">অ্যাকশন</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => (
            <tr
              key={worker._id}
              className="bg-primary/5 hover:bg-primary/20 transition-all duration-500 ease-linear group hover:shadow-inner hover:translate-x-1 border-b-2 border-primary/20"
            >
              <td className="text-center text-primary font-bold">
                #{worker.user_id || "N/A"}
              </td>
              <td className="p-5">
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-14 h-14 rounded-2xl ring-2 ring-primary/10 overflow-hidden">
                      <Image
                        width={60}
                        height={60}
                        alt={worker.name}
                        src={worker.image || "/avatar.png"}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-black text-base uppercase italic tracking-tighter group-hover:text-primary transition-colors">
                      {worker.name}
                    </p>
                    <p className="text-[10px] opacity-60">
                      ID: {worker?.user_id}
                    </p>
                  </div>
                </div>
              </td>
              <td className="text-xs">
                <div className="flex items-center gap-1 font-mono font-bold text-primary mb-1">
                  <Fingerprint size={14} /> {worker.details?.nidNumber}
                </div>
                <div className="font-black text-secondary">{worker.mobile}</div>
              </td>
              <td className="text-xs max-w-50">
                <div className="flex items-start gap-1">
                  <MapPin size={14} className="text-secondary shrink-0" />
                  <span className="truncate">{worker.details?.address}</span>
                </div>
              </td>
              <td>
                <span
                  className={`badge badge-sm font-black uppercase text-[9px] tracking-widest px-3 py-2 border-none shadow-sm ${
                    worker?.role === "মালিক"
                      ? "bg-error/30 text-error"
                      : worker?.role === "সাধারণ"
                        ? "bg-info/30 text-info"
                        : worker?.role === "ম্যানেজার"
                          ? "bg-success/30 text-success"
                          : "bg-base-300 text-base-content/70"
                  }`}
                >
                  {worker?.role || "N/A"}
                </span>
              </td>
              <td className="p-5">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onView(worker)}
                    className="btn btn-sm btn-circle btn-ghost text-info hover:bg-info/10"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => onEdit(worker)}
                    className="btn btn-sm btn-circle btn-ghost text-warning hover:bg-warning/10"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(worker._id)}
                    className="btn btn-sm btn-circle btn-ghost text-error hover:bg-error/10"
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
