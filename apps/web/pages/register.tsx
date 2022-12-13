import { Button, Select } from "@mantine/core";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import {
  bloodtypes,
  districts,
  iBloodtype,
  iDistrcits,
} from "../components/constants";
import Logo from "../components/Logo";
import MobileFrame from "../components/MobileFrame";
import { motion } from "framer-motion";

const RegisterPage: NextPage = () => {
  const [bloodtype, setBloodtype] = useState<undefined | iBloodtype>();

  const [district, setDistrict] = useState<iDistrcits | undefined>();

  return (
    <MobileFrame>
      <div className="w-full h-full flex flex-col justify-start items-center relative">
        <nav className="flex items-center justify-end gap-x-8 w-full text-white font-kanit py-8 px-4 font-light font-sm">
          <Link href="/">หน้าแรก</Link>
          <Link href="/news">ข่าวสาร</Link>
        </nav>
        <br />
        <Logo />
        <h1 className="inline-block my-4 uppercase font-bold text-2xl font-jost text-[#2A3990]">
          Bloodalert
        </h1>
        <motion.div
          initial={{
            y: "100%",
          }}
          animate={{
            y: "0%",
            transition: {
              delay: 1,
            },
          }}
          className="w-full rounded-t-[3rem] absolute bottom-0 inset-x-0 bg-gradient-to-b from-[#8CB7FD] to-[#D9D9D9] h-[50%] shadow-md drop-shadow flex justify-start flex-col px-8 py-12 gap-y-4"
        >
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
              description: "text-xs font-kanit mb-1",
              input: "font-kanit shadow",
            }}
            data={bloodtypes}
            onChange={(e) => {
              setBloodtype(e as iBloodtype);
            }}
          ></Select>
          <Select
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
              description: "text-xs font-kanit mb-1",
              input: "font-kanit shadow",
            }}
            data={districts}
            onChange={(e) => {
              setDistrict(e as iDistrcits);
            }}
          ></Select>

          <Link
            href={`/line?district=${district}&bloodtype=${bloodtype}`}
            onClick={(e) => {
              if (!(bloodtype && district)) e.preventDefault();
            }}
            className="inline-block w-fit mx-auto"
          >
            <Button
              color="pink"
              disabled={!(bloodtype && district)}
              className="bg-[#FF5D7D] w-fit px-6 text-center py-1 rounded-md shadow-lg font-kanit text-white mx-auto"
            >
              ลงทะเบียน
            </Button>
          </Link>
        </motion.div>
      </div>
    </MobileFrame>
  );
};

export default RegisterPage;
