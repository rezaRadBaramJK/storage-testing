import MainLayout from "@/layout/MainLayout";
import RegisterWithOtpForm from "@/components/Forms/RegisterWithOtpForm";
import ValidateOtpForRegister from "@/components/Forms/ValidateOtpForRegister";
import Header from "@/components/header";
import { BaramjikLogo } from "@/public/assets/jsxIcons";
import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";
export default function ValidateOtp() {
  const t = useTranslations("index");
  return (
    <MainLayout>
      <div className="min-h-screen">
        <Header title={t("sign_up")} />
        <div className="flex justify-center flex-col  items-center   p-4">
          <Image src={'/assets/icons/baramjikLogo.svg'} alt={''} width={160} height={200} />

          <ValidateOtpForRegister />
          <div className="text-center">
            <p className="mt-5 font-medium text-[#A7A7A7]">
              {t("already_have_account_message")}
              <Link href={"/auth/login"} className=" text-black font-bold">
                {t("login")}
              </Link>
            </p>
          </div>
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
