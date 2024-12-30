import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { getSessionUser, verifySession } from "../lib/dal";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();
  if (!session?.isAuth) {
    redirect("/login");
  }
  const data = await getSessionUser();
  if (data?.user.profile.role !== "ADMIN") {
    redirect("/user");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="tw-w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
