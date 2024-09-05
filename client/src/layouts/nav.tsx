import React from "react";
import {
  LogOut,
  Scissors,
  Disc,
  LocateFixed,
  StickyNote,
  Stamp,
  Box,
  Flame,
  Home,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export const Nav = () => {
  const navgator = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  return (
    <nav className="flex w-full p-2 border gap-2 justify-between">
      <div className="flex gap-2">
        <img
          src="/logo.webp"
          className="w-28 pr-1 border-r-[1.5px] border-black/75"
          alt=""
        />
        <div>
          <p className="font-bold">PRODUCTION TRACKING SYSTEM</p>
          <p className="text-xs">
            บริษัท เอส เอ็น ซี ฟอร์เมอร์ จำกัด (มหาชน) สาขาระยอง
          </p>
        </div>
      </div>
      <div className="flex">
        {[
          { name: "Home", icon: <Home size={20} /> },
          { name: "Cutting", icon: <Scissors size={20} /> },
          { name: "Forming", icon: <Disc size={20} /> },
          { name: "Drilling", icon: <LocateFixed size={20} /> },
          { name: "Bending", icon: <StickyNote size={20} /> },
          { name: "Brazing", icon: <Flame size={20} /> },
          { name: "Helium Test", icon: <Stamp size={20} /> },
          { name: "Packaging", icon: <Box size={20} /> },
          { name: "ออกจากระบบ", icon: <LogOut size={20} /> },
        ].map((info, index) => (
          <div key={index} className=" text-red-600">
            <button
              className={
                "hover-underline-animation rounded-md bg-transparent text-sm font-normal text-secondary-foreground hover:text-line-green " +
                (location.pathname === `/${info.name.toLowerCase()}`
                  ? "hover-underline-animation--hover-on font-semibold text-line-green "
                  : "")
              }
              onClick={() => {
                navgator(
                  info.name === "ออกจากระบบ"
                    ? "/login"
                    : `/${info.name.toLowerCase()}`
                );
              }}
            >
              <div
                className={
                  "flex gap-2 justify-items-center p-2 " +
                  (location.pathname === `/${info.name.toLowerCase()}`
                    ? "text-red-600"
                    : "hover:text-red-600")
                }
              >
                {info.icon} <p>{info.name}</p>
              </div>
            </button>
          </div>
        ))}
      </div>
    </nav>
  );
};
