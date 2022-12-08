import { NextPage } from "next";
import Link from "next/link";
import MobileFrame from "../components/MobileFrame";
import Navbar from "../components/Navbar";

const index: NextPage = () => {
  return (
    <MobileFrame>
      <Navbar />
      <p className="font-kanit inline-block px-6 mt-12">
        กรอกข้อมูลเพื่อจะได้ทราบข่าวสารที่เหมาะกับคุณ
      </p>
      <section className="w-full flex flex-col gap-y-3 px-12 py-8 font-kanit">
        <label htmlFor="blood_type">กรุ๊ปเลือดที่ต้องการจะติดตาม</label>
        <select
          name="blood_type"
          id="blood_type"
          className="rounded-full border-2 border-black px-1"
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="O">O</option>
          <option value="AB">AB</option>
        </select>
        <label htmlFor="blood_type">เขตของท่าน</label>
        <select
          name="distirct"
          id="distirct"
          className="rounded-full border-2 border-black px-1"
        >
          <option value="thonburi">ธนบุรี</option>
        </select>
        <Link
          href="/line"
          className="inline-block text-center bg-[#FF5D7D] text-white font-kanit rounded-xl font-light py-2 mx-16 my-8"
        >
          <button>ลงทะเบียน</button>
        </Link>
      </section>
    </MobileFrame>
  );
};

export default index;
