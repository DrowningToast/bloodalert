import { NextPage } from "next";
import { useRouter } from "next/router";
import { SignOut } from "../components/firebase";

const Signout: NextPage = () => {
  const router = useRouter();

  SignOut().then(() => {
    router.replace("/");
  });

  return (
    <div className="w-full h-screen grid place-items-center">
      <h1 className="font-kanit text-center w-full">กำลังออกจากระบบ. . .</h1>
    </div>
  );
};

export default Signout;
