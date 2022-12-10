import { NextPage } from "next";
import MobileFrame from "../components/MobileFrame";
import Navbar from "../components/Navbar";

const News: NextPage = () => {
  return (
    <MobileFrame disableBg>
      <div className="bg-gradient-to-br from-[#FFFFFF] to-[#ACDBFF] w-full h-full flex flex-col justify-start">
        <Navbar />
        <div className="rounded-full "></div>
      </div>
    </MobileFrame>
  );
};

export default News;
