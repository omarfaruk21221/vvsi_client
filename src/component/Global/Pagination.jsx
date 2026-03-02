"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null; // ১ পেজ হলে প্যাগিনেশন দেখাবে না

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 p-4 bg-base-100 rounded-2xl border border-base-300 shadow-sm">
      <div className="text-sm font-medium opacity-70">
        মোট <span className="text-primary font-bold">{totalItems}</span> জনের
        মধ্যে
        <span className="mx-1">
          {(currentPage - 1) * itemsPerPage + 1} -{" "}
          {Math.min(currentPage * itemsPerPage, totalItems)}
        </span>{" "}
        দেখানো হচ্ছে
      </div>

      <div className="join border border-base-300 shadow-sm">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="join-item btn btn-sm bg-base-100 hover:bg-base-200 disabled:bg-base-200"
        >
          <ChevronLeft size={18} />
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          // যদি পেজ সংখ্যা অনেক বেশি হয় তবে মাঝখানের পেজগুলো হাইড করার লজিক এখানে যুক্ত করা যায়
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`join-item btn btn-sm ${
                currentPage === pageNum
                  ? "btn-primary text-primary-content"
                  : "bg-base-100"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="join-item btn btn-sm bg-base-100 hover:bg-base-200 disabled:bg-base-200"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
