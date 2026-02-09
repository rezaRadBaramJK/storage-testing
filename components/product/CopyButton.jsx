import { useRouter } from "next/router";
import {Redo} from "lucide-react";
import { toast } from "react-toastify";

const CopyButton = () => {
  const share = useRouter();
  const base = process.env.NEXT_PUBLIC_FRONT_BASE_URL;

  const links = base + share.asPath;
  const onClick = (e) => {
    navigator.clipboard.writeText(links);
    toast.success("link copy", { position: "top-center" });
  };
  return (
    <button {...{ onClick }}>
      <Redo className="text-[#03053d]" />
    </button>
  );
};

export default CopyButton;
