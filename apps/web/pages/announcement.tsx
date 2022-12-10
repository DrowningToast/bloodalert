import { NextPage } from "next";
import MobileFrame from "../components/MobileFrame";
import Navbar from "../components/Navbar";
import { useForm } from "@mantine/form";
import { Select, Textarea, TextInput } from "@mantine/core";
import { bloodtypes, districts } from "../components/constants";
import { DatePicker } from "@mantine/dates";

const inputStyles = {
  label: "font-kanit",
  root: "flex flex-col font-kanit",
  description: "text-xs font-kanit mb-1",
  wrapper: "",
  input: "font-kanit drop-shadow-lg rounded-full",
};

const Announcement: NextPage = () => {
  const form = useForm({});

  return (
    <MobileFrame disableBg>
      <div className="bg-[#ECF0F3] w-full h-full overflow-y-scroll">
        <header className="bg-[#AADDFF] pb-8 rounded-br-[50px] drop-shadow-md shadow-lg">
          <Navbar />
          <h1 className="text-[#2A3990] text-center py-2 font-kanit uppercase font-bold text-xl">
            Annoucement
          </h1>
        </header>
        <div className="px-6 py-4 flex flex-col gap-y-2">
          <TextInput
            label="ชื่อ"
            placeholder="ชื่อจริงของผู้ป่วย"
            required
            withAsterisk
            classNames={inputStyles}
          />
          <TextInput
            label="นามสกุล"
            placeholder="นามสกุลของผู้ป่วย"
            required
            withAsterisk
            classNames={inputStyles}
          />
          <Select
            label="กรุ๊ปเลือด"
            required
            withAsterisk
            withinPortal
            classNames={inputStyles}
            placeholder="กรุ๊ปเลือดของผู้ป่วย"
            data={bloodtypes}
          />
          <TextInput
            label="โรงพยาบาล"
            placeholder="ชื่อโรงพยาบาลที่ผู้ป่วย"
            required
            withAsterisk
            classNames={inputStyles}
          />
          <Select
            label="เขต"
            required
            withAsterisk
            withinPortal
            classNames={inputStyles}
            placeholder="เขตในกทม. ที่โรงพยาบาลอยู่"
            data={districts}
          />
          <DatePicker
            label="วันที่ประสงค์รับบริจาคเลือด"
            placeholder="วัน/เดือน/ปี"
            required
            withAsterisk
            classNames={inputStyles}
          />
          <Textarea
            label="ช่องทางติดต่อสาธารณ และหมายเหตุ"
            required
            withAsterisk
            classNames={{
              ...inputStyles,
              input: "font-kanit drop-shadow-lg rounded-md",
            }}
            radius="sm"
            autosize
            placeholder="เช่น ขาดเลือดด่วน 08XXXXXXXX ติดต่อที่ตึกXXXX ชั้นXXXX เวลาXXXX เป็นต้นไป"
          />
        </div>
      </div>
    </MobileFrame>
  );
};

export default Announcement;
