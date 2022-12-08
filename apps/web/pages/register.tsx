import { Select } from "@mantine/core";
import { NextPage } from "next";
import Link from "next/link";
import { bloodtypes } from "../components/constants";
import MobileFrame from "../components/MobileFrame";
import Navbar from "../components/Navbar";

const index: NextPage = () => {
  return (
    <MobileFrame>
      <div className="w-full h-full flex flex-col justify-start items-center relative">
        <nav className="flex items-center justify-end gap-x-8 w-full text-white font-kanit py-8 px-4 font-light font-sm">
          <Link href="/">หน้าแรก</Link>
          <Link href="/news">ข่าวสาร</Link>
        </nav>
        <div className="bg-white aspect-square w-44 rounded-full"></div>
        <h1 className="inline-block my-4 uppercase font-bold text-lg font-kanit text-[#2A3990]">
          Bloodalert
        </h1>
        <div className="w-full rounded-t-[3rem] absolute bottom-0 inset-x-0 bg-gradient-to-b from-[#8CB7FD] to-[#D9D9D9] h-[55%] shadow-md drop-shadow flex justify-start flex-col px-8 py-12">
          <Select
            label="กรุ๊ปเลือด"
            placeholder="กลุ่มเลือดที่ท่านต้องการจะติดตาม"
            description="ท่านจะได้รับการแจ้งเตือนเมื่อเกิดเหตุฉุกเฉินที่ตรงกับกรุ๊ปเลือดที่ท่านเลือกเท่านั้น"
            required
            radius={"xl"}
            withAsterisk
            withinPortal
            classNames={{
              label: "text-lg",
              root: "flex flex-col font-kanit",
              description: "text-xs font-kanit mb-4",
              wrapper: "shadow",
            }}
            data={bloodtypes}
          ></Select>
          {/* <Select
            label="เขตที่อาศัย"
            placeholder="เขตในกทม.ที่ท่านต้องการจะติดตาม"
            description="ท่านจะได้รับการแจ้งเตือนเมื่อเกิดเหตุฉุกเฉินที่อยู่ในเขตของท่านเท่านั้นครับ"
            required
            radius={"xl"}
            withAsterisk
            withinPortal
            classNames={{
              label: "text-lg",
              root: "flex flex-col font-kanit",
              description: "text-xs font-kanit mb-4",
              wrapper: "shadow",
            }}
            data={bloodtypes}
          ></Select> */}
        </div>
      </div>
    </MobileFrame>
  );
};

export default index;
