import MainLayout from "@/layout/MainLayout";
import React from "react";
import LoginWithEmailForm from "@/components/Forms/LoginWithEmailForm";
import Link from "next/link";
import { useRouter } from "next/router";
import { BaramjikLogo } from "@/public/assets/jsxIcons";
import Header from "@/components/header";
import { useTranslations } from "next-intl";
import LgHeader from "@/components/header/lg-header";
import Image from "next/image";

export default function Index() {
  const router = useRouter();
  const t = useTranslations("index");
  return (
    <MainLayout>
      <div className="min-h-screen">
        <div className="lg:hidden">
          <Header title={t("login")} />
        </div>
        <div className="hidden lg:flex ">
          <LgHeader />
        </div>
        <div className="flex justify-center flex-col lg:max-w-[500px] lg:mx-auto items-center   p-4">
          <Image src={'/assets/icons/baramjikLogo.svg'} alt={''} width={160} height={200} />
          <p className="my-5 mt-10 font-medium text-[#A7A7A7] w-full text-start text-[20px]">
            {t("thanks_for_being")}
            <br className="lg:hidden" /> {t("with_us")}
          </p>
          <LoginWithEmailForm />
          <div className="text-center">
            <p className="mt-5 font-medium text-[#A7A7A7]">
              {t("you_dont_have_account")}
              {"     "}
              <Link href={"/auth/signup"} className="font-bold text-black">
                {t("sign_up")}
              </Link>
            </p>
          </div>
          {router?.query.fromCheckout && (
            <Link
              className="text-primary font-medium mt-5"
              href={"/checkout/addresses"}
            >
              {t("continue_as_guest")}
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
