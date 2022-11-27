import React from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";
import * as TbIcons from "react-icons/tb";

export const SidebarData = [
  {
    title: "ชำระค่าธรรมเนียมขยะ",
    path: "/reports",
    icon: <RiIcons.RiDeleteBin6Line />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "รอตรวจสอบยอดชำระ",
        path: "/reports/reports1",
        icon: <MdIcons.MdPendingActions />,
        cName: "sub-nav",
      },
      {
        title: "ค้นหาลูกหนี้",
        path: "/reports/reports2",
        icon: <MdIcons.MdPersonSearch />,
        cName: "sub-nav",
      },
      {
        title: "เพิ่มข้อมูลลูกหนี้",
        path: "/reports/reports3",
        icon: <IoIcons.IoMdPersonAdd />,
      },

      //เห็นเฉพาะUser เท่านั้น - Employee และ admin ไม่เห็นเมนูนี้
      {
        title: "ที่อยู่ชำระค่าธรรมเนียม",
        path: "/reports/reports3",
        icon: <FaIcons.FaHouseUser />,
      },
      {
        title: "รายการที่ต้องชำระ",
        path: "/reports/reports3",
        icon: <FaIcons.FaMoneyBillAlt />,
      },
      //**  */
    ],
  },
  {
    title: "สรุปรายงานลูกหนี้",
    path: "/reports",
    icon: <TbIcons.TbReport />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "สรุปรายงานลูกหนี้",
        path: "/reports/reports1",
        icon: <TbIcons.TbReportAnalytics />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "ตั้งค่าจ่ายค่าขยะ",
    path: "/reports",
    icon: <MdIcons.MdSettingsSuggest />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "ตั้งค่าจ่ายค่าขยะ",
        path: "/reports/reports1",
        icon: <FaIcons.FaCoins />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "จัดการข้อมูลผู้ใช้งาน",
    path: "/reports",
    icon: <FaIcons.FaUsersCog />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "เจ้าหน้าที่ทั้งหมด",
        path: "/reports/reports1",
        icon: <FaIcons.FaUsers />,
        cName: "sub-nav",
      },
      {
        title: "เพิ่มเจ้าหน้าที่",
        path: "/reports/reports1",
        icon: <FaIcons.FaUserPlus />,
        cName: "sub-nav",
      },
    ],
  },
];
