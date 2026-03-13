import React from "react";
import Image from "next/image";
import {
  CheckCircle2,
  XCircle,
  Fingerprint,
  Calendar,
  MapPin,
} from "lucide-react";
import { FadeIn } from "@/component/Animations/FadeIn";

export default function WorkerApplicationTable({ workers, onStatusUpdate }) {
  return (
    <FadeIn className="overflow-x-auto bg-base-100 rounded-[2.5rem] border border-base-300 shadow-sm">
      <table className="table w-full rounded-xl shadow-md shadow-primary overflow-hidden">
        <thead className="bg-primary/50 rounded-xl">
          <tr className="border-b-2 border-secondary/50 text-primary">
            <th className="text-center">আইডি</th>
            <th className="text-center">আবেদনকারী</th>
            <th>অভিভাবক</th>
            <th>এনআইডি ও জন্ম</th>
            <th>ঠিকানা</th>
            <th>অবস্থান</th>
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
                    <div className="w-12 h-12 rounded-2xl ring-2 ring-accent/60 group-hover:ring-primary/30 transition-all overflow-hidden">
                      <Image
                        width={100}
                        height={100}
                        alt={worker.name}
                        src={worker?.image || "/avatar.png"}
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-base leading-none text-base-content group-hover:text-primary transition-colors">
                      {worker.name}
                    </p>
                    <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest mt-1 block">
                      {worker?.role || "কর্মচারী"}
                    </span>
                  </div>
                </div>
              </td>
              <td className="p-5">
                <div className="text-xs space-y-1">
                  <p>
                    <span className="opacity-50 font-bold uppercase mr-1">
                      পিতা:
                    </span>{" "}
                    {worker.details?.fatherName || "N/A"}
                  </p>
                  <p>
                    <span className="opacity-50 font-bold uppercase mr-1">
                      মাতা:
                    </span>{" "}
                    {worker.details?.motherName || "N/A"}
                  </p>
                </div>
              </td>
              <td className="p-5">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-primary font-mono font-bold text-xs">
                    <Fingerprint size={14} strokeWidth={2.5} />
                    {worker.details?.nidNumber || "N/A"}
                  </div>
                  <div className="flex items-center gap-2 opacity-60 text-[10px]">
                    <Calendar size={12} />
                    {worker.details?.dob || "N/A"}
                  </div>
                </div>
              </td>
              <td className="p-5">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-start gap-1 text-xs opacity-70">
                    <MapPin size={14} className="text-secondary shrink-0" />
                    <span className="truncate max-w-[150px]">
                      {worker.details?.address || "N/A"}
                    </span>
                  </div>
                  <p className="text-xs font-black text-secondary ml-4">
                    {worker.mobile}
                  </p>
                </div>
              </td>
              <td className="p-5">
                <span className="badge badge-warning badge-sm font-bold py-3 px-4 rounded-xl text-[10px] uppercase tracking-wider">
                  প্রসেসিং
                </span>
              </td>
              <td className="p-5">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onStatusUpdate(worker._id, "active")}
                    className="btn btn-sm btn-success rounded-xl text-white font-bold shadow-sm hover:scale-105"
                  >
                    <CheckCircle2 size={16} /> গ্রহণ
                  </button>
                  <button
                    onClick={() => onStatusUpdate(worker._id, "rejected")}
                    className="btn btn-sm btn-ghost hover:bg-error/10 text-error rounded-xl font-bold"
                  >
                    <XCircle size={16} /> বাতিল
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
