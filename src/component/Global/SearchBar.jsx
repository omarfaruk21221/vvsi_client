"use client";
import React from "react";
import {
  SearchIcon,
  ArrowUpDown,
  List,
  Grid,
  PlusCircle, // আপনি চাইলে আইকনও প্রপস হিসেবে নিতে পারেন
} from "lucide-react";
import Link from "next/link";
import { AnimatedButton } from "@/component/Animations/AnimatedBtn";

const SearchBar = ({
  searchText,
  setSearchText,
  sortOrder,
  setSortOrder,
  viewMode,
  setViewMode,
  addLink,
  addText = "নতুন যোগ করুন",
  placeholder = "খুঁজুন...",
  onSearchChange,
  // নতুন কিছু ডাইনামিক প্রপস
  btnIcon: BtnIcon = PlusCircle,
  sortAscText = "পুরাতন আগে",
  sortDescText = "নতুন আগে",
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-8 bg-primary/10 p-5 rounded-[2.5rem] shadow-sm border border-primary/20 backdrop-blur-sm sticky top-5 z-40">
      <div className="flex items-center gap-4 w-full md:w-auto">
        {/* View Mode Switcher */}
        <div className="flex bg-base-300/50 p-1 rounded-2xl gap-1">
          <button
            onClick={() => setViewMode("list")}
            className={`btn btn-sm rounded-xl border-none transition-all ${
              viewMode === "list"
                ? "btn-primary shadow-md scale-105"
                : "btn-ghost text-base-content/40 hover:text-primary"
            }`}
          >
            <List size={18} />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`btn btn-sm rounded-xl border-none transition-all ${
              viewMode === "grid"
                ? "btn-primary shadow-md scale-105"
                : "btn-ghost text-base-content/40 hover:text-primary"
            }`}
          >
            <Grid size={18} />
          </button>
        </div>

        <span className="hidden md:block w-1 h-8 bg-primary/20 rounded-full"></span>

        {/* Search Input */}
        <div className="relative w-full md:w-80 group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary transition-transform group-focus-within:scale-110" />
          <input
            type="search"
            placeholder={placeholder}
            className="input input-bordered w-full pl-12 bg-base-100 border-primary/20 rounded-2xl font-medium focus:ring-4 ring-primary/10 transition-all outline-none"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              if (onSearchChange) onSearchChange();
            }}
          />
        </div>
      </div>

      <div className="flex gap-3 w-full md:w-auto">
        {/* Sort Button */}
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="btn btn-ghost bg-base-100 hover:bg-primary/5 border border-primary/10 gap-2 rounded-2xl font-bold px-6 shadow-sm flex-1 md:flex-none"
        >
          <ArrowUpDown size={16} className="text-primary" />
          <span className="text-sm">
            {sortOrder === "asc" ? sortAscText : sortDescText}
          </span>
        </button>

        {/* Add New Button */}
        {addLink && (
          <Link href={addLink} className="flex-1 md:flex-none">
            <AnimatedButton className="btn btn-primary gap-2 rounded-2xl px-6 shadow-lg shadow-primary/20 border-none w-full">
              <BtnIcon className="w-5 h-5" />
              <span>{addText}</span>
            </AnimatedButton>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
