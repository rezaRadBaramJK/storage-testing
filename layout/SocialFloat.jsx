import React from 'react';
import Link from "next/link";
import Image from "next/image";

const SocialFloat = () => {
  return (
    <div className="fixed lg:end-10 lg:bottom-10 sm:end-8 bottom-20 end-5 flex flex-col items-center h-auto z-[80] rounded-full bg-transparent p-0">
      <Link
        href={'https://wa.me/96565841184'}
        className="lg:w-[70px] lg:h-[70px] w-[50px] h-[50px] relative bg-transparent"
      >
        <Image src={'/assets/icons/whatsapp.svg'} alt={''} fill className="object-cover bg-transparent"/>
      </Link>
    </div>
  );
};

export default SocialFloat;