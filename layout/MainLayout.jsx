import React from "react";
import TopHeader from "@/layout/TopHeader";
import Footer from "@/layout/Footer";
import SocialFloat from "@/layout/SocialFloat";

export default function MainLayout({ children }) {
  return (
    <div className="w-full min-h-screen relative m-auto bg-root-backgroung">
      <SocialFloat/>
      {/*<div className="hidden lg:flex justify-center sticky top-0 z-50 bg-black items-center py-4">*/}
      {/*  <p className="text-white text-nowrap">{t("header-note")}</p>*/}
      {/*</div>*/}
      <TopHeader />
      <div className="h-full max-w-[1365px] lg:m-auto">{children}</div>
      <Footer />
      {/*<div className="hidden lg:flex bg-black justify-center items-center py-4">*/}
      {/*  <p className="text-white text-nowrap">{t("footer")}</p>*/}
      {/*</div>*/}
    </div>
  );
}
