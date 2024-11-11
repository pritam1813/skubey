"use client";

import {
  Component,
  Home,
  Package,
  Settings,
  ChevronDown,
  User2,
  ChevronUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { createClient } from "@/app/utils/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

// Modified menu items with submenu support
const items = [
  {
    title: "Home",
    url: "/",
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
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();

    router.push("/");
  };
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user ? user.email : "User"}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <Link href="/">Main Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/user">Profile</Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <span onClick={handleSignOut}>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
