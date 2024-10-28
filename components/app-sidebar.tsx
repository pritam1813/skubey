"use client";

import { Component, Home, Package, Settings, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

// Modified menu items with submenu support
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Products",
    url: "product",
    icon: Package,
    submenu: [
      { title: "Products List", url: "all" },
      { title: "Add Product", url: "add" },
    ],
  },
  {
    title: "Categories",
    url: "categories",
    icon: Component,
    submenu: [{ title: "Add Category", url: "add" }],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

interface MenuItemProps {
  item: {
    title: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
    submenu?: { title: string; url: string }[];
  };
}
const MenuItem = ({ item }: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubmenu = item.submenu && item.submenu.length > 0;

  return (
    <SidebarMenuItem>
      {hasSubmenu ? (
        <div className="tw-w-full">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="tw-flex tw-w-full tw-items-center tw-justify-between tw-p-2 hover:tw-bg-gray-100 tw-rounded-md"
          >
            <div className="tw-flex tw-items-center tw-gap-2">
              <item.icon className="tw-h-4 tw-w-4" />
              <span>{item.title}</span>
            </div>
            <ChevronDown
              className={`tw-h-4 tw-w-4 tw-transition-transform ${
                isOpen ? "tw-rotate-180" : ""
              }`}
            />
          </button>
          {isOpen && (
            <div className="tw-ml-6 tw-mt-1 tw-space-y-1">
              {item.submenu?.map((subItem) => (
                <SidebarMenuButton key={subItem.title} asChild>
                  <Link
                    href={`/dashboard/${item.url}/${subItem.url}`}
                    className="tw-flex tw-w-full tw-items-center tw-p-2 tw-text-sm hover:tw-bg-gray-100 tw-rounded-md"
                  >
                    {subItem.title}
                  </Link>
                </SidebarMenuButton>
              ))}
            </div>
          )}
        </div>
      ) : (
        <SidebarMenuButton asChild>
          <Link
            href={`/dashboard/${item.url}`}
            className="tw-flex tw-items-center tw-gap-2"
          >
            <item.icon className="tw-h-4 tw-w-4" />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  );
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <MenuItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
