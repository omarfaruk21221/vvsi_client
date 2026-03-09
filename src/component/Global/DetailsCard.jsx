import React from "react";

export default function DetailsCard({
  tittle,
  icon,
  value,
  className = "",
  tittleClass = "",
  iconClass = "",
  ...props
}) {
  return (
    <div className=" px-3 md:px-6 py-3 bg-primary/10 rounded-4xl flex items-center gap-3 hover:bg-primary/20 transition-all group shadow-md ">
      <div
        className={`${iconClass} p-4 rounded-2xl transition-colors shadow-inner group-hover:text-base-100`}
      >
        {icon}
      </div>
      <div>
        <p
          className={`${tittleClass}text-sm text-base-container opacity-60 tracking-widest font-bold`}
        >
          {tittle}
        </p>
        <p className="text-xl font-bold text-base-content">{value}</p>
      </div>
    </div>
  );
}
