import Header from "@/components/organisms/header";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen relative">
      <Header />
      <main className="w-full h-full relative">{children}</main>
    </div>
  );
}
