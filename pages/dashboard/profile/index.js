import MainLayout from "@/layout/MainLayout";
import ProfileDetailsForm from "@/components/Forms/ProfileDetailsForm";
import React, { useState, useEffect } from "react";
import CustomBottomDoc from "@/components/BottomDoc";
import { getUserInfo } from "@/services/http/user/getUserInfo";
import { useTranslations } from "next-intl";
import Header from "@/components/header";
import LgHeader from "@/components/header/lg-header";
export default function index() {
  const t = useTranslations("index");
  const [userData, setuserData] = useState({});
  useEffect(() => {
    const userInfo = async () => {
      const response = await getUserInfo();
      if (response?.success) {
        setuserData(response?.data);
      }
    };
    userInfo();
  }, []);
  return (
    <MainLayout>
      <div className="lg:hidden">
        <Header title={t("my_account")} />
      </div>
      <div className="hidden lg:flex ">
        <LgHeader />
      </div>

      <ProfileDetailsForm data={userData} />
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
