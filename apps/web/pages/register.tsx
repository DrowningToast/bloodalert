import { NextPage } from "next";
import Navbar from "../components/Navbar";

const index: NextPage = () => {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <main className="bg-gradient-to-b from-[#75A8F8] to-[#FFFFFF] w-full max-w-[400px] border-2 shadow-lg aspect-[1/2]">
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
          <button className="bg-[#FF5D7D] text-white font-kanit rounded-xl font-light py-2 mx-16 my-8">
            ลงทะเบียน
          </button>
        </section>
      </main>
    </div>
  );
};

export default index;
