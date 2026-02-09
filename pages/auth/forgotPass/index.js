import MainLayout from "@/layout/MainLayout";
import React from "react";
import LoginWithEmailForm from "@/components/Forms/LoginWithEmailForm";
import Link from "next/link";
import { useRouter } from "next/router";
import { BaramjikLogo } from "@/public/assets/jsxIcons";
import Header from "@/components/header";
import RegisterWithOtpForm from "@/components/Forms/RegisterWithOtpForm";
import ForgetPassWithEmailForm from "@/components/Forms/ForgetPassWithEmailForm";
import LgHeader from "@/components/header/lg-header";
import Image from "next/image";

export default function Index() {
  const router = useRouter();

  return (
    <MainLayout>
      <div className="min-h-screen ">
        <div className="lg:hidden">
          <Header title="Forgot Password" />
        </div>
        <div className="hidden lg:flex ">
          <LgHeader />
        </div>
        <div className="flex justify-center lg:max-w-[500px] lg:mx-auto flex-col h-full items-center  p-4">
          <Image src={'/assets/icons/baramjikLogo.svg'} alt={''} width={160} height={200} />
          {/* 
          <RegisterWithOtpForm fromForgot={true} /> */}
          <ForgetPassWithEmailForm />
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
