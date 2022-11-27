import React from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

export const ProfileData = [
  {
    title: "ข้อมูลส่วนตัว",
    path: "/reports/reports1",
    icon: <FaIcons.FaUserAlt />,
    id: 'btnProfile',
  },
  {
    title: "ออกจากระบบ",
    path: "/reports/reports2",
    icon: <MdIcons.MdLogout />,
    id: 'btnLogout',
  },
];
