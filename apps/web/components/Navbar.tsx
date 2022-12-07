import Link from "next/link";
import { FC } from "react";

const Navbar: FC = () => {
  return (
    <div className="grid grid-rows-2 grid-cols-3 w-2/3 pl-6 pt-6 gap-x-4 items-center">
      <div className="w-full aspect-square rounded-full col-start-1 row-span-2 bg-white"></div>
      <h1 className="uppercase text-[#2A3990] font-bold col-span-2 text-lg font-jost">
        Bloodalert
      </h1>
      <div className="text-white font-kanit row-start-2 col-start-2 col-span-2 flex gap-x-3 font-light">
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
