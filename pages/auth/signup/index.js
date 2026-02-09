import MainLayout from "@/layout/MainLayout";
import React from "react";
import LoginWithEmailForm from "@/components/Forms/LoginWithEmailForm";
import Link from "next/link";
import { useRouter } from "next/router";
import { BaramjikLogo } from "@/public/assets/jsxIcons";
import Header from "@/components/header";
import RegisterWithOtpForm from "@/components/Forms/RegisterWithOtpForm";
import { useTranslations } from "next-intl";
import SignUpForm from "@/components/Forms/SignUpForm";
import LgHeader from "@/components/header/lg-header";
import Image from "next/image";
export default function Index() {
  const router = useRouter();
  const t = useTranslations("index");
  return (
    <MainLayout>
      <div className="min-h-screen ">
        <div className="lg:hidden">
          <Header title={t("sign_up")} />
        </div>
        <div className="hidden lg:flex ">
          <LgHeader />
        </div>
        <div className="flex justify-center lg:max-w-[500px] lg:mx-auto flex-col h-full items-center  p-4">
          <Image src={'/assets/icons/baramjikLogo.svg'} alt={''} width={160} height={200} />
          {/* 
          <RegisterWithOtpForm /> */}
          <SignUpForm />
          <div className="text-center">
            <p className="mt-5 font-medium text-[#A7A7A7]">
              {t("already_have_account_message")}
              <Link href={"/auth/login"} className=" text-black font-bold">
                {t("login")}
              </Link>
            </p>
          </div>
          {router?.query.fromCheckout && (
            <Link
              className="text-primary font-medium mt-5"
              href={"/checkout/addresses"}
            >
              {t("link-continue-as-guest")}
            </Link>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../../Internationaliz/${locale}.json`))
        .default,
    },
  };
}
