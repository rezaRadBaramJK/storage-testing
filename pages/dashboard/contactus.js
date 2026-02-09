import MainLayout from "@/layout/MainLayout";
import React from "react";
import ContactUsForm from "../../components/Forms/ContactUsForm";
import Header from "../../components/header";

export default function Contactus() {
  return (
    <MainLayout>
      <Header title={"Send Email"} />
      <div className="p-2">
        <ContactUsForm />
      </div>
    </MainLayout>
  );
}
