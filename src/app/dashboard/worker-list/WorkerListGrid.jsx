import React from "react";
import Image from "next/image";
import { FadeIn } from "@/component/Animations/FadeIn";
import { Delete, Edit, View } from "lucide-react";

export default function WorkerListGrid({ workers, onDelete, onView, onEdit }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {workers.map((worker) => (
        <FadeIn key={worker._id}>
          <div className="bg-primary/15 rounded-4xl p-6 border border-base-300  hover:shadow-2xl hover:border-primary/30 shadow-md shadow-primary transition-all group relative overflow-hidden space-y-4">
            <section className="flex items-center gap-4 justify-start">
              <aside className="relative inline-block">
                <Image
                  width={80}
                  height={80}
                  src={worker.image || "/avatar.png"}
                  className="w-28 h-28 rounded-[3rem] object-cover ring-4 ring-primary/5 transition-transform group-hover:scale-105"
                  alt={worker.name}
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-secondary text-secondary-content text-xs font-bold px-3 py-1 rounded-full shadow-lg whitespace-nowrap uppercase tracking-widest">
                  {worker?.role}
                </div>
              </aside>
              <aside>
                <h3 className="font-black text-xl italic uppercase tracking-tighter text-base-content truncate">
                  {worker?.name || "নাম"}
                </h3>
                <p className="text-xs font-bold text-primary">
                  {worker.mobile}
                </p>
                <p className="text-xs text-accent">
                  {worker.details?.nidNumber}
                </p>
              </aside>
            </section>
            <section className="bg-secondary/10 rounded-2xl p-4 text-left text-[11px] space-y-2">
              <p className="truncate">
                <strong>পিতা:</strong> {worker.details?.fatherName}
              </p>
              <p className="truncate">
                <strong>ঠিকানা:</strong> {worker.details?.address}
              </p>
            </section>
            <div className="flex gap-2 w-full  bg-primary p-2 rounded-4xl  border-base-200">
              <button
                onClick={() => onView(worker)}
                className="btn btn-sm btn-ghost flex-1 text-info font-bold bg-info/5 rounded-xl"
              >
                <View size={16} /> ভিউ
              </button>
              <button
                onClick={() => onEdit(worker)}
                className="btn btn-sm btn-ghost flex-1 text-warning font-bold bg-warning/5 rounded-xl"
              >
                <Edit size={16} />
                এডিট
              </button>
              <button
                onClick={() => onDelete(worker._id)}
                className="btn btn-sm btn-ghost flex-1 text-error font-bold bg-error/5 rounded-xl"
              >
                <Delete size={16} /> ডিলিট
              </button>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
