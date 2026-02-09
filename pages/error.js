import React from "react";
import { useTranslations } from 'next-intl';
import MainLayout from "@/layout/MainLayout";

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../Internationaliz/${locale}.json`)).default,
    },
  };
}

export default function Error() {
  const t = useTranslations('index');
  
  return (
    <MainLayout>
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col gap-5">
          <p className="font-bold text-[22px] text-center">{t('generic-error')}</p>
        </div>
      </div>
    </MainLayout>
  );
}
