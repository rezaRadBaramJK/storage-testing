import MainLayout from "@/layout/MainLayout";
import AddressesForGuestUser from "@/components/Forms/AddressesForGuestUser";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAddressesById } from "@/services/http/addresses/getAddressDetrails";
import Header from "@/components/header";
export default function EditGuestAddress() {
  const router = useRouter();
  const { id } = router?.query;
  const [addressData, setAddressData] = useState({});
  useEffect(() => {
    const addressData = async () => {
      const response = await getAddressesById(id);
      if (response?.success) {
        setAddressData(response?.data?.address);
      }
    };
    if (id) addressData();
  }, [id]);

  return (
    <MainLayout>
      <Header title="Edit Address To Submit Order" />
      <div className="p-2">
        <AddressesForGuestUser data={addressData} fromEdit={true} id={id} />
      </div>
    </MainLayout>
  );
}
