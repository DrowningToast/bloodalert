import Link from "next/link";
import { FC } from "react";

const Navbar: FC = () => {
  return (
    <div className="flex justify-between w-full px-6 pt-6 gap-x-2 items-center">
      <div className="flex items-center gap-x-4">
        <div className="aspect-square rounded-full col-start-1 row-span-2 bg-white relative w-12"></div>
        <h1 className="uppercase text-[#2A3990] font-bold col-span-2 text-lg font-jost">
          Bloodalert
        </h1>
      </div>
      <div className="text-white font-kanit row-start-2 col-start-2 col-span-2 flex gap-x-3 font-light text-sm">
        <Link href="/">
          <span>หน้าแรก</span>
        </Link>
        <Link href="news">
          <span>ข่าวสาร</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
