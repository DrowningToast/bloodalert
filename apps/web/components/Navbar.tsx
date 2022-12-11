import Link from "next/link";
import { FC } from "react";
import Logo from "./Logo";

interface Props {}

const Navbar: FC = () => {
  return (
    <div className="flex justify-between w-full px-4 pt-4 gap-x-2 items-center">
      <div className="flex items-center gap-x-4">
        <div className="aspect-square rounded-full col-start-1 row-span-2 relative w-12 h-12">
          <Logo width={24.1} />
        </div>
      </div>
      <div className="text-[#000259] font-kanit row-start-2 col-start-2 col-span-2 flex gap-x-4 font-light text-xs">
        <Link href="/">
          <span>หน้าแรก</span>
        </Link>
        <Link href="news">
          <span>ข่าวสาร</span>
        </Link>
        <Link href="announcement">
          <span>ประกาศ</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
