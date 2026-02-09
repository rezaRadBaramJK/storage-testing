import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronRight } from "lucide-react";

const MenuSection = ({ item }) => {
  const { links, name } = item ?? {};

  return (
    <section className="border-b-[1px] border-primary/20">
      {links?.map((linkItem, index) => (
        <Item key={index} item={linkItem} />
      ))}
    </section>
  );
};

const Item = ({ item }) => {
  const { locale } = useRouter();
  const { icon, link, name, action } = item ?? {};
  return (
    <div
      onClick={() => action?.()}
      className="flex items-center text-primary relative cursor-pointer"
    >
      {icon}
      <div className={`flex justify-between items-center w-full  py-6 px-3 `}>
        <p className="text-black ">{name}</p>
        {name !== "Language" ? (
          <ChevronRight
            className={` ${
              locale === "en" ? "" : "rotate-180"
            } w-6 transition-transform duration-200 text-primary`}
          />
        ) : (
          <p className="text-primary font-bold">
            {locale === "en" ? "عربي" : "English"}
          </p>
        )}
      </div>
      {link && <Link href={link} className="w-full h-full absolute" />}
    </div>
  );
};

export default MenuSection;
