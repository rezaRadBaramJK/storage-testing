import MainLayout from "@/layout/MainLayout";
import RegisterWithOtpForm from "@/components/Forms/RegisterWithOtpForm";
import ValidateOtpForRegister from "@/components/Forms/ValidateOtpForRegister";
import Header from "@/components/header";
import { BaramjikLogo } from "@/public/assets/jsxIcons";
import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";
import LgHeader from "@/components/header/lg-header";
export default function ValidateOtp() {
  const t = useTranslations("index");
  return (
    <MainLayout>
      <div className="min-h-screen">
        <div className="lg:hidden">
          <Header title={t("forget_password_main")} />
        </div>
        <div className="hidden lg:flex ">
          <LgHeader />
        </div>
        <div className="flex justify-center flex-col lg:max-w-[500px] lg:mx-auto items-center   p-4">
          <Image src={'/assets/icons/baramjikLogo.svg'} alt={''} width={160} height={200} />

          <ValidateOtpForRegister fromForgot={true} />
        </div>
      </div>
    </MainLayout>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../../../Internationaliz/${locale}.json`))
        .default,
    },
  };
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
