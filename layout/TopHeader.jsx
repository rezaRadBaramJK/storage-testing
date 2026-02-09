import React, {useContext, useState} from 'react';
import LoginContext from "@/store/AuthContext";
import {useTranslations} from "next-intl";
import Link from "next/link";
import LogoutModal from "@/components/Modal/LogoutModal";

const TopHeader = () => {
	const [showLogoutModal, setShowLogoutModal] = useState(false);

	const authCtx = useContext(LoginContext);
	const t = useTranslations('index');

	return (
		<>
			<div
				// className="hidden lg:flex bg-[#f3f3f3] justify-between items-center sticky top-0 z-50  py-4 px-20"
				className="hidden lg:flex bg-[#f3f3f3] justify-between items-center py-4 px-20"
			>
				{!authCtx?.isLogin ?
					<div className="flex items-center gap-1 text-gray-500">
						<Link href={"/auth/login"}>
							{t("login")}
						</Link>
						<div className="h-5 w-px bg-gray-500"/>
						<Link href={"/auth/signup"}>
							{t("signUp")}
						</Link>
					</div>
					:
					<p
						className="text-gray-500 cursor-pointer"
						onClick={() => {
							setShowLogoutModal(true)
						}}
					>
						{t("logout")}
					</p>
				}
				<p className="text-gray-500 text-nowrap">{t("header-note")}</p>
			</div>

			<LogoutModal
				showLogoutModal={showLogoutModal}
				setShowLogoutModal={setShowLogoutModal}
			/>
		</>
	);
};

export default TopHeader;