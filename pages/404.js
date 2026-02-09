import MainLayout from "@/layout/MainLayout";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import LgHeader from "@/components/header/lg-header";
import { useTranslations } from "next-intl";
import ClientSide from "../components/ClientSide";

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../Internationaliz/${locale}.json`)).default,
    },
  };
}

export default function NotFound() {
  const t = useTranslations("index");

  return (
    <ClientSide>
      <MainLayout>
        <div className="hidden lg:flex ">
          <LgHeader />
        </div>
        <div className="min-h-screen flex justify-center items-center">
          <div className="flex flex-col gap-5">
            <Image
              alt="not found"
              width={200}
              height={200}
              src={"/assets/staticImages/404.svg"}
            />
            <p className="font-bold text-[22px] text-center">
              {t("error-oh-snap")}
            </p>
            <p className="font-medium text-center">
              {t("error-page-not-found")}
            </p>
            <Link
              className="py-3 px-10 bg-primary text-white rounded-full text-center"
              href={"/"}
            >
              {t("button-go-home-page")}
            </Link>
          </div>
        </div>
      </MainLayout>
    </ClientSide>
  );
}
