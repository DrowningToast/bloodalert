import { NextPage } from "next";
import MobileFrame from "../components/MobileFrame";
import Navbar from "../components/Navbar";

const LinePage: NextPage = () => {
  return (
    <MobileFrame>
      <Navbar />
    </MobileFrame>
  );
};

export default LinePage;
