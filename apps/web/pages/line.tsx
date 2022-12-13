import { Button, CopyButton } from "@mantine/core";
import { IconCopy } from "@tabler/icons";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import MobileFrame from "../components/MobileFrame";
import Navbar from "../components/Navbar";

const LinePage: NextPage = () => {
  const router = useRouter();
  const commandString = useMemo<string>(() => {
    return `Subscribe\n Bloodtype : ${router.query?.bloodtype}\nDistrict : ${router.query?.district}`;
  }, [router.query.bloodtype, router.query.district]);

  if (!router.query.district || !router.query.bloodtype)
    return (
      <>
        <div className="flex flex-col items-center">
          <h1 className="text-center my-4 font-bold text-2xl text-red-600">
            An error has occured
          </h1>
          <Link href="/" className="inline-block">
            <Button
              color="pink"
              className="bg-[#FF5D7D] w-fit px-6 text-center py-1 rounded-md shadow-lg font-kanit text-white mx-auto"
            >
              Return to home
            </Button>
          </Link>
        </div>
      </>
    );

  return (
    <MobileFrame disableBg>
      <div className="w-full h-full bg-gradient-to-bl from-[#C0D7FC] to-[#75A8F8]">
        <div className="bg-[#B9D3FB] pb-4 drop-shadow-xl">
          <Navbar />
        </div>

        <div className="w-full flex flex-col items-center py-8">
          <div className="flex flex-col w-full h-full gap-y-4 text-center">
            <h1 className="text-3xl text-[#49C628] font-kanit font-bold">
              คัดลอกข้อความ
            </h1>
            <h2 className="font-kanit text-xl text-[#2C58A1]">
              แล้วส่งมาในช่องแชท
            </h2>
          </div>
          <div className="w-full">
            <div className="bg-white mt-8 mx-12 px-4 pt-4 rounded-md relative pb-12 text-sm">
              <p>Subscribe</p>
              <p>{commandString.split("\n")[1]}</p>
              <p>{commandString.split("\n")[2]}</p>

              <CopyButton value={commandString}>
                {({ copied, copy }) => (
                  <IconCopy
                    className="cursor-pointer absolute bottom-4 right-4"
                    onClick={copy}
                    color={copied ? "blue" : "black"}
                  />
                )}
              </CopyButton>
            </div>
          </div>
          <div className="flex flex-col items-center py-8 gap-y-4">
            <div className="w-24 h-24 relative">
              <Image src="/line.png" alt="Line Logo" fill />
            </div>
            <Link
              target={"_blank"}
              href="https://line.me/ti/p/%40785jhkvq"
              className="inline-block w-fit"
            >
              <Button
                color="pink"
                className="bg-[#FF5D7D] w-fit px-6 text-center py-1 rounded-md shadow-lg font-kanit text-white mx-auto"
              >
                เพิ่มเพื่อน
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
};

export default LinePage;
