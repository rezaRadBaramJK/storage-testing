import { SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";

const FilterButton = ({ setShowFillterModal }) => {
  const t = useTranslations("index");
  return (
    <button
      onClick={() => setShowFillterModal(true)}
      className="flex justify-center gap-3"
    >
      <p className="font-bold">{t("filter")}</p>
      <SlidersHorizontal className="w-6 text-[#000]" />
    </button>
  );
};

export default FilterButton;
