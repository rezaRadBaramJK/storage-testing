import MainLayout from "@/layout/MainLayout";
import SignUpForm from "@/components/Forms/SignUpForm";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { BaramjikLogo } from "@/public/assets/jsxIcons";
import Header from "@/components/header";
import LgHeader from "@/components/header/lg-header";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Index() {
  const router = useRouter();
  const t = useTranslations("index");
  const handleRouterBack = () => {
    router.back();
  };
  return (
    <MainLayout>
      <div className="hidden lg:flex ">
        <LgHeader />
      </div>
      <div className="lg:hidden">
        <Header title="Sign Up" />
      </div>
      <div className="flex justify-center flex-col h-full items-center   p-4">
        <Image src={"/assets/icons/baramjikLogo.svg"} alt={""} width={120} height={80} />
        <SignUpForm />
        <div className="text-center">
          <p className="mt-5 font-medium text-[#A7A7A7]">
            {t("link-already-have-an-account")}
            <Link href={"/auth/login"} className=" text-black font-bold">
              {t("link-sign-in")}
            </Link>
          </p>
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
