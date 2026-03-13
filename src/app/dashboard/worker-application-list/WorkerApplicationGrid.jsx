import React from "react";
import Image from "next/image";
import { FadeIn } from "@/component/Animations/FadeIn";

export default function WorkerApplicationGrid({ workers, onStatusUpdate }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {workers.map((worker) => (
        <FadeIn key={worker._id}>
          <div className="bg-primary/15 rounded-[2.5rem] p-6 border border-base-300  hover:shadow-2xl hover:border-primary/30 shadow-md shadow-primary transition-all group relative overflow-hidden">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <Image
                  width={120}
                  height={120}
                  src={worker?.image || "/avatar.png"}
                  className="w-24 h-24 rounded-3xl object-cover ring-4 ring-base-200 group-hover:ring-primary/20 transition-all shadow-inner"
                  alt={worker.name}
                  unoptimized
                />
              </div>
              <div className="w-full">
                <h3 className="font-bold text-lg text-base-content group-hover:text-primary transition-colors truncate">
                  {worker.name}
                </h3>
                <p className="text-xs font-bold text-secondary mb-4">
                  {worker.mobile}
                </p>
                <div className="bg-secondary/10 rounded-2xl p-4 text-left text-[11px] space-y-2">
                  <p className="truncate">
                    <strong>পিতা:</strong> {worker.details?.fatherName}
                  </p>
                  <p className="truncate">
                    <strong>ঠিকানা:</strong> {worker.details?.address}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 w-full">
                <button
                  onClick={() => onStatusUpdate(worker._id, "active")}
                  className="btn btn-primary btn-sm flex-1 rounded-xl font-bold"
                >
                  এপ্রুভ
                </button>
                <button
                  onClick={() => onStatusUpdate(worker._id, "rejected")}
                  className="btn btn-ghost btn-sm flex-1 bg-error  rounded-xl font-bold"
                >
                  বাতিল
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
