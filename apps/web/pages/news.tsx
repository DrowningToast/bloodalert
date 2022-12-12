import { Spoiler } from "@mantine/core";
import { NextPage } from "next";
import MobileFrame from "../components/MobileFrame";
import Navbar from "../components/Navbar";

const News: NextPage = () => {
  return (
    <MobileFrame disableBg>
      <div className="h-full bg-gradient-to-b from-[#5999FF] to-[#B8D2FA] overflow-y-auto">
        <div className="bg-[#B9D3FB] drop-shadow-lg pb-4">
          <Navbar />
        </div>
        <div className="w-full flex flex-col items-center px-8 py-8 pb-12">
          <Spoiler
            maxHeight={280}
            showLabel="อ่านต่อ"
            hideLabel="ซ่อน"
            classNames={{
              control: "z-20 relative font-kanit mt-2",
            }}
            className="border-2 border-black rounded-xl w-full px-6 py-6 relative z-10"
          >
            <div className="absolute inset-0 opacity-[60%] rounded-xl bg-white"></div>
            <div className="relative">
              <h1 className="font-jost font-bold text-5xl">A</h1>
              <h2 className="font-kanit font-semibold text-2xl">
                นายศุภธัช สุวัฒโน
              </h2>
              <ul className="text-right my-6 font-kanit text-sm">
                <li>เบอร์โทร 091 494 9666</li>
                <li>โรงพยาบาลสิริธร</li>
                <li>เขตประเวศ</li>
                <li>วันที่ 9/12/2565</li>
              </ul>
              <hr className="border-black my-4" />
              <h5 className="font-semibold font-kanit text-sm">หมายเหตุ*</h5>
              <p className="text-sm font-kanit">
                รบกวนเรื่องบริจาคอย่างเดียวนะคะ ขอบคุณค่ะ Lorem ipsum dolor, sit
                amet consectetur adipisicing elit. Aperiam dolore ipsam saepe
                asperiores recusandae? Non, quaerat tempora quisquam laboriosam
                deleniti, porro velit dolor explicabo perferendis provident at
                itaque doloremque labore. Fuga alias laboriosam distinctio
                facere accusamus labore odio minus officia voluptatibus
                voluptatum praesentium, perferendis quibusdam veritatis porro
                tempore ullam inventore amet maiores expedita architecto vitae
                magni? Eveniet magnam molestiae aliquid! Amet repellendus nobis
                accusamus enim impedit ex culpa reprehenderit quod voluptate
                temporibus consequatur alias debitis labore corrupti, aspernatur
                repudiandae ipsa soluta aliquid! Nobis atque fugit eaque nihil.
                Voluptatibus, ipsum iusto.
              </p>
            </div>
          </Spoiler>
        </div>
      </div>
    </MobileFrame>
  );
};

export default News;
