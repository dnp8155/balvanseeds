import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import FloatingMobileBar from "@/components/site/FloatingMobileBar";

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background">
      <Header />
      <main className={`flex-1 pb-14 lg:pb-0 ${isHome ? "" : "pt-24 lg:pt-28"}`}>
        <Outlet />
      </main>
      <Footer />
      <FloatingMobileBar />
    </div>
  );
}