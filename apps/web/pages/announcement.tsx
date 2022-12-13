import { NextPage } from "next";
import MobileFrame from "../components/MobileFrame";
import Navbar from "../components/Navbar";
import { useForm } from "@mantine/form";
import {
  Button,
  Loader,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { bloodtypes, districts } from "../components/constants";
import { DatePicker } from "@mantine/dates";
import { z } from "zod";
import { useAtom } from "jotai";
import {
  firebaseReady,
  firebaseUserAtom,
  signinWithGooglePopUp,
} from "../components/firebase";
import { IconBrandGoogle } from "@tabler/icons";
import { useMutation } from "react-query";
import { mutateNewAnnouncement } from "../components/QueryFunctions";
import { IAnnouncement } from "../components/types/responses";

const inputStyles = {
  label: "font-kanit",
  root: "flex flex-col font-kanit",
  description: "text-xs font-kanit mb-1",
  wrapper: "",
  input: "font-kanit drop-shadow-lg rounded-full",
};

const Announcement: NextPage = () => {
  const form = useForm({
    validate: {
      name: (value: string) =>
        value.length >= 3 && value.length <= 160
          ? null
          : "กรุณากรอกชื่อจริงของผู้ป่วยเพื่อการประชาสัมพันธ์ที่มีประสิทธิภาพ",
      surname: (value: string) =>
        value.length >= 3 && value.length <= 160
          ? null
          : "กรุณากรอกนามสกุลของผู้ป่วยเพื่อการประชาสัมพันธ์ที่มีประสิทธิภาพ",
      phonenumber: (value: string) =>
        value.length >= 9 && value.length <= 10 && /^\d+$/.test(value)
          ? null
          : "กรุณากรอกเบอร์โทรศัพท์สำหรับการติดต่อ",
      bloodtype: (value: string) => {
        const bloodtypeSchema = z.enum(["A", "B", "O", "AB"]);
        return bloodtypeSchema.safeParse(value).success
          ? null
          : "Invalid bloodtype";
      },
      hospital: (value: string) =>
        value.length >= 3 && value.length <= 160
          ? null
          : "กรุณาโรงพยาบาลของผู้ป่วยเพื่อการประชาสัมพันธ์ที่มีประสิทธิภาพ",

      district: (value: string) => {
        const distrcitsSchema = z.enum(
          districts.map((dis) => dis.value) as [string, ...string[]]
        );
        return distrcitsSchema.safeParse(value).success
          ? null
          : "กรุณาเลือกเขตขอโรงพยาบาลในกทม.";
      },
      note: (value: string) =>
        value.length >= 3 && value.length <= 160
          ? null
          : "กรุณากรอกหมายเหตุกับช่องทางการติดต่อและช่วยเหลือที่ชัดเจนเพื่อประสิทธิของการประชาสัมพันธ์",
    },
  });

  const [userProfile] = useAtom(firebaseUserAtom);
  const [userReady] = useAtom(firebaseReady);

  const { isLoading, isError, data, mutate } = useMutation({
    mutationFn: mutateNewAnnouncement,
  });

  return (
    <MobileFrame disableBg>
      <div className="bg-[#ECF0F3] w-full h-full overflow-y-auto">
        <header className="bg-[#AADDFF] pb-8 rounded-br-[50px] drop-shadow-md shadow-lg">
          <Navbar />
          <h1 className="text-[#2A3990] text-center py-2 font-kanit uppercase font-bold text-xl">
            Annoucement
          </h1>
        </header>
        {!userReady ? (
          <div className="w-full h-48 grid place-items-center">
            <Loader />
          </div>
        ) : !userProfile ? (
          <div className="flex flex-col justify-center items-center w-full h-72 gap-y-4">
            <h1 className="text-lg font-kanit">
              กรุณายืนยันตัวตนโดยใช้บัญชี Google
            </h1>
            <Button
              color="blue"
              onClick={() => {
                try {
                  signinWithGooglePopUp();
                } catch (e) {
                  console.error(e);
                }
              }}
              leftIcon={<IconBrandGoogle fontWeight={800} />}
              className="bg-[#CFEBFF] w-fit px-6 text-center py-1 rounded-md shadow-lg font-kanit text-black mx-auto"
            >
              ลงทะเบียน
            </Button>
          </div>
        ) : (
          <form
            onSubmit={form.onSubmit(async (data) => {
              try {
                mutate(data as IAnnouncement);
                alert("ประกาศสำเร็จ สามารถรอการติดต่อได้เลย");
              } catch (error) {
                alert("An error has occured");
                console.log(error);
              }
            })}
            className="px-6 py-4 flex flex-col gap-y-2"
          >
            <TextInput
              label="ชื่อ"
              placeholder="ชื่อจริงของผู้ป่วย"
              required
              withAsterisk
              classNames={inputStyles}
              {...form.getInputProps("name")}
            />
            <TextInput
              label="นามสกุล"
              placeholder="นามสกุลของผู้ป่วย"
              required
              withAsterisk
              classNames={inputStyles}
              {...form.getInputProps("surname")}
            />
            <NumberInput
              label="อายุ"
              placeholder="อายุของผู้ป่วย"
              required
              withAsterisk
              classNames={inputStyles}
              {...form.getInputProps("age")}
            />
            <TextInput
              label="เบอร์โทรศัพท์"
              placeholder="08XXXXXXXX"
              required
              withAsterisk
              classNames={inputStyles}
              {...form.getInputProps("phonenumber")}
            />
            <Select
              label="กรุ๊ปเลือด"
              required
              withAsterisk
              withinPortal
              classNames={inputStyles}
              placeholder="กรุ๊ปเลือดของผู้ป่วย"
              data={bloodtypes}
              {...form.getInputProps("bloodtype")}
            />
            <TextInput
              label="โรงพยาบาล"
              placeholder="ชื่อโรงพยาบาลที่ผู้ป่วย"
              required
              withAsterisk
              classNames={inputStyles}
              {...form.getInputProps("hospital")}
            />
            <Select
              label="เขต"
              required
              withAsterisk
              withinPortal
              classNames={inputStyles}
              placeholder="เขตในกทม. ที่โรงพยาบาลอยู่"
              data={districts}
              {...form.getInputProps("district")}
            />
            <DatePicker
              label="วันที่ประสงค์รับบริจาคเลือด"
              placeholder="วัน/เดือน/ปี"
              required
              withAsterisk
              classNames={inputStyles}
              {...form.getInputProps("date")}
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
              {...form.getInputProps("note")}
            />
            <Button
              color="pink"
              type="submit"
              className="bg-[#FF5D7D] w-fit px-6 text-center py-1 rounded-md shadow-lg font-kanit text-white mx-auto"
            >
              ประกาศ
            </Button>
          </form>
        )}
      </div>
    </MobileFrame>
  );
};

export default Announcement;
