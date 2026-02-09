import MainLayout from "@/layout/MainLayout";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Header from "../../components/header";
import CustomBottomDoc from "../../components/BottomDoc";
import FollowUsModal from "../../components/Modal/FollowUsModal";
import ContactusModal from "../../components/Modal/ContactusModal";
import { getUserInfo } from "@/services/http/user/getUserInfo";
import LoginContext from "@/store/AuthContext";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { changeLanguage } from "@/services/http/setting/changeLanguage";
import MenuSection from "../../components/dashboard/MenuSection";
import {
  Package,
  House,
  Heart,
  Languages,
  MessageCircle,
  Users,
  Smile,
  Settings,
} from "lucide-react";
import LgHeader from "../../components/header/lg-header";

export default function Dashboard() {
  const authCtx = useContext(LoginContext);
  const router = useRouter();
  const { locale} = useRouter();
  const t = useTranslations("index");
  const [showContactModal, setShowContactModal] = useState(false);
  const [showSocialMediasModal, setShowSocialMediasModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [loadingData, setLoadingData] = useState(true);
  const handleShowContactModal = () => {
    setShowContactModal(true);
  };
  const handleShowSocialMediaModal = () => {
    setShowSocialMediasModal(true);
  };
  const handleChangeLang = async () => {
    const response = await changeLanguage(locale === "ar" ? 1 : 2);
    if (response.success) {
      await router.replace(
        {
          route: router.pathname,
          query: router.query,
        },
        router.asPath,
        { locale: locale === "ar" ? "en" : "ar" }
      );
      window.location.reload();
    }
  };
  const menuItems = [
    {
      name: "partials",
      links: [
        {
          name: t("orders"),
          link: "/dashboard/orders",
          icon: <Package className="mx-3 text-primary w-[30px]" />,
        },
        {
          name: t("addresses"),
          link: "/dashboard/addresses",
          icon: <House className="mx-3 text-primary" />,
        },
        {
          name: t("favorites"),
          link: "/dashboard/likes",
          icon: <Heart className="mx-3 text-primary" />,
        },
        {
          name: "Language",
          link: "",
          action: handleChangeLang,
          icon: <Languages className="mx-3 text-primary" />,
        },
      ],
    },
    {
      name: "contact",
      links: [
        {
          name: t("contact_us"),
          link: "",
          action: handleShowContactModal,
          icon: <MessageCircle className="mx-3 text-primary -scale-x-100" />,
        },
        {
          name: t("about_us"),
          link: "/aboutUs",
          icon: <Users className="mx-3 text-primary" />,
        },
        {
          name: t("follow_us_on"),
          link: "",
          action: handleShowSocialMediaModal,
          icon: <Smile className="mx-3 text-primary" />,
        },
      ],
    },
  ];
  const guestMenuItems = [
    {
      name: "contact",
      links: [
        {
          name: t("contact_us"),
          link: "",
          action: handleShowContactModal,
          icon: <MessageCircle className="mx-3 text-primary -scale-x-100" />,
        },
        {
          name: t("about_us"),
          link: "/aboutUs",
          icon: <Users className="mx-3 text-primary" />,
        },
        {
          name: t("follow_us_on"),
          link: "",
          action: handleShowSocialMediaModal,
          icon: <Smile className="mx-3 text-primary" />,
        },
      ],
    },
  ];
  useEffect(() => {
    const userInfo = async () => {
      const response = await getUserInfo();
      if (response?.success) {
        setUserData(response?.data);
        setLoadingData(false);
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

      {!authCtx?.isLogin ? (
        <div className="flex flex-col  text-black mt-5 bg-root-backgroung p-4 pb-[100px] min-h-screen">
          <p className="text-[30px] font-bold text-center my-10 hidden lg:block">
            {t("my_account")}
          </p>
          <div className={`bg-white rounded-[20px] min-h-[100px] p-5 flex xs:flex-row flex-col items-center justify-between gap-3 relative`}>
            <p className="">
              {t("welcomeGuest")}
            </p>
            <div
              className={`w-fit p-2 rounded-full flex items-center gap-2`}
            >
              <Link href={"/auth/signup"} className="px-5 py-2 bg-yellow-color rounded-[10px] text-center text-[20px] text-white font-medium">
                {t("sign_up")}
              </Link>
              <Link href={"/auth/login"} className="px-5 py-2 bg-primary rounded-[10px] text-center text-[20px] text-white font-medium">
                {t("login")}
              </Link>
            </div>
          </div>

          <div className="[&_section:last-child]:border-0 grid grid-cols-1 lg:grid-cols-2 lg:gap-5 xl:gap-10">
            {guestMenuItems.map((item, index) => (
              <MenuSection key={index} {...{ item }} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col  text-black mt-5 bg-root-backgroung p-4 pb-[100px] min-h-screen">
          <p className="text-[30px] font-bold text-center my-10 hidden lg:block">
            {t("my_account")}
          </p>
          <div
            className={`bg-white rounded-[20px] min-h-[100px] p-5 flex flex-col gap-3 relative ${
              loadingData ? "animate-pulse" : ""
            }`}
          >
            <p className="">
              {t("welcome")} {userData?.first_name}
            </p>
            <p className="">{userData?.username}</p>
            <div
              className={`bg-primary w-fit p-2 rounded-full absolute bottom-5  ${
                locale === "en" ? "right-5" : "left-5"
              }`}
            >
              <Link
                className="w-full h-full text-white"
                href={"/dashboard/profile"}
              >
                <Settings className="w-9 h-9" />
              </Link>
            </div>
          </div>

          <div className="[&_section:last-child]:border-0 grid grid-cols-1 lg:grid-cols-2 lg:gap-5 xl:gap-10">
            {menuItems.map((item, index) => (
              <MenuSection key={index} {...{ item }} />
            ))}
          </div>
        </div>
      )}
      <div className="lg:hidden">
        <CustomBottomDoc />
      </div>

      <FollowUsModal
        showSocialMediasModal={showSocialMediasModal}
        setShowSocialMediasModal={setShowSocialMediasModal}
      />
      <ContactusModal
        setShowContactModal={setShowContactModal}
        showContactModal={showContactModal}
      />
    </MainLayout>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../Internationaliz/${locale}.json`)).default,
    },
  };
}
