import { Button } from "@mantine/core";
import { NextPage } from "next";
import Link from "next/link";
import MobileFrame from "../components/MobileFrame";
import Navbar from "../components/Navbar";

const Index: NextPage = () => {
  return (
    <MobileFrame disableBg>
      <div className="bg-gradient-to-bl from-[#FFFFFF] to-[#75A8F8] w-full h-full">
        <div className="bg-[#B9D3FB] pb-4 drop-shadow-md relative z-10">
          <Navbar />
        </div>
        <div className="relative px-4 py-8">
          <div className="bg-white rounded-full absolute h-96 w-96 bottom-16 left-6 scale-x-[170%] scale-y-[200%] z-0"></div>

          <div className="relative">
            <h1 className="z-10 font-jost uppercase text-4xl text-[#2A3990] font-bold my-2">
              Bloodalert
            </h1>
            <h2 className="font-kanit uppercase text-3xl text-[#2A3990] font-semibold my-2">
              ตัวช่วยประชาสัมพันธ์
            </h2>
            <p className="font-kanit">
              สำหรับโรงพยาบาลผู้ที่ต้องการขอรับบริจาคเลือดและผู้ที่ต้องบริจาคเลือด
            </p>
            <Button
              color="pink"
              className="float-right my-6 bg-[#FF5D7D] w-fit px-6 text-center py-1 rounded-md shadow-lg font-kanit text-white mx-auto"
            >
              <Link
                aria-disabled={"true"}
                href={`/register`}
                className="inline-block w-fit mx-auto"
              >
                ลงทะเบียน
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
};

export default Index;
