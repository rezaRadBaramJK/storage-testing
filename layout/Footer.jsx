import React, {useContext} from 'react';
import {useTranslations} from "next-intl";
import Link from "next/link";
import Image from "next/image";
import AuthContext from "@/store/AuthContext";

const Footer = () => {
	const authCtx = useContext(AuthContext);
	const t = useTranslations('index')
	const footerMenus = [
		{
			title: t('information'),
			menu: [
				{ title: t('shippingAndReturn'), href: '' },
				{ title: t('privacyNotice'), href: '' },
				{ title: t('termsAndConditions'), href: '' },
				{ title: t('aboutUs'), href: '' }
			]
		},
		{
			title: t('customerService'),
			menu: [
				{ title: t('frequentlyAskedQuestions'), href: '' },
				{ title: t('contactUs'), href: '' }
			]
		},
		{
			title: t('selectedOffers'),
			menu: [
				{ title: t('morgap'), href: '' },
				{ title: t('newProducts'), href: '' },
				{ title: t('recentlyViewed'), href: '' }
			]
		},
		{
			title: t('myAccount'),
			menu: [
				{ title: t('myAccount'), href: '/dashboard' },
				...(authCtx?.isLogin ? [{ title: t('orders'), href: '' }] : []),
				...(authCtx?.isLogin ? [{ title: t('addresses'), href: '' }] : []),
				{ title: t('applyForVendorAccount'), href: '' }
			]
		}
	];


	return (
		<footer className="w-full px-20 hidden lg:flex flex-col items-center justify-center gap-16 py-12 bg-white relative">
			<div className="w-full flex justify-center gap-16">
				{footerMenus?.map((menu, index) =>{
					return(
						<div
							key={index}
							className='flex flex-col gap-3'
						>
							<p className="text-black font-bold">{menu?.title}</p>
							<ul className="flex flex-col gap-1">
								{menu?.menu?.map((item, index) => {
									return(
										<li key={index} className="w-fit text-sm text-gray-500">
											<Link href={item?.href}>
												{item?.title}
											</Link>
										</li>
									)
								})}
							</ul>
						</div>
					)
				})}
			</div>
			<div className="flex items-center gap-1">
				<Link
					href="https://www.instagram.com/morgap.official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
					className="w-6 h-6 relative"
				>
					<Image src={'/assets/icons/instagram.svg'} alt={''} width={24} height={24}/>
				</Link>
			</div>
			<div className="h-10 absolute bottom-0 start-0 w-full bg-root-backgroung flex justify-center items-center px-20">
				<div></div>
				<p className="text-sm text-gray-500">Copyright © 2025 Morgap. All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;