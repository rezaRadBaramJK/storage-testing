import React from "react";
import Input from "../Inputs/Input";
import TextArea from "../Inputs/TextArea";
import { useTranslations } from 'next-intl';

export default function ContactUsForm() {
  const t = useTranslations('index');

  return (
    <form className="flex flex-col gap-5 mt-4">
      <div>
        <Input placeholder={t("enter-first-name")} label={t("first-name")} />
      </div>
      <div>
        <Input placeholder={t("enter-last-name")} label={t("last-name")} />
      </div>
      <div>
        <Input placeholder={t("enter-phone-no")} label={t("phone-no")} />
      </div>
      <div>
        <Input placeholder={t("enter-email-id")} label={t("email-id")} />
      </div>
      <div>
        <TextArea row={4} placeholder={t("enter-subject")} label={t("subject")} />
      </div>
      <div>
        <TextArea row={6} placeholder={t("enter-message")} label={t("message")} />
      </div>
      <button className="bg-primary text-white rounded-full py-3 font-bold w-[40%] m-auto">
        {t('button-send-mail')}
      </button>
    </form>
  );
}
