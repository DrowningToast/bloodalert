import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import MobileFrame from "../components/MobileFrame";
import Navbar from "../components/Navbar";

const LinePage: NextPage = () => {
  const router = useRouter();

  console.log(router.query.district);

  return (
    <MobileFrame>
      <div className="">
        <Navbar />
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col w-full h-full gap-y-4 text-center">
          <h1 className="text-2xl text-[#49C628] font-kanit font-bold">
            COPY ข้อความ
          </h1>
          <h2 className="font-kanit font-bold">
            แล้ว Add friend ส่งมาใน Botline นะ!
          </h2>
        </div>
        <div></div>
      </div>
    </MobileFrame>
  );
};

export default LinePage;
