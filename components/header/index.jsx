import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Link from "next/link";
import { ChevronLeft, Search } from "lucide-react";

const Header = ({ back, title, search, rightComponents, onClickBack, className }) => {
  const router = useRouter();
  const onBack = () => (onClickBack ? onClickBack() : router.back());

  return (
    <header
      style={{ direction: "ltr" }}
      className={`bg-root-backgroung  flex items-center justify-between p-3 text-nowrap ${className}`}
    >
      <div className="flex justify-start flex-1">
        {back ? (
          <button
            onClick={onBack}
            className="text-[#03053d] w-[24px] h-[24px] rounded-[5px] "
          >
            <ChevronLeft className="w-6" />
          </button>
        ) : null}
      </div>
      <p className="text-root-text flex-1 font-bold text-center">{title}</p>
      <div className="flex justify-end flex-1">
        {search ? (
          <Link href={"/search"}>
            <Search className="w-6 text-[#03053d]" />
          </Link>
        ) : null}
        {rightComponents}
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  back: PropTypes.bool,
  search: PropTypes.bool,
  rightComponents: PropTypes.element,
  onClickBack: PropTypes.func,
};

Header.defaultProps = {
  back: true,
  search: false,
  title: "",
};

export default Header;
