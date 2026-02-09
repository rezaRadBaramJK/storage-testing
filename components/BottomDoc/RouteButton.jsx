import { cloneElement, Suspense } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const RouteButton = ({ item }) => {
  const router = useRouter();
  const { href, icon, match, activeIcon, title } = item ?? {};
  const isActive = match ? match.test(router?.asPath) : router?.asPath === href;

  return (
    <Suspense fallback={null}>
      <Link
        className="w-[25%] flex justify-center items-center text-gray-text data-[state=true]:text-primary"
        data-state={isActive}
        href={href}
      >
        <div className="flex flex-col justify-center items-center gap-1">
          {isActive ? activeIcon : icon}
          <p className="min-[405px]:text-[12px] text-[10px] text-no">{title}</p>
        </div>
      </Link>
    </Suspense>
  );
};

export default RouteButton;
