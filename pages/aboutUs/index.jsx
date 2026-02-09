import React from "react";
import { useTranslations } from "next-intl";
import MainLayout from "@/layout/MainLayout";
import Header from "@/components/header";

const Index = ({ data }) => {
  const t = useTranslations("index");

  return (
    <MainLayout>
      <Header title={t("aboutUs")} />
      <div className="min-h-[80vh] w-full flex flex-col items-center p-2 overflow-auto pt-14">
        <div className="w-full max-w-[1024px] flex flex-col gap-3 m-auto">
          {data?.map((item, index) => (
            <div key={index} className="flex flex-col">
              <p className="text-xl font-bold">{item?.title}</p>
              <p dangerouslySetInnerHTML={{ __html: item?.description }} />
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;

export async function getServerSideProps({ locale }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/aboutus/list`);
  const data = await response.json();

  return {
    props: {
      messages: (await import(`../../Internationaliz/${locale}.json`)).default,
      data: data?.IsSuccess ? data?.Data || [] : []
    }
  };
}
