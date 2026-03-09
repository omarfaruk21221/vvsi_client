"use client";
import Link from "next/link";
import React from "react";
import { CgProfile } from "react-icons/cg";
import {
  LayoutDashboard,
  BadgeDollarSign,
  WalletCards,
  ReceiptText,
  UserPlus,
  Users,
  Undo2,
  ShieldUser,
  ContactRound,
} from "lucide-react";
import NavLink from "../Global/NavLink";

export default function DashLinks() {
  const menuItems = [
    {
      name: "বেক",
      icon: <Undo2 size={20} />,
      link: "/",
    },
    {
      name: "হোম পেজ",
      icon: <LayoutDashboard size={20} />,
      link: "/dashboard",
    },
    {
      name: "প্রোফাইল",
      icon: <CgProfile />,
      link: "/dashboard/profile",
    },
    {
      name: "দৈনিক বিক্রয়",
      icon: <BadgeDollarSign size={20} />,
      link: "/dashboard/sales",
    },
    {
      name: "দৈনিক খরচ",
      icon: <WalletCards size={20} />,
      link: "/dashboard/expenses",
    },
    {
      name: "বাকি হিসাব",
      icon: <ReceiptText size={20} />,
      link: "/dashboard/due-records",
    },
    {
      name: "কর্মচারীদের আবেদন ",
      icon: <ShieldUser size={20} />,
      link: "/dashboard/worker-application",
    },
    {
      name: " কর্মচারীদের তালিকা",
      icon: <ContactRound size={20} />,
      link: "/dashboard/worker-list",
    },
    {
      name: "কাস্টমার যুক্ত করুন",
      icon: <UserPlus size={20} />,
      link: "/dashboard/add-customer",
    },
    {
      name: "কাস্টমার তালিকা",
      icon: <Users size={20} />,
      link: "/dashboard/customer-list",
    },
  ];
  return (
    <ul className="menu w-full grow text-lg space-y-2 ">
      {menuItems.map((item, i) => (
        <li key={i} className="list-none" data-tip={item.name}>
          <NavLink href={item.link}>
            {item.icon}
            <span className="is-drawer-close:hidden">{item.name}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
