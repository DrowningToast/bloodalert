import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import Logo from "./Logo";

const Navbar: FC = () => {
  const router = useRouter();

  return (
    <div className="flex justify-between w-full px-4 pt-4 gap-x-2 items-center">
      <div className="flex items-center gap-x-4">
        <div className="aspect-square rounded-full col-start-1 row-span-2 relative w-12 h-12">
          <Logo width={24.1} />
        </div>
      </div>
      <div className="text-[#000259] font-kanit row-start-2 col-start-2 col-span-2 flex gap-x-4 font-light text-xs">
        <Link href="/">
          <span className={`${router.pathname === "/" ? "underline" : ""}`}>
            หน้าแรก
          </span>
        </Link>
        <Link href="news">
          <span className={`${router.pathname === "/news" ? "underline" : ""}`}>
            ข่าวสาร
          </span>
        </Link>
        <Link href="announcement">
          <span
            className={`${
              router.pathname === "/announcement" ? "underline" : ""
            }`}
          >
            ประกาศ
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
